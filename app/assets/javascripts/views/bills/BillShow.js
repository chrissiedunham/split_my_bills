window.SplitMyBills.Views.BillShow = Backbone.CompositeView.extend({

  tagName: 'tr',
  template: JST["bills/show"],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.debtors(), "add", this.render);
    this.listenTo(this.model.creditor(), "add", this.render);
    
    this.addEditSubview();

  },

  events: {
    "click .bill-link": "toggleBillShow",
    "click .delete-bill": "deleteBill",
    "click .edit-bill-btn": "editBill",
  },

  addEditSubview: function(){

    var editView = new SplitMyBills.Views.BillForm({ user: this.model.creditor(), model: this.model });
    this.addSubview(".edit-bill", editView);
    editView.render();
  
  },

  deleteBill: function(event){
    this.model.destroy();
  },

  render: function(){
    var content = this.template({ bill: this.model, debtors: this.model.debtors() });
    this.$el.html(content);
    this.renderSubviews();

    return this;
  },

  toggleBillShow: function(event){
    event.preventDefault();                     
    $(event.target).parent().find('.bill-show').toggleClass("hidden");
    //$('.bill-show').toggleclass("hidden");
  },
  
  editBill: function(event){
    event.preventDefault();                     
    $(event.target).parents().closest("td").find(".edit-bill form").toggleClass("hidden");




  }
  

})

