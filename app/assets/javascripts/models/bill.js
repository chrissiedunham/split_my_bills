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

  creditor: function(){
    if(!this._creditor){
      this._creditor = new SplitMyBills.Models.User();
    }
    return this._creditor;
  },

  debtorsBills: function(){
    if(!this._debtorsBills){ 
      this._debtorsBills = new SplitMyBills.Collections.DebtorsBills([], { 
        bill: this 
      });
    }
    return this._debtorsBills;
  },
  
 
  
 
  parse: function(data){
    this.debtors().set(data.debtors);
    this.creditor().set(data.creditor);
    this.debtorsBills().set(data.debtorsBills);
    return data;
         
  }


  

})

