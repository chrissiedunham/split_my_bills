window.SplitMyBills.Views.UserFriendShow = Backbone.CompositeView.extend({

  template: JST["users/friend_show"],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.bills(), "add", this.addBill);
    this.listenTo(this.model.bills(), "remove", this.removeBill);
    
    this.model.credit_bills().each(this.addBill.bind(this));
  },

  addBill: function(bill){
    var billShowView = new SplitMyBills.Views.BillShow({ model: bill, user: this.model });            
    var that = this;
    bill.fetch( { 
      success: function(){
        that.addSubview(".bills", billShowView);
        billShowView.render();
      }
    });
  },

  removeBill: function(bill){

    var billShowView = _(this.subviews()[".bills"]).find(function(subview){
      return subview.model == bill
    });
    this.removeSubview('.bills', billShowView);
  },

  render: function(){
    var content = this.template({ user: this.model });
    this.$el.html(content);

    this.renderSubviews();
    return this;
  },

})



