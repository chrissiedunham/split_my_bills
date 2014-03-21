window.SplitMyBills.Views.BillNew = Backbone.View.extend({

  template: JST["bills/new"],

  initialize: function(){
  },

  events: {
    "click button.add-bill": "showAddBillButton",
    "click button.create-bill": "createBill",
    "click a.add-debtor": "addDebtorSelect"
  },

  render: function(){

    var content = this.template( { friends: this.user.friends() }); //current users friends

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
    SplitMyBills.bills.create(billData);
    SplitMyBills.bills.fetch();
  },

  addDebtorSelect: function(event){
    event.preventDefault();

    var newSelect = JST["debtor_select"]( { friends: this.collection });
    $(".debtor-selects").append(newSelect);

    var numDebtors = $(".debtor-selects select").length;
    var defaultPct = (100 / (numDebtors + 1));

    $(".debtor-selects input").val(defaultPct);
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


