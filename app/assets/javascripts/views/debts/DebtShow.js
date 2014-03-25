window.SplitMyBills.Views.BillDebt = Backbone.CompositeView.extend({

  tagName: 'tr',
  template: JST["bills/debt"],

  initialize: function(options){
  },
  
  events: {
    "click .debt-link": "toggleDebtShow",
  },


  deleteBill: function(event){
    this.model.destroy();
  },
  render: function(){

    var content = this.template({ bill: this.model, debtors: this.model.debtors() });
    this.$el.html(content);
    this.renderSubviews();

    return this;
  },

  toggleDebtShow: function(event){
    event.preventDefault();                     
    $(this.$el).find('.debt-show').toggleClass("hidden");
  },
//
//   sendReminderEmail: function(event){
//     event.preventDefault();
//     $.ajax({
//       url: "/reminder_emails",
//       type: "POST",
//       data: { "bill_id": this.model.get('id') },
//       success: function() {
//         alert("You sent an email!") 
//       }
//     })                    
  
  
  

})


