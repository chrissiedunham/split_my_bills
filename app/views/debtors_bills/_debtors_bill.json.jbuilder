json.(debtors_bill, :id, :paid)
 
json.debtor_id debtors_bill.debtor.id
json.amount_owed debtors_bill.amount_owed_cents / 100.00
json.bill_name debtors_bill.bill.name

