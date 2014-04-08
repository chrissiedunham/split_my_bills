json.(bill, :id, :name, :date, :amount_cents, :creditor_id)
json.creditor bill.creditor.name
json.amount (bill.amount_cents / 100.00)

json.creditor_email bill.creditor.email

json.debtorsBills bill.debtors_bills do |db|
  json.paid db.paid
  json.id db.id
  json.amount_owed db.amount_owed_cents/100.00

  json.debtorEmail db.debtor.email
  json.debtor db.debtor.name
end

