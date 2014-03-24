window.SplitMyBills.Views.UserShow = Backbone.CompositeView.extend({

  template: JST["users/show"],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.credit_bills(), "add", this.addBill);
    this.listenTo(this.model.credit_bills(), "remove", this.removeBill);
    
    this.model.credit_bills().each(this.addBill.bind(this));
    this.addNewBillView();
  },
  events: {
          
    "click button.add-bill": "showNewBillForm",
    "click button.cancel-bill": "hideNewBillForm" 

  },

  addNewBillView: function(){
    var newBill = new SplitMyBills.Models.Bill();
    var newBillView = new SplitMyBills.Views.BillForm( { model: newBill, user: this.model } );
    this.addSubview(".new", newBillView);
    newBillView.render();
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

  hideNewBillForm: function(event){
    event.preventDefault();
    $('form.add-bill').addClass('hidden');
    $('button.add-bill').removeClass('hidden');
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

  showNewBillForm: function(event){
    event.preventDefault();
    $('form.add-bill').removeClass('hidden');
    $('button.add-bill').addClass('hidden');
    $('form.add-bill input').val("");
  },

})


