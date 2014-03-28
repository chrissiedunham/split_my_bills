class InviteEmailsController < ApplicationController
  def create 
    @user = User.find(params[:id].to_i)
    @email = params[:email]
    @message = params[:message]
    AuthMailer.invite_email(@email, @message, @user).deliver
  end


end
