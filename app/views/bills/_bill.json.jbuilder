json.(bill, :id, :name, :date, :amount_cents, :creditor_id)
json.creditor bill.creditor.name
json.amount (bill.amount_cents / 100.00)

json.creditor_email bill.creditor.email

json.net_to_current_user bill.net_amount_owed(current_user)

json.debtorsBills bill.debtors_bills.includes(:debtor) do |db|
  json.partial!("debtors_bills/debtors_bill", :debtors_bill => db)
end

