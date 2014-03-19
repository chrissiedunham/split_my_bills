class CreateBillsPayees < ActiveRecord::Migration
  def change
    create_table :bills_payees do |t|
      t.integer :item_id
      t.integer :payee_id
      t.integer :amount_owed

      t.timestamps
    end
  end
end
