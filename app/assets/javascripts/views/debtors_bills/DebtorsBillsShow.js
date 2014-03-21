window.SplitMyBills.Views.DebtorsBillsShow = Backbone.CompositeView.extend({

  template: JST["debtors_bills/show"],

  render: function(){
    var content = this.template({ bills: this.collection });
    this.$el.html(content);

    return this;
  },


})

