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

require 'money_column'
require 'money'
require 'monetize/core_extensions'

class Bill < ActiveRecord::Base

  validates :name, :amount_cents, :creditor_id, :presence => true
  monetize :amount_cents

  belongs_to :creditor, 
    :class_name => "User",
    :foreign_key => :creditor_id,
    :primary_key => :id

  has_many :debtors_bills,
    :class_name => "DebtorsBills",
    :foreign_key => :bill_id,
    :primary_key => :id, :dependent => :destroy

  has_many :debtors, :through => :debtors_bills, :source => :debtor

  def currency
    "USD"
  end

end 
