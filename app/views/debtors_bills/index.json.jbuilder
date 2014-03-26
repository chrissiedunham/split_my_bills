json.array!(@debtors_bills) do |db|
  json.partial!("debtors_bills/debtors_bill", :debtors_bill => db)
end

