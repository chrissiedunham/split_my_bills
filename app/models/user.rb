# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string(255)
#  name            :string(255)
#  password        :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#  session_token   :string(255)
#  password_digest :string(255)
#

class User < ActiveRecord::Base
  attr_reader :password
  validates :password_digest, :presence => true
  validates :password, :length => { :minimum => 6, :allow_nil => true }
  validates :session_token, :presence => true, :uniqueness => true
  validates :email, :presence => true, :uniqueness => true
  
  has_many :debtors_bills,
    :class_name => "DebtorsBills",
    :foreign_key => :debtor_id,
    :primary_key => :id

  has_many :credit_bills,
    :class_name => "Bill",
    :foreign_key => :creditor_id,
    :primary_key => :id
  
  has_many :debit_bills, :through => :debtors_bills, :source => :bill

  has_many :friendships,
    :class_name => "Friendship",
    :foreign_key => :friend_1_id,
    :primary_key => :id

  has_many :friends, :through => :friendships, :source => :friend_2
  
  before_validation :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    user.try(:is_password?, password) ? user : nil
  end

  def bills_relevant_to(user)
    if user.id == self.id
      return all_bills
    end
    results = Bill.find_by_sql(["
      SELECT bills.*
      FROM bills
      JOIN debtors_bills ON bills.id = debtors_bills.bill_id
      WHERE 
      (bills.creditor_id = :current_user_id AND debtors_bills.debtor_id = :friend_id)
      OR 
      (debtors_bills.debtor_id = :current_user_id AND bills.creditor_id = :friend_id)", 
        { current_user_id: user.id, friend_id: self.id  }])
      results
  end

  def all_bills
    Bill.find_by_sql(["
      SELECT * 
      FROM bills
      JOIN debtors_bills ON bills.id = debtors_bills.bill_id
      JOIN users AS creditors on creditors.id = bills.creditor_id
      WHERE 
      creditors.id = :current_user_id
      OR 
      debtors_bills.debtor_id = :current_user_id",
        { current_user_id: self.id  }])
  end

  def amount_owed_on(bill)
    debtor_bill = self.debtors_bills.where(:bill_id => bill.id).first
    debtor_bill.amount_owed_cents / 100.00
  end

  def amount_owed_to(user)
    return 0 if user.id == self.id
    DebtorsBills.find_by_sql([ "
      SELECT sum(amount_owed_cents)
      FROM debtors_bills
      JOIN bills on bills.id = debtors_bills.bill_id
      WHERE 
      bills.creditor_id = :creditor_id 
      AND
      debtors_bills.debtor_id = :debtor_id
      ", { creditor_id: user.id, debtor_id: self.id }]).last.sum.to_i / 100.00
  end

  def total_credit
    DebtorsBills.joins(:bill).where(bills: { creditor_id: self.id}).sum(:amount_owed_cents)/100.00
  end

  def amount_owed_by(user)
    user.amount_owed_to(self)
  end

  def net_owed_to(user)
    amount_owed_to(user).to_f - amount_owed_by(user).to_f
  end


  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def is_password?(unencrypted_password)
    BCrypt::Password.new(self.password_digest).is_password?(unencrypted_password)
  end

  def password=(unencrypted_password)
    if unencrypted_password.present?
      @password = unencrypted_password
      self.password_digest = BCrypt::Password.create(unencrypted_password)
    end
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
