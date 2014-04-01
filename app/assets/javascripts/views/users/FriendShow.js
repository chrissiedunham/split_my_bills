window.SplitMyBills.Views.FriendShow = Backbone.CompositeView.extend({

  template: JST["users/friend_show"],

  initialize: function(options){

    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.dbsOwedToCurrentUser(), "add change remove", this.render);
    this.listenTo(this.model.dbsOwedByCurrentUser(), "add change remove", this.render);
    this.addDebtorsBillsIndexView(); 
   },

  events: {

    "click .mark-paid": "markPaidUnpaid",
    "click .mark-unpaid": "markPaidUnpaid",

  },


  addDebtorsBillsIndexView: function() {
    var indexView = new SplitMyBills.Views.DebtorsBillsIndex( { 
      user: this.model,
      collection: this.model.dbsWithCurrentUser() 
    });
    this.addSubview(".debtors-bills-index", indexView);
    indexView.render();
  },
  markPaidUnpaid: function(event){
    event.preventDefault();

    var changeStatusTo = $(event.target).hasClass("mark-paid") ? true : false;
    var that = this;
    var id = $(event.target).attr("data-id");

    $.ajax({
      url: "/api/debtors_bills/" + id,
      type: "PATCH",
      data: { "paid": changeStatusTo},
      success: function() {
        that.model.fetch();
      }
    })                    

  },

  render: function(){
    var content = this.template({ 
      user: this.model, 
    });
    this.$el.html(content);

    this.renderSubviews();
    return this;
  },
})




