json.(bill, :id, :name, :date, :amount_cents, :creditor_id)





json.creditor bill.creditor.name
json.amount (bill.amount_cents / 100.00)

json.creditor_email bill.creditor.email

json.net_to_current_user bill.net_amount_owed(current_user)

json.debtors bill.debtors do |debtor|
  json.debtor_id debtor.id
  json.name debtor.name
  json.email debtor.email
  json.amount_owed debtor.amount_owed_on(bill)

end


