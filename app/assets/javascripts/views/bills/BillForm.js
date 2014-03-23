window.SplitMyBills.Views.BillForm = Backbone.CompositeView.extend({

  template: JST["bills/form"],

  initialize: function(options){
    //this.user = options.user
    this.listenTo(this.model, "sync", this.render);
//    this.listenTo(this.user.friends(), "add", this.render);
  },

  events: {
    "click button.create-bill": "createBill",
    "click a.add-debtor": "addDebtorSelectSubview",
    "click .close": "removeDebtorSelect",
    "click .cancel-bill": "removeBillForm"
  },

  addDebtorSelectSubview: function(event){
    event.preventDefault();

    var debtorSelectView = new SplitMyBills.Views.DebtorSelect({ 
      collection: SplitMyBills.users
    });

    this.addSubview(".debtor-selects", debtorSelectView);
    debtorSelectView.render();

    var numDebtors = $(event.target).parent().find('.debtor-selects select').length;
    var defaultPct = accounting.toFixed((100 / (numDebtors + 1)), 2);

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

    //var user = this.user;
    //var friends = user.friends();

    //var content = this.template({ friends: friends, bill: this.model}); //current users friends
    var content = this.template({ bill: this.model}); //current users friends

    this.$el.html(content);
    this.renderSubviews();
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


