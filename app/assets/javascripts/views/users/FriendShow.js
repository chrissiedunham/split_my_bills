window.SplitMyBills.Views.FriendShow = Backbone.CompositeView.extend({

  template: JST["users/friend_show"],

  initialize: function(options){

    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.debtorsBills(), "add change remove", this.render);
    this.addDebtorsBillsIndexView(); 
   },
  //
  // events: {
  //         
  //         
  // },
  //
  addDebtorsBillsIndexView: function() {
    var indexView = new SplitMyBills.Views.DebtorsBillsIndex( { 
      user: this.model,
      collection: this.model.dbsWithCurrentUser()
    });
    this.addSubview(".debtors-bills-index", indexView);
    indexView.render();
  },

  render: function(){
    var content = this.template({ 
      user: this.model, 
      debtorsBills: this.model.debtorsBills() 
    });
    this.$el.html(content);

    return this;
  },
})




