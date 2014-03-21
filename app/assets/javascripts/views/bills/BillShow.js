
window.SplitMyBills.Views.BillShow = Backbone.View.extend({

  template: JST["bills/show"],

  initialize: function(){
//    this.listenTo(this.model, "remove", this.render)

  },

  events: {
    "click .bill-link": "showFull",
    "click .delete-bill": "deleteBill",
    "click .delete-bill-link": "deleteBill"
  },

  render: function(){
    var content = this.template({ bill: this.model, debtors: this.model.debtors() });
    this.$el.html(content);

    return this;
  },

  showFull: function(event){
    event.preventDefault();                     
    $(event.target).parent().find('.bill-show').toggleClass("hidden");
  },

  deleteBill: function(event){
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  
  
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

