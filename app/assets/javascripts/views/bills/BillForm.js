window.SplitMyBills.Views.BillForm = Backbone.View.extend({

  template: JST["bills/form"],

  initialize: function(options){
    this.user = options.user
    this.listenTo(this.user.friends(), "add", this.render);
  },

  events: {
    "click button.create-bill": "createBill",
    "click a.add-debtor": "addDebtorSelect",
    "click .close": "removeDebtorSelect",
    "click .cancel-bill": "removeBillForm"
  },

  addDebtorSelectView: function(){
    var newBill = new SplitMyBills.Models.Bill();
    var newBillView = new SplitMyBills.Views.BillForm( { model: newBill, user: this.model } );
    this.addSubview(".new", newBillView);
    newBillView.render();
                 
  },

  addDebtorSelect: function(event){
    event.preventDefault();

    var newSelect = JST["debtor_select"]( { friends: this.user.friends() });
    $(".debtor-selects").append(newSelect);

    var numDebtors = $(event.target).parent().find('.debtor-selects select').length;
    var defaultPct = (100 / (numDebtors + 1));

    $(".debtor-selects input").val(defaultPct);
  },

  createBill: function(event) {
    event.preventDefault();
    var that = this;

    $(event.target).parents('form').addClass('hidden');
    $('button.add-bill').removeClass('hidden');
    var billData = $('form.add-bill').serializeJSON()['bill'];
    SplitMyBills.bills.create(billData);
    SplitMyBills.bills.fetch();
  },

  render: function(){

    var user = this.user;
    var friends = user.friends();

    var content = this.template({ friends: friends, bill: this.model}); //current users friends

    this.$el.html(content);
    return this;
  },

  removeDebtorSelect: function() {
    var numDebtors = $(event.target).parent().find('.debtor-selects select').length;
    var defaultPct = (100 / (numDebtors + 1));

    $(".debtor-selects input").val(defaultPct);

                         
  },
  removeBillForm: function(){
    $(event.target).parents().closest('form').addClass('hidden');
  },


})


