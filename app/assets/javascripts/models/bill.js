window.SplitMyBills.Models.Bill = Backbone.Model.extend({

  validates: function(attributes){
    if(!attributes || !attributes.name || attributes.name == ""){
       
    }            
  },
  urlRoot: '/api/bills',

  debtors: function(){
    if(!this._debtors){
    
      this._debtors = new SplitMyBills.Collections.Users([], {
        bill: this 
      });
    }
    return this._debtors;
  },

  creditor: function(){
    if(!this._creditor){
      this._creditor = new SplitMyBills.Models.User();
    }
    return this._creditor;
  },
 
  parse: function(data){
    this.debtors().set(data.debtors);
    this.creditor().set(data.creditor);

    return data;
         
  }


  

})

