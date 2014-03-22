window.SplitMyBills.Views.BillsIndex = Backbone.CompositeView.extend({

  template: JST["bills/index"],

  initialize: function(){
    //should be this.model, this.model.bills, etc
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addBill)
    this.listenTo(this.collection, "remove", this.removeBill)
    
    this.collection.each(this.addBill.bind(this));
    this.addNewBillView();
  },

  render: function(){
    var content = this.template({ bills: this.collection });
    this.$el.html(content);

    this.renderSubviews();
    return this;
  },


  addNewBillView: function(){
    var newBillView = new SplitMyBills.Views.BillNew( { collection: SplitMyBills.friends });
    this.addSubview(".new", newBillView);
    newBillView.render();
                 
  },

  addBill: function(bill){
    var billShowView = new SplitMyBills.Views.BillShow({ model: bill });            
    this.addSubview(".bills", billShowView);
    billShowView.render();
  },


  deleteBill: function(event){
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  removeBill: function(bill){

    var billShowView = _(this.subviews()[".bills"]).find(function(subview){
      return subview.model == bill
    });
    this.removeSubview('.bills', billShowView);
  }

})
