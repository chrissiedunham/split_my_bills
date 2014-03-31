class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def index
    @users = User.all
    @current_user = current_user
    render "users/index"
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      redirect_to "/dashboard#bills"
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    if params.include?(:id)
      @user = User.find(params[:id])
      @current_user = current_user
      render "users/show"
    else
      #
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
