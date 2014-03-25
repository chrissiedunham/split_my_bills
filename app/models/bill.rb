# == Schema Information
#
# Table name: bills
#
#  id           :integer          not null, primary key
#  name         :string(255)
#  date         :date
#  creditor_id  :integer
#  paid         :string(255)
#  created_at   :datetime
#  updated_at   :datetime
#  amount_cents :integer
#

class Bill < ActiveRecord::Base

  attr_reader :amount

  validates :name, :amount_cents, :creditor_id, :presence => true

  belongs_to :creditor, 
    :class_name => "User",
    :foreign_key => :creditor_id,
    :primary_key => :id

  has_many :debtors_bills,
    :class_name => "DebtorsBills",
    :foreign_key => :bill_id,
    :primary_key => :id, :dependent => :destroy

  has_many :debtors, :through => :debtors_bills, :source => :debtor

  def amount=(dollar_amount)
    @amount = dollar_amount
    self.amount_cents = (dollar_amount.to_f * 100)
  end

  def amount_owed_by(user)
     result = Bill.find_by_sql([" 
      SELECT sum(amount_owed_cents) as amount_owed_cents
      FROM bills
      JOIN debtors_bills on bills.id = debtors_bills.bill_id
      WHERE 
      debtors_bills.debtor_id = :user_id
      AND
      bills.id = :bill_id
    ", { user_id: user.id, bill_id: self.id  }]).last.amount_owed_cents

    return 0 if result.nil?
    result/100.00
    # debugger
    # return 0 if result.id.nil?
    # result.amount_owed_cents
  end

  def amount_owed_to(user)
    result = Bill.find_by_sql([" 
      SELECT sum(amount_owed_cents) as amount_owed_cents
      FROM bills
      JOIN debtors_bills on bills.id = debtors_bills.bill_id
      WHERE 
      bills.id = :bill_id
      AND
      bills.creditor_id = :user_id
    ", { user_id: user.id, bill_id: self.id  }]).last.amount_owed_cents

    return 0 if result.nil?
    result/100.00
  end

  def net_amount_owed(user)
    (amount_owed_to(user).to_f - amount_owed_by(user).to_f)
  end

  def total_amount_owed_to(user)
    Bill.find_by_sql([" 
      SELECT sum(amount_owed_cents)/100.00 as amount_owed
      FROM bills
      JOIN debtors_bills on bills.id = debtors_bills.bill_id
      WHERE 
      debtors_bills.debtor_id = :user_id
      AND
      bills.id = :bill_id
    ", { user_id: user.id, bill_id: self.id  }]).last.amount_owed
  end

  def amount_owed_to_from(creditor, debtor)
  end

end 
