# == Schema Information
#
# Table name: friendships
#
#  id          :integer          not null, primary key
#  friend_1_id :integer
#  friend_2_id :integer
#  created_at  :datetime
#  updated_at  :datetime
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :friendship do
    friend_1_id 1
    friend_2_id 1
  end
end
