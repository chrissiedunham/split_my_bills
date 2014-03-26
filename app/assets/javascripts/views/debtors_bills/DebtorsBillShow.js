window.SplitMyBills.Views.DebtorsBillShow = Backbone.CompositeView.extend({

  tagName: 'tr',
  template: JST["debtors_bills/show"],

  initialize: function(options){
  },
  
  events: {
    //"click .debt-link": "toggleDebtShow",
  },


  // deleteBill: function(event){
  //   this.model.destroy();
  // },
  render: function(){

    var content = this.template({ debtorsBill: this.model });
    this.$el.html(content);

    debugger
    return this;
  },

//   toggleDebtShow: function(event){
//     event.preventDefault();                     
//     $(this.$el).find('.debt-show').toggleClass("hidden");
//   },
// //
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


