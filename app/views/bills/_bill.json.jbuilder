json.(bill, :id, :name, :date, :amount, :creditor_id)

json.creditor_email bill.creditor.email

json.debtors bill.debtors do |debtor|
  json.debtor_id debtor.id
  json.name debtor.name


  debtor.debtors_bills.each do |db|
    if db.bill_id == bill.id 
      json.db_id db.id
      json.amount_owed db.amount_owed
      json.db_bill_id db.bill_id
    end
  end
end


