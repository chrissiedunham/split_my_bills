class ReminderEmailsController < ApplicationController
  def create 
    @bill = Bill.find(params[:bill_id])
    @bill.debtors.each do |debtor|
      AuthMailer.send_reminder_email(debtor).deliver
    end

    
  end
end
