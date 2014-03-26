class Api::DebtorsBillsController < ApplicationController
  before_action :require_signed_in!

  def update
    @debtors_bill = DebtorsBills.find(params[:id])
    if @debtors_bill.update_attributes( { paid: params[:paid] })
      render "debtors_bills/show"
    else 
      render :json => @debt.errors.full_messages
    end
  end

  def show
    @debtors_bill = DebtorsBills.find(params[:id])
    render "debtors_bills/show"
  end

  def index
    @debtors_bills = DebtorsBills.all
    render "debtors_bills/index"
  end
end
