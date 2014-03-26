window.SplitMyBills.Models.User = Backbone.Model.extend({

  urlRoot: '/users',

  debtorsBills: function(){
    if(!this._debtorsBills){ 
      this._debtorsBills = new SplitMyBills.Collections.DebtorsBills([], { 
        user: this 
      });
    } 
    return this._debtorsBills;
  },
  credit_bills: function(){
    if(!this._credit_bills){
      this._credit_bills = new SplitMyBills.Collections.Bills([], {
        user: this 
      });
    }
    return this._credit_bills;
  },

  debit_bills: function(){
    if(!this._debit_bills){
    
      this._debit_bills = new SplitMyBills.Collections.Bills([], {
        user: this 
      });
    }
    return this._debit_bills;
  },

  bills: function() {
    if(!this._bills){
    
      this._bills = new SplitMyBills.Collections.Bills([], {
        user: this 
      });
    }
    return this._bills;
    
  },

  relevantBills: function() {
    if(!this._relevantBills){
    
      this._relevantBills = new SplitMyBills.Collections.Bills([], {
        user: this 
      });
    }
    return this._relevantBills;
    
  },

  debtorsBills: function(){
    if(!this._debtorsBills){ 
      this._debtorsBills = new SplitMyBills.Collections.DebtorsBills([], { 
        user: this 
      });
    } 
    return this._debtorsBills;
  },
  credit_bills: function(){
    if(!this._credit_bills){
      this._credit_bills = new SplitMyBills.Collections.Bills([], {
        user: this 
      });
    }
    return this._credit_bills;
  },

  debit_bills: function(){
    if(!this._debit_bills){
    
      this._debit_bills = new SplitMyBills.Collections.Bills([], {
        user: this 
      });
    }
    return this._debit_bills;
  },

  bills: function() {
    if(!this._bills){
    
      this._bills = new SplitMyBills.Collections.Bills([], {
        user: this 
      });
    }
    return this._bills;
    
  },
  friends: function(){
    if(!this._friends){
    
      this._friends = new SplitMyBills.Collections.Users([], {
        user: this
      });
    }          
    return this._friends;
  },

  setBillsListeners: function (bills) {
    this.listenTo(this.credit_bills(), 'add', function (model) {
      bills.add(model);
    });
    this.listenTo(this.debit_bills(), 'add', function (model) {
      bills.add(model);
    });
    this.listenTo(this.credit_bills(), 'remove', function (model) {
      bills.remove(model);
    });
    this.listenTo(this.debit_bills(), 'remove', function (model) {
      bills.remove(model);
    });
   },

  net_balance: function () {
    var net = 0;
    this.bills().each(function(bill) {
      net += parseInt(bill.escape('net_to_current_user'));
    })
    return net;
    
  },

  parse: function(data){
    this.setBillsListeners(this.bills());

    this.credit_bills().set(data.credit_bills);
    delete data.credit_bills;

    this.debit_bills().set(data.debit_bills);
    delete data.debit_bills;
    
    this.relevantBills().set(data.relevant_bills);
    delete data.relevant_bills;

    this.debtorsBills().set(data.debtors_bills);
    delete data.debtorsBills;

    this.friends().set(data.friends);
    delete data.friends;
  
    return data;
  }


})

