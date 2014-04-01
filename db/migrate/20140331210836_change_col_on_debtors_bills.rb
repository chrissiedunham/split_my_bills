class ChangeColOnDebtorsBills < ActiveRecord::Migration
  def change
    remove_column :debtors_bills, :paid
    add_column :debtors_bills, :paid, :boolean, :default => false
  end
end
