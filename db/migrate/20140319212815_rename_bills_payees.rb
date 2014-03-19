class RenameBillsPayees < ActiveRecord::Migration
  def change
    rename_table :bills_payees, :bills_debtors
  end
end
