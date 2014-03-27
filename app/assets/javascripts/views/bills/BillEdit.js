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
    $(event.target).parents().closest('form').addClass('hidden');
  },
  
  updateBill: function(event) {

    event.preventDefault();
    
    var billData = $(this.$el).find('form').serializeJSON()['bill'];
    this.model.set(billData);
    var that = this;
    this.model.save({},{
      success: function(){
        that.model.fetch();
        $(event.target).parents('form').addClass('hidden');
        $('button.add-bill').removeClass('hidden');
      },
      error: function(model, response){
        response.responseJSON.forEach(function(error) {
          if (error === "Name can't be blank") { error = "Bill must have a name" };
          if (error === "Debtors can't be blank") { error = "Please select at least one payee" };
          label = JST["error"]( { message: error });
          $('.errors-show').append(label);
        })
      }, wait: true
    });
              
  },

  showEditForm: function(event){
    event.preventDefault();                     
    $(this.$el).find('.errors-show').empty();
    $(this.$el).find('.bill-form').removeClass('hidden');
    $(this.$el).find('.bill-show').addClass('hidden');
  },

})


