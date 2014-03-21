json.array!(@bills) do |bill|
  json.partial!("bills/bill", :bill => bill)
end

