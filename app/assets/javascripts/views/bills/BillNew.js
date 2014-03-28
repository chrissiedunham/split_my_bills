window.SplitMyBills.Views.BillNew = Backbone.CompositeView.extend({

  template: JST["bills/new"],

  initialize: function(options){
    this.user = options.user;
    this.listenTo(this.model, "sync", this.render);
    
    this.addBillForm();
  },

  events: {
    "click button.create-bill": "createBill",
    "click button.add-bill": "showNewBillForm",
    "click button.cancel-bill-new": "hideNewBillForm" 
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
    var that = this;
    this.user.creditBills().create(billData, {
      success: function(){
      that.user.fetch();
      },
      error: function(model, response){
        that.showNewBillForm();

        response.responseJSON.forEach(function(error) {
          if (error === "Name can't be blank") { error = "Bill must have a name" };
          label = JST["error"]( { message: error });
          $('.add-bill .errors-show').append(label);
        })
      }, wait: true


    });
//    window.coll1 = this.user.credit_bills();

  },

  render: function(){

    var content = this.template({ bill: this.model}); 

    this.$el.html(content);
    this.renderSubviews();
    return this;
  },
  
  hideNewBillForm: function(event){
    event.preventDefault();
    $('form.add-bill').addClass('hidden');
    $('button.add-bill').removeClass('hidden');
  },
  
  showNewBillForm: function(event){
    if (event) { 
       event.preventDefault();
    }
    $(this.$el).find('.errors-show').empty();
    $('form.add-bill').removeClass('hidden');
    $('button.add-bill').addClass('hidden');
    $('form.add-bill input').val("");
  }

})


