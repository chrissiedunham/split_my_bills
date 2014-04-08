json.(friend, :name, :email, :id)

json.dbs_owed_to_current_user dbs_owed_to_current do |db|
  json.partial!("debtors_bills/debtors_bill", :debtors_bill => db)
end

json.dbs_owed_by_current_user dbs_owed_by_current do |db|
  json.partial!("debtors_bills/debtors_bill", :debtors_bill => db)
end


