json.(user, :name, :email, :id)

json.bills user.credit_bills do |bill|
  json.id bill.id
  json.name bill.name
end




