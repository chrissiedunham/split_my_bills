class Api::BillsController < ApplicationController

  def new
    @bill = Bill.new
  end

  def create
    @bill = current_user.bills.build(bill_params)
    if @bill.save
      flash.now[:success] = ["successfully saved bill"]
      render "/"
    else
    end
  
  end

  def bill_params
    params.require(:bill).permit(:name, :amount)
  end
end
  