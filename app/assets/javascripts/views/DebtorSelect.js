window.SplitMyBills.Views.BillForm = Backbone.View.extend({

  template: JST["debtor_select"],

  initialize: function(options){
    this.user = options.user; 
  },

  events: {
    "click button.create-bill": "createBill",
    "click a.add-debtor": "addDebtorSelect",
    "click .close": "removeDebtorSelect",
    "click .cancel-bill": "removeBillForm"
  },

  render: function(){

    var friends = this.user.friends();
    var content = this.template({ friends: friends }); //current users friends

    this.$el.html(content);
    return this;
  },


})



