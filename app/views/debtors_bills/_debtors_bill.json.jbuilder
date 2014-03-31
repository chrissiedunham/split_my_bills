json.(debtors_bill, :id, :bill_id)
 
json.debtor debtors_bill.debtor.name
json.debtor_id debtors_bill.debtor.id
json.debtorEmail debtors_bill.debtor.email

json.amount_owed debtors_bill.amount_owed_cents / 100.00
json.paid debtors_bill.paid == "paid" ? "Paid" : "Unpaid"

json.id debtors_bill.id

json.creditor debtors_bill.bill.creditor.name
json.creditor_id debtors_bill.bill.creditor.id

json.bill_name debtors_bill.bill.name
