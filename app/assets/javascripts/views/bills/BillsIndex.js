window.SplitMyBills.Views.BillsIndex = Backbone.CompositeView.extend({

  template: JST["bills/index"],

  initialize: function(){
    this.listenTo(this.collection, "add sync remove", this.render);
    this.listenTo(this.collection, "add", this.addBill)
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
    var newBillView = new SplitMyBills.Views.BillNew();
    this.addSubview(".new", newBillView);
    newBillView.render();
                 
  },

  addBill: function(bill){
    var billShowView = new SplitMyBills.Views.BillShow({ model: bill });            
    this.addSubview(".bills", billShowView);
    billShowView.render();
  },

})
