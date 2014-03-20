class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :friend_1_id
      t.integer :friend_2_id

      t.timestamps
    end
  end
end
