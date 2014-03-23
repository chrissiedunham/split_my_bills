window.SplitMyBills.Views.BillForm = Backbone.CompositeView.extend({

  template: JST["bills/form"],

  initialize: function(options){
    this.listenTo(this.model, "sync", this.render);

    this.model.debtors().each(this.addExistingDebtorSelectSubview.bind(this));
  },

  events: {
    "click button.create-bill": "createBill",
    "click button.update-bill": "updateBill",
    "click a.add-debtor": "addDebtorSelectSubview",
    "click .close": "removeDebtorSelect",
    "click .cancel-bill": "removeBillForm",
    "addSelect": "addDebtorSelect"
  },

  addDebtorSelectSubview: function(selected) {

    var debtorSelectView = new SplitMyBills.Views.DebtorSelect({
      selected_debtor: selected
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
  
  createBill: function(event) {
    event.preventDefault();

    $(event.target).parents('form').addClass('hidden');
    $('button.add-bill').removeClass('hidden');
    var billData = $('form.add-bill').serializeJSON()['bill'];
    SplitMyBills.bills.create(billData);
    SplitMyBills.bills.fetch();

  },

  render: function(){

    var content = this.template({ bill: this.model}); 

    this.$el.html(content);
    this.renderSubviews();
    return this;
  },

  removeDebtorSelect: function() {

    this.updateDebtorSelects(remove = true);
  },

  removeBillForm: function(){
    $(event.target).parents().closest('form').addClass('hidden');
  },
  
  updateBill: function(event) {
              
    event.preventDefault();

    $(event.target).parents('form').addClass('hidden');
    $('button.add-bill').removeClass('hidden');

    var billData = $('form.add-bill').serializeJSON()['bill'];
    this.model.set(billData);

    this.model.save({
      success: function(){
        alert("success!");          
      }       
    });
              
  },

  updateDebtorSelects: function(remove){

    var numDebtors = $(this.$el).find('.debtor-selects input').length
    if (remove) { numDebtors -= 1 };
    var defaultPct = accounting.toFixed((100 / (numDebtors + 1)), 2);

    $(".debtor-selects input").val(defaultPct);
                          
  },


})


