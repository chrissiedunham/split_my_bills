class Api::BillsController < ApplicationController
  before_action :require_signed_in!
  wrap_parameters :bill, :include => [:name, :date, :amount, :debtor_ids, :debtor_pcts]

  def create
    amount_cents = bill_params[:amount] * 100
    bill_params[:amount] = amount_cents
    @bill = current_user.credit_bills.new(bill_params)

    debtor_params[:debtor_ids].each_with_index do | id, i |

      pct = debtor_params[:debtor_pcts][i]
      amount_owed = DebtorsBills.get_amount_from_pct(bill_params[:amount], pct)
      @bill.debtors_bills.new(:debtor_id => id, :amount_owed_cents => amount_owed)
    end
    
    if @bill.save
      flash.now[:success] = ["successfully saved bill"]
     # render json: @bill
      render json: "bills/show"
    else
      render json: { errors: @bill.errors.full_messages }, status: 422
    end
  end

  def index
    @credit_bills = current_user.credit_bills
    @debit_bills = current_user.debit_bills
    @bills = @credit_bills + @debit_bills
#    render json: @bills.to_json(include: [:debtors])
    render "bills/index"
  end

  def show
    @bill = Bill.find(params[:id])
#    render json: @bill.to_json(include: [:debtors])
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
  
