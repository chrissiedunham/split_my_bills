json.array!(@users) do |user|
  json.partial!("users/user", :user => user, :current_user => @current_user)
end

