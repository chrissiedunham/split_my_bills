class Api::BillsController < ApplicationController
  before_action :require_signed_in!
  wrap_parameters :bill, :include => [:name, :date, :amount, :debtor_ids, :debtor_pcts]

  def create
    @bill = current_user.credit_bills.new(bill_params)

    if debtor_params[:debtor_ids]
      debtor_params[:debtor_ids].each_with_index do | id, i |
        id = id.to_i
        pct = debtor_params[:debtor_pcts][i]
        amount_owed = DebtorsBills.get_amount_from_pct(bill_params[:amount], pct)
        @bill.debtors_bills.new(:debtor_id => id, :amount_owed_cents => amount_owed)
      end
      if @bill.save
        render "bills/show"
      else
        render json: @bill.errors.full_messages, status: 422
      end
    else
      render json: { responseJSON: "Please select at least one payee" }
    end
    
  end

  def index
    @credit_bills = current_user.credit_bills
    @debit_bills = current_user.debit_bills
    @current_user = current_user
    @bills = @credit_bills + @debit_bills
    render "bills/index"
  end

  def update
    @bill = Bill.find(params[:id])

    begin
      Bill.transaction do 
        @bill.debtors_bills.each do |bill|
          bill.destroy!
        end
        if debtor_params[:debtor_ids]
          debtor_params[:debtor_ids].each_with_index do | id, i |
            pct = debtor_params[:debtor_pcts][i]
            amount_owed = DebtorsBills.get_amount_from_pct(bill_params[:amount], pct)
            @bill.debtors_bills.new(:debtor_id => id, :amount_owed_cents => amount_owed)
          end

        end
        
        @bill.assign_attributes(bill_params)
        @bill.save!
      end
    rescue
      flash.now[:errors] = [@bill.errors.full_messages]
      render json: @bill.errors.full_messages, status: 422
    else
      render "bills/show"
    end
  end

  def show
    @bill = Bill.find(params[:id])
    @current_user = current_user
    render "bills/show"
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
    params.require(:bill).permit(:debtor_ids => [], :debtor_pcts => [])
  end
end
  
