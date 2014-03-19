# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :bills_payee, :class => 'BillsPayees' do
    item_id 1
    payee_id 1
    amount_owed 1
  end
end
