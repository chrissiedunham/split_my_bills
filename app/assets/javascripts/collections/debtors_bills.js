window.SplitMyBills.Collections.DebtorsBills= Backbone.Collection.extend({

  url: '/api/debtors_bills',
  model: SplitMyBills.Models.DebtorsBill,

  getOrFetch: function(id) {
    var model;
    var debtorsBills = this;

    if ( model = debtorsBills.get(id)){
      model.fetch();
      return model;
    } else {
      model = new SplitMyBills.Models.DebtorsBill( { id: id });
      model.collection = this;
      model.fetch({
        success: function(debtorsBill) {
          debtorsBills.add(model);
        } 
      });
      return model;
    
    }

  
  }

})

