window.SplitMyBills.Views.BillsIndex= Backbone.CompositeView.extend({

  template: JST["bills/index"],

  initialize: function(options){

    this.user = options.user;

    this.listenTo(this.collection, "add change sync", this.render);
    this.listenTo(this.collection, "add", this.addBill);
    this.listenTo(this.collection, "remove", this.removeBill);
    
    this.collection.each(this.addBill.bind(this));
  },

  addBill: function(bill){

    var billShowView = new SplitMyBills.Views.BillShow({ model: bill, user: this.user });            
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
    var content = this.template({ user: this.user});
    this.$el.html(content);

    this.renderSubviews();
    return this;
  },

})




