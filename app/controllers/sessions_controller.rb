class SessionsController < ApplicationController
  before_action :require_signed_in!, :only => [:destroy]

  def new
    @user = User.new
  end

  def create

    @user = User.find_by_credentials(
      user_params[:email],
      user_params[:password]
    )

    if @user
      sign_in(@user)
      redirect_to dashboard_url 
    else
      flash.now[:errors] = ["Invalid Credentials"]
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to "/"
  end

  def guest
    @user = User.find_by_credentials("chrissie@gmail.com", "asdfasdf")
    sign_in(@user)
    redirect_to dashboard_url
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
