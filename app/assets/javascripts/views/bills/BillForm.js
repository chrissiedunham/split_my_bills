window.SplitMyBills.Views.BillForm = Backbone.CompositeView.extend({

  template: JST["bills/form"],

  initialize: function(options){
    this.user = options.user;
    this.listenTo(this.model, "sync", this.render);
    
    this.model.debtors().each(this.addExistingDebtorSelectSubview.bind(this));
  },

  events: {
    "click .add-debtor": "addNewDebtorSelectSubview",
    "click .close": "removeDebtorSelect",
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
    this.addDebtorSelectSubview(selected_debtor.escape('name'));
  },

  addNewDebtorSelectSubview: function(event){
    event.preventDefault();
    this.addDebtorSelectSubview("");

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

  removeDebtorSelect: function() {

    this.updateDebtorSelects(remove = true);
  },

  updateDebtorSelects: function(remove){

    var numDebtors = $(this.$el).find('.debtor-selects input').length
    if (remove) { numDebtors -= 1 };
    var defaultPct = accounting.toFixed((100 / (numDebtors + 1)), 2);

    $(this.$el).find('.debtor-selects input').val(defaultPct);
                          
  },


})


