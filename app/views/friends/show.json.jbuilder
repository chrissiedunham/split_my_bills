json.partial!("friends/friend", :friend => @friend, :current_user => @current_user,
             :dbs_owed_to_current => @dbs_owed_to_current,
             :dbs_owed_by_current => @dbs_owed_by_current)

