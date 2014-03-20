window.SplitMyBills.Views.BillsIndex = Backbone.View.extend({

  template: JST["bills/index"],

  initialize: function(){
    this.listenTo(this.collection, "add sync remove", this.render);
  },

  events: {
    "click button.add-bill": "showAddBillButton",
    "click button.create-bill": "addBill"
  },

  render: function(){
    var content = this.template({ bills: this.collection });
    this.$el.html(content);
    return this;
  },

  showAddBillButton: function(event){
    event.preventDefault();

    $(".add-bill").toggleClass("hidden");

                     
  },
  addBill: function(event) {
    event.preventDefault();

    $(".add-bill").toggleClass("hidden");
    var billData = $('form.add-bill').serializeJSON()['bill'];
    var newBill = new SplitMyBills.Models.Bill( billData );
    newBill.save({}, {
      success: function(bill) {
        SplitMyBills.bills.add(bill);
      } 
    
    })
  }

  

})
