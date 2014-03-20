# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
user = User.create([{ email: 'chrissie@gmail.com', name: "Chrissie", password: "asdfasdf"},
                    { email: 'charlie@gmail.com', name: "Charlie", password: "asdfasdf"},
                    { email: 'karen@gmail.com', name: "Karen", password_digest: "sdkw" }])

friendships = Friendship.create([ { friend_1_id: 1, friend_2_id: 2},
                                  { friend_1_id: 2, friend_2_id: 1},
                                  { friend_1_id: 1, friend_2_id: 3},
                                  { friend_1_id: 3, friend_2_id: 1},
                                  { friend_1_id: 2, friend_2_id: 3},
                                  { friend_1_id: 3, friend_2_id: 2} ])




