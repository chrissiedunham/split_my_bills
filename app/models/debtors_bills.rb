# == Schema Information
#
# Table name: bills_debtors
#
#  id          :integer          not null, primary key
#  bill_id     :integer
#  debtor_id   :integer
#  amount_owed :integer
#  created_at  :datetime
#  updated_at  :datetime
#

class BillsDebtors < ActiveRecord::Base
  
  
  belongs_to :bill
  belongs_to :debtor,
    :class_name => "User",
    :foreign_key => :debtor_id,
    :primary_key => :id
  
  
end