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


end 
