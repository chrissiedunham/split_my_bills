class AddColumnToDebtorBills < ActiveRecord::Migration
  def change
    add_column :debtors_bills, :paid, :string
  end
end
