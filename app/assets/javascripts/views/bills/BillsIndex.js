window.SplitMyBills.Views.BillsIndex = Backbone.View.extend({

  template: JST["bills/index"],

  initialize: function(){
    this.listenTo(this.collection, "add sync remove", this.render);
  },

  events: {
    "click button.add-bill": "showAddBillButton",
    "click button.create-bill": "createBill"
  },

  render: function(){
    var content = this.template({ bills: this.collection });
    this.$el.html(content);
    return this;
  },

  addBill: function(bill){
    var billShowView = new SplitMyBills.View.BillShow({ model: bill });            
    this.addSubview(".bills", billShowView);
    billShowView.render();
  },

  showAddBillButton: function(event){
    event.preventDefault();

    $(".add-bill").toggleClass("hidden");
  },
  createBill: function(event) {
    event.preventDefault();
    var that = this;

    $(".add-bill").toggleClass("hidden");
    var billData = $('form.add-bill').serializeJSON()['bill'];
    var newBill = new SplitMyBills.Models.Bill( billData );
    newBill.save({}, {
      success: function(bill) {
        SplitMyBills.bills.add(bill);
      } 
    
    })
  }

  

})
