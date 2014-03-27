window.SplitMyBills.Views.BillShow = Backbone.CompositeView.extend({

  tagName: 'tr',
  template: JST["bills/show"],

  initialize: function(options){
    this.user = options.user;
    this.listenTo(this.model, "change sync", this.render);
    this.listenTo(this.model.creditor(), "add change", this.render);
    this.listenTo(this.model.debtorsBills(), "add remove change", this.render);

    this.addEditSubview();
  },

  
  events: {
    "click .bill-link": "toggleBillShow",
    "click .delete-bill": "deleteBill",
    "click .send-reminder-email": "sendReminderEmail",
    "click a.mark-paid": "markPaid"
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

  markPaid: function(event){
    event.preventDefault();

    var id = $(event.target).attr("data-id");
    var that = this;

    $.ajax({
      url: "/api/debtors_bills/" + id,
      type: "PATCH",
      data: { "paid": "paid" },
      success: function() {
        that.model.debtorsBills().fetch();
      }
    })                    

  },

  render: function(){

    var content = this.template({ bill: this.model, user: this.user, debtors: this.model.debtors() });
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

