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

  netToCurrentUser: function(){
    var net = 0;
    var current_owes = 0;
    var belongs_to_current = true;
    this.debtorsBills().each(function(db) {
      if (db.escape('paid') == "true" ) { 
        net += 0;
      } else if (db.get('debtor_id') == currentUserID) { 
        belongs_to_current = false;
        current_owes = parseFloat(db.escape('amount_owed'));
      }
      else {
        net += parseFloat(db.escape('amount_owed'));
      }
    })
    return belongs_to_current ? net : current_owes;
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

