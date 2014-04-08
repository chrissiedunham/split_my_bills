json.(user, :name, :email, :id)
#
# json.net_owed_to_current user.net_owed_to(current_user)


# REFACTOR OUT TO DIFFERENT VIEW??
# Used for top of user show page
total_debit = User.total_debit(user)
total_credit = User.total_credit(user)

json.total_debit total_debit
json.total_credit total_credit
json.net_balance (total_credit - total_debit)

# used by friends
json.dbs_owed_to_current_user user.debtors_bills_owed_to(current_user) do |db|
  json.partial!("debtors_bills/debtors_bill", :debtors_bill => db)
end

json.dbs_owed_by_current_user current_user.debtors_bills_owed_to(user) do |db|
  json.partial!("debtors_bills/debtors_bill", :debtors_bill => db)
end

# json.relevant_bills current_user.bills_relevant_to(current_user) do |bill|
#   json.partial!("bills/bill", :bill => bill, :user => user, :current_user => current_user)
# end

# used by main user show page
json.credit_bills current_user.credit_bills do |bill|
  json.partial!("bills/bill", :bill => bill, :user => user, :current_user => current_user)
end

json.debit_bills current_user.debit_bills do |bill|
  json.partial!("bills/bill", :bill => bill, :user => user, :current_user => current_user)
end

# used only by current_user
json.friends current_user.friends do |friend|
  json.id friend.id
  json.name friend.name
#   json.net_owed_to user.net_owed_to(friend)
end


