window.SplitMyBills.Routers.AppRouter = Backbone.Router.extend({

  initialize: function(options){
              
    this.$rootEl = options.$rootEl
              
  },

  routes: {
    "": "index",
    "/debts": "debts"
  
  },

  index: function(){
   
    var user = SplitMyBills.users.getOrFetch(currentUserID)
    
    var userShow = new SplitMyBills.Views.UserShow({
      model: user,
      collection: SplitMyBills.bills
    });
    SplitMyBills.bills.fetch();

    this._swapView(userShow);
    
  },

  friends: function(){
   
    var user = SplitMyBills.users.getOrFetch(currentUserID)
    
    var userDebts = new SplitMyBills.Views.UserShow({
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

