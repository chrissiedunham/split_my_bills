window.SplitMyBills.Views.BillForm = Backbone.CompositeView.extend({

  template: JST["bills/form"],

  initialize: function(options){
    this.user = options.user;
    this.listenTo(this.model, "sync", this.render);
    
  },

  events: {
    "click .add-debtor": "addNewDebtorSelectSubview",
    "click .remove-debtor": "removeDebtorSelect",
  },

  addNewDebtorSelectSubview: function(event, debtor){
    if(event) {
    
      event.preventDefault();
    }

    this.$el.find('.debtor-selects').append(JST["debtor_select"]( { debtor: debtor, friends: this.user.friends() }));
    this.updateDebtorSelects(remove = false);

  },
  render: function(){

    var content = this.template({ bill: this.model, friends: this.user.friends() }); 
    var that = this;
    this.$el.html(content);
    this.model.debtorsBills().each(function(debtor) {
       that.addNewDebtorSelectSubview(null, debtor); 
    })
    this.updateDebtorSelects();
    return this;
  },

  removeDebtorSelect: function(event) {
    $(event.target).parent().remove();
    this.updateDebtorSelects(remove = true);
  },

  updateDebtorSelects: function(remove){

    var numDebtors = $(this.$el).find('.debtor-selects input').length
    var defaultPct = accounting.toFixed((100 / (numDebtors + 1)), 2);

    $(this.$el).find('.debtor-selects input').val(defaultPct);
                          
  },


})


