window.SplitMyBills.Views.BillsIndex = Backbone.View.extend({

  template: JST["bills/index"],

  initialize: function(){
  },

  render: function(){
    var content = this.template({ bills: this.collection });
    this.$el.html(content);
    return this;
  }

  

})
