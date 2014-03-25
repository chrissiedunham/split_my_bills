json.array!(@bills) do |bill|
  json.partial!("bills/bill", :bill => bill, :current_user => @current_user)
  
end

