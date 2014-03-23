window.SplitMyBills.Views.DebtorSelect = Backbone.View.extend({

  initialize: function(options){
    this.selected_debtor = options.selected_debtor             
  },
  template: JST["debtor_select"],

  render: function(){

    var content = this.template({ 
      friends: this.collection,
      selected_debtor: this.selected_debtor

    }); //current users friends

    this.$el.html(content);
    return this;
  },


})



