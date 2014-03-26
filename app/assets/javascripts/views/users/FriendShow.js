window.SplitMyBills.Views.FriendShow = Backbone.CompositeView.extend({

  template: JST["users/friend_show"],

  initialize: function(){

    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.debts(), "add", this.render);
    this.listenTo(this.model.debts(), "change", this.render);
    this.listenTo(this.model.debts(), "remove", this.render);

    this.addBillsIndexView();
  },

  addBillsIndexView: function() {
      debugger
  
    var billsIndexView = new SplitMyBills.Views.BillsIndex( { 
      collection: this.model.debts(),
    });
    this.addSubview(".bills-index", billsIndexView);
    billsIndexView.render();
  },

  render: function(){
    var content = this.template({ user: this.model });
    this.$el.html(content);

    this.renderSubviews();
    return this;
  },
})




