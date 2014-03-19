# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string(255)
#  name            :string(255)
#  password        :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#  session_token   :string(255)
#  password_digest :string(255)
#

require 'faker'

FactoryGirl.define do
  factory :user do
    email Faker::Internet.email
    name Faker::Name.first_name
    password "foobar"
    
  end
end
