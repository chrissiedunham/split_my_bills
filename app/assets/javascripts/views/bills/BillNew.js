window.SplitMyBills.Views.BillNew = Backbone.View.extend({

  template: JST["bills/new"],

  initialize: function(){
  },

  events: {
    "click button.add-bill": "showAddBillButton",
    "click button.create-bill": "createBill"
  },


  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  },
  
  showAddBillButton: function(event){
    event.preventDefault();

    $(".add-bill").toggleClass("hidden");
  },

  createBill: function(event) {
    event.preventDefault();
    var that = this;

    $(".add-bill").toggleClass("hidden");
    var billData = $('form.add-bill').serializeJSON()['bill'];
    var newBill = new SplitMyBills.Models.Bill( billData );
    newBill.save({}, {
      success: function(bill) {
        SplitMyBills.bills.add(bill);
      } 
    
    })
  }

  // newAddBillButton: function(event){
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


