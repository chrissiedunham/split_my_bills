window.SplitMyBills.Views.UserShow = Backbone.CompositeView.extend({

  template: JST["users/show"],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);

    this.addNewBillView();
    this.addBillsIndexView();
  },
  events: {
          
    "click button.add-bill": "showNewBillForm",
    "click button.cancel-bill": "hideNewBillForm" 

  },

  addNewBillView: function(){
    var newBill = new SplitMyBills.Models.Bill();
    var newBillView = new SplitMyBills.Views.BillForm( { 
      model: newBill, 
      user: this.model 
    });
    this.addSubview(".new", newBillView);
    newBillView.render();
  },

  addBillsIndexView: function() {
    var billsIndexView = new SplitMyBills.Views.BillsIndex( { 
      collection: this.model.bills(), 
      user: this.model
    });
    this.addSubview(".bills-index", billsIndexView);
    billsIndexView.render();
  },
  
  hideNewBillForm: function(event){
    event.preventDefault();
    $('form.add-bill').addClass('hidden');
    $('button.add-bill').removeClass('hidden');
  },

  render: function(){
    var showAddBillButton = (currentUserID == this.model.get('id'))
    var content = this.template({ user: this.model, showAddBillButton: showAddBillButton });
    this.$el.html(content);

    this.renderSubviews();
    return this;
  },

  showNewBillForm: function(event){
    event.preventDefault();
    $('form.add-bill').removeClass('hidden');
    $('button.add-bill').addClass('hidden');
    $('form.add-bill input').val("");
  },

})


