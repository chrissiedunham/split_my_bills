class Api::DebtorsBillsController < ApplicationController
  before_action :require_signed_in!

  def update
    @debt = DebtorsBills.find(params[:id])
    if @debt.update_attributes( { paid: params[:paid] })
      render :json => @debt
    else 
      render :json => @debt.errors.full_messages
    end
  end

  def show
    @debt = DebtorsBills.find(params[:id])
    render :json => @debt 
  end

  def index
    @debts = DebtorsBills.all
    render :json => @debts
  end

  def debt_attributes
    params.require('debt').permit('paid')
  end
end
