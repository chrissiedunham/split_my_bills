# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
user = User.create([{ email: 'chrissie@gmail.com', name: "Chrissie"},
                    { email: 'charlie@gmail.com', name: "Charlie"},
                    { email: 'karen@gmail.com', name: "Karen"}]

friendships = Friendship.create([ { friendship_1_id: 1, friendship_2_id: 2},
                                  { friendship_1_id: 2, friendship_2_id: 1},
                                  { friendship_1_id: 1, friendship_2_id: 3},
                                  { friendship_1_id: 3, friendship_2_id: 1},
                                  { friendship_1_id: 2, friendship_2_id: 3},
                                  { friendship_1_id: 3, friendship_2_id: 2} ])




