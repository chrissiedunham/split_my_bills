class FriendshipsController < ApplicationController
  def create
    @friendship1 = current_user.friendships.new();
    @friendship1.friend_1_id = current_user.id;
#    @friendship.friend_2_id = params[:user_id]

    if @friendship1.save
      render :json => @friendship
    else
      render :json => @friendship.errors.full_messages
    end
  end

  def index
    @friendships = current_user.friendships
    render :json => @friendships
  end


end
