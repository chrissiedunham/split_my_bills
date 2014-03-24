window.SplitMyBills.Views.BillNew = Backbone.CompositeView.extend({

  template: JST["bills/new"],

  initialize: function(options){
    this.user = options.user;
    this.listenTo(this.model, "sync", this.render);
    
    this.addBillForm();
    
  },

  events: {
    "click button.create-bill": "createBill",
    "click .cancel-bill-new": "removeNewBillForm",
  },
  
  addBillForm: function() {
    
    var billFormView = new SplitMyBills.Views.BillForm( {
      model: this.model,
      user: this.user
    })
    this.addSubview(".new-form", billFormView);
    billFormView.render();
               
  },

  createBill: function(event) {
    event.preventDefault();

    $(event.target).parents('form').addClass('hidden');
    $('button.add-bill').removeClass('hidden');

    var billData = $('form.add-bill').serializeJSON()['bill'];
    this.user.credit_bills().create(billData);
    window.coll1 = this.user.credit_bills();

  },

  render: function(){

    var content = this.template({ bill: this.model}); 

    this.$el.html(content);
    this.renderSubviews();
    return this;
  },

  removeNewBillForm: function(){
    $(event.target).parents().closest('form').addClass('hidden');
    $('button.add-bill').removeClass('hidden');
  },

})


