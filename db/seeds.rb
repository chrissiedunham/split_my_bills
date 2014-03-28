# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
#
ActiveRecord::Base.transaction do
  
  user1 = User.create!({ email: 'chrissie@gmail.com', name: "Chrissie Page", password: "asdfasdf"})
  user2 = User.create!({ email: 'charlie@gmail.com', name: "Charlie Parker", password: "asdfasdf"})
  user3 = User.create!({ email: 'superdo@gmail.com', name: "Naomi Rudnitzki", password: "asdfasdf"})
  user4 = User.create!({ email: 'yoyo@gmail.com', name: "Karl Hahn", password_digest: "sdkw" })
  user5 = User.create!({ email: 'bobobo@gmail.com', name: "Boris Walter", password_digest: "sdkw" })
  user6 = User.create!({ email: 'tjs_not_the_store@gmail.com', name: "TJ Page", password_digest: "sdkw"})

  friendships = Friendship.create!([ { friend_1_id: 1, friend_2_id: 2},
                                    { friend_1_id: 2, friend_2_id: 1},
                                    { friend_1_id: 1, friend_2_id: 3},
                                    { friend_1_id: 3, friend_2_id: 1},
                                    { friend_1_id: 2, friend_2_id: 3},
                                    { friend_1_id: 3, friend_2_id: 2},
                                    { friend_1_id: 4, friend_2_id: 1},
                                    { friend_1_id: 5, friend_2_id: 1},
                                    { friend_1_id: 6, friend_2_id: 1},
                                    { friend_1_id: 1, friend_2_id: 4},
                                    { friend_1_id: 1, friend_2_id: 5},
                                    { friend_1_id: 1, friend_2_id: 6} ])


  bill1 = user1.credit_bills.new({ date: Date.parse('21-3-2014'), name: "TJs groceries", amount_cents: 5460 })
  bill1.debtors_bills.new({ debtor_id: 2, amount_owed_cents: 2730})
  bill1.save!

  
  bill2 = user1.credit_bills.new({ date: Date.parse('11-3-2014'), name: "Rent", amount_cents: 21000 })
  bill_2_debtors = [{ debtor_id: 2, amount_owed_cents: 70000},
                            { debtor_id: 3, amount_owed_cents: 70000}]
  bill_2_debtors.each do |db|
    bill2.debtors_bills.new(db) 
  end
  bill2.save!


  bill3 = user1.credit_bills.new({ date: Date.parse('11-3-2014'), name: "Electricity", amount_cents: 3396 })
  bill_3_debtors = [{ debtor_id: 2, amount_owed_cents: 1132},
                            { debtor_id: 3, amount_owed_cents: 1132}]
  bill_3_debtors.each do |db|
    bill3.debtors_bills.new(db) 
  end
  bill3.save!

  bill4 = user4.credit_bills.new({ date: Date.parse('3-4-2014'), name: "LA trip gas", amount_cents: 8000})
  bill_4_debtors = [{debtor_id: 1, amount_owed_cents: 2000},
                            { debtor_id: 5, amount_owed_cents: 2000},
                            { debtor_id: 6, amount_owed_cents: 2000}]


  bill_4_debtors.each do |db|
    bill4.debtors_bills.new(db) 
  end
  bill4.save!

                            



end
