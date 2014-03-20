class Api::BillsController < ApplicationController
  wrap_parameters :bill, :include => [:name, :date, :amount, :debtor_ids]

  def create
    @bill = current_user.credit_bills.new(bill_params)

    debtor_params[:debtor_ids].each do |id|
      @bill.debtors_bills.new(:debtor_id => id)
    end
    
    if @bill.save
      flash.now[:success] = ["successfully saved bill"]
      render json: @bill
    else
      render json: { errors: @bill.errors.full_messages }, status: 422
    end
  end

  def index
    @bills = current_user.credit_bills
    render json: @bills.to_json(include: [:debtors])
  end

  def show
    @bill = Bill.find(params[:id])
    render json: @bill.to_json(include: [:debtors])
  end

  def destroy
    @bill = Bill.find(params[:id])
    @bill.destroy
    render json: @bill
    
  end

  def bill_params
    params.require(:bill).permit(:name, :amount, :date)
  end

  def debtor_params
    params.require(:bill).permit(:debtor_ids => [])
  end
end
  
