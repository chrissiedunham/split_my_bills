window.SplitMyBills.Views.BillShow = Backbone.CompositeView.extend({

  tagName: 'tr',
  template: JST["bills/show"],

  initialize: function(options){
    this.user = options.user;
    this.listenTo(this.model, "sync", this.render);

    this.listenTo(this.model.debtors(), "add sync", this.render);
    this.listenTo(this.model.creditor(), "add sync", this.render);

    this.addEditSubview();
  },

  
  events: {
    "click .bill-link": "toggleBillShow",
    "click .delete-bill": "deleteBill",
    "click .bill-edit-btn": "showEditForm",
    "click .send-reminder-email": "sendReminderEmail",
  },

  addEditSubview: function(){
    var editView = new SplitMyBills.Views.BillEdit({ 
      model: this.model,
      user: this.user
    });
    this.addSubview(".bill-edit", editView);
    editView.render();
  },

  deleteBill: function(event){
    this.model.destroy();
  },

  showEditForm: function(event){
    event.preventDefault();                     
    $(this.$el).find('.bill-form').removeClass('hidden');
    $(this.$el).find('.bill-show').addClass('hidden');
    
  },

  render: function(){

    var content = this.template({ bill: this.model, debtors: this.model.debtors() });
    this.$el.html(content);
    this.renderSubviews();

    return this;
  },

  toggleBillShow: function(event){
    event.preventDefault();                     
    $(this.$el).find('.bill-show').toggleClass("hidden");
  },

  sendReminderEmail: function(event){
    event.preventDefault();
    $.ajax({
      url: "/reminder_emails",
      type: "POST",
      data: { "bill_id": this.model.get('id') },
      success: function() {
        alert("You sent an email!") 
      }
    })                    
  }
  
  
  

})

