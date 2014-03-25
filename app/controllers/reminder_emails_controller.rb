class ReminderEmailsController < ApplicationController
  def create 
    @bill = Bill.find(params[:bill_id])
    @bill.debtors.each do |debtor|
      amount_owed = debtor.amount_owed_on(@bill)
      AuthMailer.send_reminder_email(@bill, debtor, amount_owed).deliver
    end

    
  end
end
