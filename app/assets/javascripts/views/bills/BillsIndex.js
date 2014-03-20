window.SplitMyBills.Views.BillsIndex = Backbone.View.extend({

  template: JST["bills/index"],

  initialize: function(){
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
  }

  

})
