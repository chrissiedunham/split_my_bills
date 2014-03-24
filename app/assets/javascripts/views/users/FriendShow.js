window.SplitMyBills.Views.FriendShow = Backbone.CompositeView.extend({

  template: JST["users/friend_show"],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);

    this.addBillsIndexView();
  },

  addBillsIndexView: function() {
    var billsIndexView = new SplitMyBills.Views.BillsIndex( { 
      collection: this.model.bills(),
      user: this.model
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




