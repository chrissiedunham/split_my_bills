window.SplitMyBills.Models.Bill = Backbone.Model.extend({

  urlRoot: '/api/bills',

  creditor: function(){
    if(!this._creditor){
      this._creditor = new SplitMyBills.Models.User();
    }
    return this._creditor;
  },

  debtors: function(){
    if(!this._debtors){
    
      this._debtors = new SplitMyBills.Collections.Users([], {
        bill: this 
      });
    }
    return this._debtors;
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
    delete data.debtors

    this.creditor().set(data.creditor);
    delete data.creditor

    this.debtorsBills().set(data.debtorsBills);
    delete data.debtorBills

    return data;
         
  }


  

})

