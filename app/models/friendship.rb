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

class Friendship < ActiveRecord::Base

  belongs_to :friend_1,
    :class_name => "User",
    :foreign_key => :friend_1_id,
    :primary_key => :id

  belongs_to :friend_2,
    :class_name => "User",
    :foreign_key => :friend_2_id,
    :primary_key => :id
end
