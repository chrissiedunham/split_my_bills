json.(user, :name, :email, :id)

json.relevant_bills user.bills_relevant_to(current_user) do |bill|
  json.partial!("bills/bill", :bill => bill, :user => user, :current_user => current_user)
end

json.credit_bills user.credit_bills do |bill|
  json.partial!("bills/bill", :bill => bill, :user => user, :current_user => current_user)
end

json.debit_bills user.debit_bills do |bill|
  json.partial!("bills/bill", :bill => bill, :user => user, :current_user => current_user)
end

#debugger
#json.owed_by_current_user user.amount_owed_to(current_user)

json.friends user.friends do |friend|
  json.id friend.id
  json.name friend.name
  json.amount_owed_to user.amount_owed_to(friend)
  json.amount_owed_by user.amount_owed_by(friend)
  json.net_owed_to user.net_owed_to(friend)
end


