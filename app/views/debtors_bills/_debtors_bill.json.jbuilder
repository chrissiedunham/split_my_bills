json.(debtors_bill, :id, :bill_id)
 
json.debtor debtors_bill.debtor.name
json.creditor debtors_bill.bill.creditor.name
json.bill_name debtors_bill.bill.name
json.amount_owed debtors_bill.amount_owed_cents/100.00
