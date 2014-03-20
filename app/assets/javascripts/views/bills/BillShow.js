
window.SplitMyBills.Views.BillShow = Backbone.View.extend({

  template: JST["bills/show"],

  initialize: function(){
  },

  events: {
  },

  render: function(){
    var content = this.template({ bills: this.model });
    this.$el.html(content);
    return this;
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

