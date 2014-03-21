window.SplitMyBills.Models.Bill = Backbone.Model.extend({

  urlRoot: '/api/bills',

  debtors: function(){
    if(!this._debtors){
    
      this._debtors = new SplitMyBills.Collections.Users([], {
        bill: this 
      });
    }
    return this._debtors;
  },
 
  parse: function(data){
    var debtors = data.debtors;
    this.debtors().set(debtors);

    return data;
         
  }


  

})

