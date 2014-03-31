window.SplitMyBills.Views.Home= Backbone.CompositeView.extend({

  template: JST["home"],

  initialize: function(){
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.bills(), "add", this.render);
    this.listenTo(this.model.bills(), "change", this.render);
    this.listenTo(this.model.bills(), "remove", this.render);

    this.addNewBillView();
  },

  addNewBillView: function(){
    var newBill = new SplitMyBills.Models.Bill();
    var newBillView = new SplitMyBills.Views.BillNew( { 
      model: newBill, 
      user: this.model 
    });
    this.addSubview(".new", newBillView);
    newBillView.render();
  },

  render: function(){
    var showAddBillButton = (currentUserID == this.model.get('id'))
    var content = this.template({ user: this.model, showAddBillButton: showAddBillButton });
    this.$el.html(content);

    this.renderSubviews();
    return this;
  },

})



