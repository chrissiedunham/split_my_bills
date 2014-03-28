window.SplitMyBills.Views.BillEdit = Backbone.CompositeView.extend({

  template: JST["bills/edit"],

  initialize: function(options){
    this.user = options.user;
    this.listenTo(this.model, "sync", this.render);


    this.addBillForm();
  },

  events: {
    "click button.update-bill": "updateBill",
    "click .cancel-bill-edit": "hideEditBillForm",
    "click .bill-edit-btn": "showEditForm",
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
    var content = this.template({ bill: this.model, user: this.user }); 

    this.$el.html(content);
    this.renderSubviews();
    
    return this;
  },

  hideEditBillForm: function(event){
    event.preventDefault();
    $('.bill-details[data-id='+ this.model.id + ']').removeClass('hidden');
    $('.bill-edit-btn[data-id='+ this.model.id + ']').removeClass('hidden');
    $('form.edit-bill[data-id='+ this.model.id + ']').addClass('hidden');
    $('.errors-show[data-id=' + this.model.id + ']').empty();
  },
  
  updateBill: function(event) {

    event.preventDefault();

    
    var billData = $(this.$el).find('form').serializeJSON()['bill'];
    var that = this;

    this.model.save(billData, {
      patch: true,
      success: function(){
        that.model.fetch();
        that.user.fetch();
        that.showEditForm();
      },
      error: function(model, response){
        that.showEditForm();
        $('.errors-show[data-id=' + that.model.id + ']').empty();
        response.responseJSON.forEach(function(error) {
          if (error === "Name can't be blank") { error = "Bill must have a name" };
          if (error === "Debtors can't be blank") { error = "Please select at least one payee" };
          label = JST["error"]( { message: error });
          $('.errors-show[data-id=' + that.model.id + ']').append(label);
        })
      }, wait: true
    });
              
  },

  showEditForm: function(event){
    if (event) {
    
      event.preventDefault();                     
    }
    $('.bill-details[data-id='+ this.model.id + ']').addClass('hidden');
    $('.bill-edit-btn[data-id='+ this.model.id + ']').addClass('hidden');
    $('form.edit-bill[data-id='+ this.model.id + ']').removeClass('hidden');
  },

})


