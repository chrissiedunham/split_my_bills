# == Schema Information
#
# Table name: bills
#
#  id          :integer          not null, primary key
#  name        :string(255)
#  published   :date
#  amount      :string(255)
#  creditor_id :integer
#  paid        :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#

require 'spec_helper'

describe Bill do
  
  describe "associations" do
  
    it { should belong_to(:creditor) }
    it { should have_many(:debtors) }
    # it { should have_many(:_bills)}
  
  end
end
