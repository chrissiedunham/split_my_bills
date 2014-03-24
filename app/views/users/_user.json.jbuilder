json.(user, :name, :email, :id)

json.credit_bills user.credit_bills do |bill|
  json.partial!("bills/bill", :bill => bill)
end

json.debit_bills user.debit_bills do |bill|
  json.partial!("bills/bill", :bill => bill)
end

json.friends user.friends do |friend|
  json.id friend.id
  json.name friend.name
end


