window.SplitMyBills.Collections.Bills = Backbone.Collection.extend({

  url: '/api/bills',
  model: SplitMyBills.Models.Bill,

  getOrFetch: function(id) {
    var model;
    var bills = this;

    if ( model = bills.get(id)){
      model.fetch();
      return model;
    } else {
      model = new SplitMyBills.Models.Bill( { id: id });
      model.collection = this;
      model.fetch({
        success: function(bill) {
          bills.add(model);
        } 
      });
      return model;
    
    }

  
  }

})
