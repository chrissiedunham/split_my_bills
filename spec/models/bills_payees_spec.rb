# == Schema Information
#
# Table name: bills_payees
#
#  id          :integer          not null, primary key
#  item_id     :integer
#  debtor_id   :integer
#  amount_owed :integer
#  created_at  :datetime
#  updated_at  :datetime
#

require 'spec_helper'

describe BillsPayees do
  pending "add some examples to (or delete) #{__FILE__}"
end
