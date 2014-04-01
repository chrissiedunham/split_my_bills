json.(user, :name, :email, :id)


json.net_owed_to_current user.net_owed_to(current_user)


# Used for top of user show page
total_debit = DebtorsBills.where(:debtor_id=> user.id).sum(:amount_owed_cents)/100.00
total_credit = user.total_credit
json.net_balance (total_credit - total_debit)

# # Could be used for friends?
# json.debtors_bills user.debtors_bills.includes(bill: :creditor) do |db|
#   json.amount db.amount_owed_cents/100.00
#   json.bill_name db.bill.name
#   json.bill_creditor db.bill.creditor.name
#   json.bill_creditor_id db.bill.creditor.id
# end

json.dbs_owed_to_current_user user.debtors_bills_owed_to(current_user) do |db|
  json.partial!("debtors_bills/debtors_bill", :debtors_bill => db)
end

json.dbs_owed_by_current_user current_user.debtors_bills_owed_to(user) do |db|
  json.partial!("debtors_bills/debtors_bill", :debtors_bill => db)
end


json.credits DebtorsBills.joins(:bill).where(bills: {:creditor_id => user.id} ) do | cb |
  json.bill_name cb.bill.name
  json.bill_creditor cb.bill.creditor.name
  json.bill_creditor_id cb.bill.creditor.id
end

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



