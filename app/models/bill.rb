# == Schema Information
#
# Table name: bills
#
#  id          :integer          not null, primary key
#  name        :string(255)
#  date        :date
#  amount      :string(255)
#  creditor_id :integer
#  paid        :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#

class Bill < ActiveRecord::Base
  validates :name, :amount, :creditor_id, :presence => true
  
  belongs_to :creditor, 
    :class_name => "User",
    :foreign_key => :creditor_id,
    :primary_key => :id

  has_many :debtors_bills,
    :class_name => "DebtorsBills",
    :foreign_key => :bill_id,
    :primary_key => :id

  has_many :debtors, :through => :debtors_bills, :source => :debtor
end 
