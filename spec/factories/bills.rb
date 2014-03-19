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
