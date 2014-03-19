class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.string :name
      t.date :published
      t.string :amount
      t.integer :owner_id
      t.string :paid

      t.timestamps
    end
  end
end
