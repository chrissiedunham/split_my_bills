class ChangeAmountColumnInBill < ActiveRecord::Migration
  def change
    
    remove_column :bills, :amount
    add_column :bills, :amount_cents, :integer
  end
end
