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

  addDebtorSelectSubview: function(selected) {

    var debtorSelectView = new SplitMyBills.Views.DebtorSelect({
      selected_debtor: selected,
      friends: this.user.friends()
    });
    

    this.addSubview(".debtor-selects", debtorSelectView);
    debtorSelectView.render();

    this.updateDebtorSelects(remove = false);
  },

  addExistingDebtorSelectSubview: function(selected_debtor){
    $('.debtor-selects').append(JST["debtor_select"]( { friends: this.user.friends() }));
    //this.addDebtorSelectSubview(selected_debtor.escape('name'));
  },

  addNewDebtorSelectSubview: function(event){
    event.preventDefault();
    $('.debtor-selects').append(JST["debtor_select"]( { friends: this.user.friends() }));
    this.updateDebtorSelects(remove = false);
    //this.addDebtorSelectSubview("");

  },
  render: function(){

    var content = this.template({ bill: this.model, friends: this.user.friends() }); 

    this.$el.html(content);
    this.renderSubviews();
    this.updateDebtorSelects();
//    this._addSelects();
    return this;
  },

  // _addSelects: function() {
  //   $('.chosen-select').chosen({
  //     allow_single_deselect: true,
  //     no_results_text: 'No results matched',
  //     width: '100%',
  //     disable_search_threshold: 3
  //   });
  // },

  removeDebtorSelect: function(event) {
    $(event.target).parent().remove();
    this.updateDebtorSelects(remove = true);
  },

  updateDebtorSelects: function(remove){

    var numDebtors = $(this.$el).find('.debtor-selects input').length
    var defaultPct = accounting.toFixed((100 / (numDebtors + 1)), 2);

    $(this.$el).find('.debtor-selects input').val(defaultPct);
    debugger
                          
  },


})


