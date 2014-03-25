class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def index
    @users = User.all
    render "users/index"
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      AuthMailer.signup_email(@user).deliver
      redirect_to "/"
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    if params.include?(:id)
      @user = User.find(params[:id])
      @current_user
      render "users/show"
    else
      redirect_to user_url(current_user)
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
