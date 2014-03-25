class AuthMailer < ActionMailer::Base
  default from: "admin@splitmybills.com"

  def signup_email(user)
    mail(
      :to => user.email,
      :subject => 'Thanks for signing up!'
    )
  end

  def reminder_email(bill, debtor, amount_owed)

    @bill = bill
    @amount_owed = amount_owed
    mail(
      :to => debtor.email,
      :subject => "Pay your bill!"
    )
  end
end
