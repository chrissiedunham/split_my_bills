window.SplitMyBills.Views.FriendShow = Backbone.CompositeView.extend({

  template: JST["users/friend_show"],

  initialize: function(){

    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.relevantBills(), "add", this.render);
    this.listenTo(this.model.relevantBills(), "change", this.render);
    this.listenTo(this.model.relevantBills(), "remove", this.render);

    this.addrelevantBillsIndexView();
  },

  events: {
          
          
  },

  addrelevantBillsIndexView: function() {
    var indexView = new SplitMyBills.Views.BillsIndex( { 
      collection: this.model.relevantBills(),
      user: this.model
    });
    this.addSubview(".debtors-bills-index", indexView);
    indexView.render();
  },

  render: function(){
    var content = this.template({ user: this.model });
    this.$el.html(content);

    this.renderSubviews();
    return this;
  },
})




