# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string(255)
#  name            :string(255)
#  password        :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#  session_token   :string(255)
#  password_digest :string(255)
#

require 'spec_helper'

describe User do
  # it "requires a username" do
  # end
  
  describe "associations" do
  
    it { should have_many(:credit_bills) }
    it { should have_many(:debit_bills) }
    it { should have_many(:friends) }
    it { should have_many(:bills)}
  
  end
end
