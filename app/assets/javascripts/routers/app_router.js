window.SplitMyBills.Routers.AppRouter = Backbone.Router.extend({

  initialize: function(options){
              
    this.$rootEl = options.$rootEl
              
  },

  routes: {
    "": "billsIndex",
    "friends" : "friendsIndex",
    "friends/:id" : "friendShow"
  
  },

  billsIndex: function(){
   
    var user = SplitMyBills.users.getOrFetch(currentUserID);

    var userShow = new SplitMyBills.Views.UserShow({
      model: user,
      collection: user.bills()
    });
    user.bills().fetch();

    this._swapView(userShow);
    
  },

  friendsIndex: function(){

    var user = SplitMyBills.users.getOrFetch(currentUserID);
    var friendsIndex = new SplitMyBills.Views.UsersIndex({
      collection: user.friends()
    });
    user.friends().fetch();

    this._swapView(friendsIndex);
  },

  friendShow: function(id){
   
    var user = SplitMyBills.users.getOrFetch(id);
    
    var friendShow = new SplitMyBills.Views.UserShow({
      model: user,
      collection: user.bills()
    });
    user.bills().fetch();

    this._swapView(friendShow);
    
  },


  
  _swapView: function(view){
    this.current_view && this.current_view.remove();
    this.current_view = view;

    this.$rootEl.html(this.current_view.render().$el);
  }
})

