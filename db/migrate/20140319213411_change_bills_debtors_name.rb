class ChangeBillsDebtorsName < ActiveRecord::Migration
  def change
    rename_table :bills_debtors, :debtors_bills
  end
end
