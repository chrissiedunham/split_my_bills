window.SplitMyBills.Models.User = Backbone.Model.extend({

  urlRoot: '/users',

  // Note that debtors bills represent the join on debtors and bills,
  // not the same as debit bills (actual bill objects on which user owed
  // money)
  //
  dbsOwedByCurrentUser: function(){
    if(!this._debtorsBillsBy){ 
      this._debtorsBillsBy = new SplitMyBills.Collections.DebtorsBills([], { 
        user: this 
      });
    } 
    return this._debtorsBillsBy;
  },
  dbsOwedToCurrentUser: function(){
    if(!this._debtorsBillsTo){ 
      this._debtorsBillsTo = new SplitMyBills.Collections.DebtorsBills([], { 
        user: this 
      });
    } 
    return this._debtorsBillsTo;
  },
  dbsWithCurrentUser: function(){
    if(!this._dbsWithCurrentUser){ 
      this._dbsWithCurrentUser = new SplitMyBills.Collections.DebtorsBills([], { 
        user: this 
      });
    } 
    return this._dbsWithCurrentUser;
  },

  bills: function() {
    if(!this._bills){
    
      this._bills = new SplitMyBills.Collections.Bills([], {
        user: this 
      });
    }
    return this._bills;
  },

  creditBills: function(){
    if(!this._creditBills){
      this._creditBills = new SplitMyBills.Collections.Bills([], {
        user: this 
      });
    }
    return this._creditBills;
  },

  debitBills: function(){
    if(!this._debitBills){
    
      this._debitBills = new SplitMyBills.Collections.Bills([], {
        user: this 
      });
    }
    return this._debitBills;
  },

  debtorsBills: function(){
    if(!this._debtorsBills){ 
      this._debtorsBills = new SplitMyBills.Collections.DebtorsBills([], { 
        user: this 
      });
    } 
    return this._debtorsBills;
  },

  friends: function(){
    if(!this._friends){
    
      this._friends = new SplitMyBills.Collections.Users([], {
        user: this
      });
    }          
    return this._friends;
  },

  net_balance: function () {
    var net = 0;
    this.bills().each(function(bill) {
      net += parseInt(bill.netToCurrentUser());
    })
    return net;
    
  },

  relevantBills: function() {
    if(!this._relevantBills){
    
      this._relevantBills = new SplitMyBills.Collections.Bills([], {
        user: this 
      });
    }
    return this._relevantBills;
    
  },

  setDBsListeners: function (DBs) {
    this.listenTo(this.dbsOwedByCurrentUser(), 'add', function (model) {
      DBs.add(model);
    });
    this.listenTo(this.dbsOwedToCurrentUser(), 'add', function (model) {
      DBs.add(model);
    });
    this.listenTo(this.dbsOwedByCurrentUser(), 'remove', function (model) {
      DBs.remove(model);
    });
    this.listenTo(this.dbsOwedToCurrentUser(), 'remove', function (model) {
      DBs.remove(model);
    });
  },

  setBillsListeners: function (bills) {
    this.listenTo(this.creditBills(), 'add', function (model) {
      bills.add(model);
    });
    this.listenTo(this.debitBills(), 'add', function (model) {
      bills.add(model);
    });
    this.listenTo(this.creditBills(), 'remove', function (model) {
      bills.remove(model);
    });
    this.listenTo(this.debitBills(), 'remove', function (model) {
      bills.remove(model);
    });
   },

  parse: function(data){
    this.setBillsListeners(this.bills());

    this.creditBills().set(data.credit_bills);
    delete data.credit_bills;

    this.debitBills().set(data.debit_bills);
    delete data.debit_bills;
    
    this.relevantBills().set(data.relevant_bills);
    delete data.relevant_bills;

    this.dbsOwedToCurrentUser().set(data.dbs_owed_to_current_user);
    delete data.dbsOwedToCurrentUser;

    this.dbsOwedByCurrentUser().set(data.dbs_owed_by_current_user);
    delete data.dbsOwedByCurrentUser;

    this.friends().set(data.friends);
    delete data.friends;
  
    return data;
  }


})

