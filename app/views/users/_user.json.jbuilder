json.(user, :name, :email, :id)

total_debit = DebtorsBills.where(:debtor_id=> user.id).sum(:amount_owed_cents)/100.00
total_credit = user.total_credit

json.net_owed_to_current user.net_owed_to(current_user)
json.total_credit  total_credit
json.total_debit  total_debit
json.net_balance (total_credit - total_debit)

json.relevant_bills user.bills_relevant_to(current_user) do |bill|
  json.partial!("bills/bill", :bill => bill, :user => user, :current_user => current_user)
end

json.credit_bills user.credit_bills do |bill|
  json.partial!("bills/bill", :bill => bill, :user => user, :current_user => current_user)
end

json.debit_bills user.debit_bills do |bill|
  json.partial!("bills/bill", :bill => bill, :user => user, :current_user => current_user)
end

json.friends user.friends do |friend|
  json.id friend.id
  json.name friend.name
  json.net_owed_to user.net_owed_to(friend)
end


