window.SplitMyBills.Collections.Bills = Backbone.Collection.extend({

  url: '/api/bills',
  model: SplitMyBills.Models.Bill

})
