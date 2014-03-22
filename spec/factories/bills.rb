# == Schema Information
#
# Table name: bills
#
#  id           :integer          not null, primary key
#  name         :string(255)
#  date         :date
#  creditor_id  :integer
#  paid         :string(255)
#  created_at   :datetime
#  updated_at   :datetime
#  amount_cents :integer
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :bill do
    name "MyString"
    published "2014-03-19"
    amount "MyString"
     1
    owner_id 1
    paid "MyString"
  end
end
