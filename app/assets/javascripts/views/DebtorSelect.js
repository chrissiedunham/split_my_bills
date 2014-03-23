window.SplitMyBills.Views.DebtorSelect = Backbone.View.extend({

  template: JST["debtor_select"],

  render: function(){

    var content = this.template({ friends: this.collection }); //current users friends

    this.$el.html(content);
    return this;
  },


})



