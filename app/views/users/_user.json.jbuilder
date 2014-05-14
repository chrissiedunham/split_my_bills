json.(user, :name, :email, :id)

total_debit = User.total_debit(user)
total_credit = User.total_credit(user)

json.total_debit total_debit
json.total_credit total_credit
json.net_balance (total_credit - total_debit)

# used by main user show page
json.credit_bills user.credit_bills.includes(:debtors_bills) do |bill|
  json.partial!("bills/bill", :bill => bill, :user => user)
end

json.debit_bills user.debit_bills do |bill|
  json.partial!("bills/bill", :bill => bill, :user => user)
end

# used only by user
json.friends user.friends do |friend|
  json.id friend.id
  json.name friend.name
end


