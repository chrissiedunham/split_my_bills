window.SplitMyBills.Collections.Debts= Backbone.Collection.extend({

  url: '/api/debtors_bills',
  model: SplitMyBills.Models.Debt,

  getOrFetch: function(id) {
    var model;
    var debts= this;

    if ( model = debts.get(id)){
      model.fetch();
      return model;
    } else {
      model = new SplitMyBills.Models.Debt( { id: id });
      model.collection = this;
      model.fetch({
        success: function(debt) {
          debts.add(model);
        } 
      });
      return model;
    
    }

  
  }

})

