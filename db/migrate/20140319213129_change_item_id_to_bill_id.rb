class ChangeItemIdToBillId < ActiveRecord::Migration
  def change
    rename_column :bills_debtors, :item_id, :bill_id
  end
end
