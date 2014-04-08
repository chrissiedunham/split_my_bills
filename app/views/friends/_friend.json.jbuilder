json.(friend, :name, :email, :id)

# used by friends
json.dbs_owed_to_current_user friend.debtors_bills_owed_to(current_user) do |db|
  json.partial!("debtors_bills/debtors_bill", :debtors_bill => db)
end

json.dbs_owed_by_current_user current_user.debtors_bills_owed_to(friend) do |db|
  json.partial!("debtors_bills/debtors_bill", :debtors_bill => db)
end


