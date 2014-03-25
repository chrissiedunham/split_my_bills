json.(bill, :id, :name, :date, :amount_cents, :creditor_id)
json.creditor bill.creditor.name
json.amount (bill.amount_cents / 100.00)

json.creditor_email bill.creditor.email

json.debtors bill.debtors do |debtor|
  json.debtor_id debtor.id
  json.name debtor.name
  json.email debtor.email


  debtor.debtors_bills.each do |db|
    if db.bill_id == bill.id 
      json.db_id db.id
      json.amount_owed (db.amount_owed_cents / 100.00)
      json.db_bill_id db.bill_id
    end
  end
end


