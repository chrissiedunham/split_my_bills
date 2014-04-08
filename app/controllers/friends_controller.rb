class FriendsController < ApplicationController
  
  def index
    @friends = User.all
    render "users/index"
  end

  def show
    @current_user = current_user
    @friend = User.find(params[:id])
    render "friends/show"
  end

end
