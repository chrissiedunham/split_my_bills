json.(user, :name, :email, :id)

total_debit = User.total_debit(user)
total_credit = User.total_credit(user)

json.total_debit total_debit
json.total_credit total_credit
json.net_balance (total_credit - total_debit)

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


