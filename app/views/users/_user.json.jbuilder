json.(user, :name, :email, :id)

json.credit_bills user.credit_bills do |bill|
  json.id bill.id
  json.name bill.name
end


json.friends user.friends do |friend|
  json.id friend.id
  json.name friend.name
end


