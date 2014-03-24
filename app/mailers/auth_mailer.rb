class AuthMailer < ActionMailer::Base
  default from: "admin@splitmybills.com"

  def send_signup_email(user)
    mail(
      :to => user.email,
      :subject => 'Thanks for signing up!'
    )
  end

  def send_reminder_email(debtor)
    mail(
      :to => debtor.email,
      :subject => "Pay your bill!"
    )
  end
end
