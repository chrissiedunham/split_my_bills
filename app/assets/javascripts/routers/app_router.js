window.SplitMyBills.Routers.AppRouter = Backbone.Router.extend({

  initialize: function(options){
              
    this.$rootEl = options.$rootEl
              
  },

  routes: {
    "": "billsIndex",
    "friends" : "friendsIndex",
    "friends/:id/" : "friendShow"
  
  },

  billsIndex: function(){
   
    var user = SplitMyBills.users.getOrFetch(currentUserID);
    
    var userShow = new SplitMyBills.Views.UserShow({
      model: user,
      collection: SplitMyBills.bills
    });
    SplitMyBills.bills.fetch();

    this._swapView(userShow);
    
  },

  friendShow: function(id){
   
    var user = SplitMyBills.users.getOrFetch(id);
    
    var friendsView = new SplitMyBills.Views.FriendsIndex({
      model: user,
      collection: SplitMyBills.bills
    });
    SplitMyBills.bills.fetch();

    this._swapView(userShow);
    
  },


  
  _swapView: function(view){
    this.current_view && this.current_view.remove();
    this.current_view = view;

    this.$rootEl.html(this.current_view.render().$el);
  }
})

