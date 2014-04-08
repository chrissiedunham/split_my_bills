class FriendsController < ApplicationController
  
  def index
    @friends = User.all
    render "friends/index"
  end

  def show
    @current_user = current_user
    @friend = User.find(params[:id])
    @dbs_owed_to_current = DebtorsBills.owed_to_by(@current_user, @friend)
    @dbs_owed_by_current = DebtorsBills.owed_to_by(@friend, @current_user)

    render "friends/show"
  end

end
