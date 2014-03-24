window.SplitMyBills.Views.BillEdit = Backbone.CompositeView.extend({

  template: JST["bills/edit"],

  initialize: function(options){
    this.user = options.user;
    this.listenTo(this.model, "sync", this.render);

    this.addBillForm();

  },

  events: {
    "click button.update-bill": "updateBill",
    "click .cancel-bill": "removeBillForm",
  },

  addBillForm: function() {
    
    var billFormView = new SplitMyBills.Views.BillForm( {
      model: this.model,
      user: this.user
    })
    this.addSubview(".edit-form", billFormView);
    billFormView.render();
               
  },


  render: function(){

    var content = this.template({ bill: this.model}); 

    this.$el.html(content);
    this.renderSubviews();
    return this;
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
})


