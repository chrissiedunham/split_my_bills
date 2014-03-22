window.SplitMyBills.Views.BillShow = Backbone.CompositeView.extend({

  tagName: 'tr',
  template: JST["bills/show"],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.debtors(), "add", this.render)

  },

  events: {
    "click .bill-link": "toggleBillShow",
    "click .cancel-bill": "toggleBillShow",
    "click .delete-bill": "deleteBill",
    "click .edit-bill": "editBill",
  },

  deleteBill: function(event){
    this.model.destroy();
  },

  render: function(){
    var content = this.template({ bill: this.model, debtors: this.model.debtors() });
    this.$el.html(content);

    return this;
  },

  toggleBillShow: function(event){
    event.preventDefault();                     
    $(event.target).parent().find('.bill-show').toggleClass("hidden");
    //$('.bill-show').toggleclass("hidden");
  },
  
  editBill: function(event){
    event.preventDefault();                     
    $(event.target).parent().find('.bill-show').toggleClass("hidden");

  }

  
  
  // showAddBillButton: function(event){
  //   event.preventDefault();
  //
  //   $(".add-bill").toggleClass("hidden");
  // },
  // addBill: function(event) {
  //   event.preventDefault();
  //
  //   $(".add-bill").toggleClass("hidden");
  //   var billData = $('form.add-bill').serializeJSON()['bill'];
  //   var newBill = new SplitMyBills.Models.Bill( billData );
  //   newBill.save({}, {
  //     success: function(bill) {
  //       SplitMyBills.bills.add(bill);
  //     } 
  //   
  //   })
  // }

  

})

