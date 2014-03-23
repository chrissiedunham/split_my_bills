# == Schema Information
#
# Table name: debtors_bills
#
#  id                :integer          not null, primary key
#  bill_id           :integer
#  debtor_id         :integer
#  created_at        :datetime
#  updated_at        :datetime
#  paid              :string(255)
#  amount_owed_cents :integer
#

class DebtorsBills < ActiveRecord::Base
  attr_reader :amount_owed
  
  belongs_to :bill

  belongs_to :debtor,
    :class_name => "User",
    :foreign_key => :debtor_id,
    :primary_key => :id
  
  def self.get_amount_from_pct(amount, pct)
    (amount.to_f * pct.to_f).round
  end

  
end
