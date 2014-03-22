# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140322182737) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bills", force: true do |t|
    t.string   "name"
    t.date     "date"
    t.integer  "creditor_id"
    t.string   "paid"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "amount_cents"
  end

  create_table "debtors_bills", force: true do |t|
    t.integer  "bill_id"
    t.integer  "debtor_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "paid"
    t.integer  "amount_owed_cents"
  end

  create_table "friendships", force: true do |t|
    t.integer  "friend_1_id"
    t.integer  "friend_2_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email"
    t.string   "name"
    t.string   "password"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "session_token"
    t.string   "password_digest"
  end

end
