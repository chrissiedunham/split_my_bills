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
    @user = User.includes(credit_bills: :debtors_bills, debit_bills: :debtors_bills).find_by(:id => current_user.id)
    render "users/show"
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
