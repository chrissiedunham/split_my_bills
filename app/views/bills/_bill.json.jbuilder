json.(bill, :name, :date, :amount)

json.debtors bill.debtors do |debtor|
  json.id debtor.id
  json.name debtor.name

  debtor.debtors_bills.each do |db|
    if db.id == bill.id 
      json.amount_owed db.amount_owed
      json.bill_id db.bill_id
    end
  end
end


