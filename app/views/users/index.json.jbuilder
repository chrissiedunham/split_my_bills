json.array!(@users) do |user|
  json.partial!("users/friend", :user => user, :current_user => @current_user)
end

