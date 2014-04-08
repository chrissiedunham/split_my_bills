window.SplitMyBills.Models.Friend = Backbone.Model.extend({

  urlRoot: '/friends',

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

  netOwedToCurrentUser: function(){
    var net = 0;
    this.dbsOwedByCurrentUser().each(function(db) {
      if (db.get('paid') == false) { 
        net -= parseFloat(db.get('amount_owed'));
      } 
    })                       
    this.dbsOwedToCurrentUser().each(function(db) {
      if (db.get('paid') == false){ net += parseFloat(db.get('amount_owed')) } 
    })                       
    return net;
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

  parse: function(data){
    this.setDBsListeners(this.dbsWithCurrentUser());

    this.dbsOwedToCurrentUser().set(data.dbs_owed_to_current_user);
    delete data.dbsOwedToCurrentUser;

    this.dbsOwedByCurrentUser().set(data.dbs_owed_by_current_user);
    delete data.dbsOwedByCurrentUser;
  
    return data;
  }


})

