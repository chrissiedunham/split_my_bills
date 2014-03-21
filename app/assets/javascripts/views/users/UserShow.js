window.SplitMyBills.Views.UserShow = Backbone.CompositeView.extend({

  template: JST["users/show"],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.bills(), "add", this.addBill)
    this.listenTo(this.model.bills(), "remove", this.removeBill)
    
    this.model.bills().each(this.addBill.bind(this));
    this.addNewBillView();
  },


  addNewBillView: function(){
    var newBillView = new SplitMyBills.Views.BillNew( { model: this.model } );
    this.addSubview(".new", newBillView);
    newBillView.render();
                 
  },

  addBill: function(bill){
    var billShowView = new SplitMyBills.Views.BillShow({ model: bill });            
    this.addSubview(".bills", billShowView);
    billShowView.render();
  },

  removeBill: function(bill){

    var billShowView = _(this.subviews()[".bills"]).find(function(subview){
      return subview.model == bill
    });
    this.removeSubview('.bills', billShowView);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);

    this.renderSubviews();
    return this;
  },

})

