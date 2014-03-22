class ChangeAmountOwedColumnInDebtorsBills < ActiveRecord::Migration
  def change
    
    remove_column :debtors_bills, :amount_owed
    add_column :debtors_bills, :amount_owed_cents, :integer

  end
end
