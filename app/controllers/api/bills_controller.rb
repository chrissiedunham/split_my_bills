class Api::BillsController < ApplicationController
  before_action :require_signed_in!
  wrap_parameters :bill, :include => [:name, :date, :amount, :debtor_ids, :debtor_pcts]

  def create
    @bill = current_user.credit_bills.new(bill_params)

    debtor_params[:debtor_ids].each_with_index do | id, i |

      pct = debtor_params[:debtor_pcts][i]
      amount_owed = DebtorsBills.get_amount_from_pct(bill_params[:amount], pct)
      @bill.debtors_bills.new(:debtor_id => id, :amount_owed_cents => amount_owed)
    end
    
    if @bill.save
      flash.now[:success] = ["successfully saved bill"]
     # render json: @bill
      render "bills/show"
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

  def update
    @bill = Bill.find(params[:id])

    begin
      Bill.transaction do 
        @bill.debtors_bills.each do |bill|
          bill.destroy!
        end
        debtor_params[:debtor_ids].each_with_index do | id, i |

          pct = debtor_params[:debtor_pcts][i]
          amount_owed = DebtorsBills.get_amount_from_pct(bill_params[:amount], pct)
          @bill.debtors_bills.new(:debtor_id => id, :amount_owed_cents => amount_owed)
        end
        
        @bill.assign_attributes(bill_params)
        @bill.save!
      end
    rescue
      render json: { errors: @bill.errors.full_messages }, status: 422
    else
      render "bills/show"
    end
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
  
