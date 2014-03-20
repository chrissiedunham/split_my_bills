class ChangeColumnOnBill < ActiveRecord::Migration
  def change
    rename_column :bills, :published, :date
  end
end
