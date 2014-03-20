class Api::BillsController < ApplicationController
  def create
    @bill = current_user.credit_bills.build(bill_params)
    
    if @bill.save
      flash.now[:success] = ["successfully saved bill"]
      render json: @bill
    else
      render json: { errors: @bill.errors.full_messages }, status: 422
    end
  end

  def index
    @bills = current_user.credit_bills
    render json: @bills
  end

  def show
    @bill = Bill.find(params[:id])
    @friends = current_user.friends
    render json: [@bill, @friends]
  end

  def destroy
    @bill = Bill.find(params[:id])
    @bill.destroy
    render json: @bill
    
  end

  def bill_params
    params.require(:bill).permit(:name, :amount)
  end
end
  
