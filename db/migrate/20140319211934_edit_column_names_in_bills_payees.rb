class EditColumnNamesInBillsPayees < ActiveRecord::Migration
  def change
    rename_column :bills_payees, :payee_id, :debtor_id
    rename_column :bills, :owner_id, :creditor_id
  end
end
