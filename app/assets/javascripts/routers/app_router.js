window.SplitMyBills.Routers.AppRouter = Backbone.Router.extend({

  initialize: function(options){
              
    this.$rootEl = options.$rootEl
              
  },

  routes: {
    "": "userShow"
  
  },

  index: function() {
    var indexView = new SplitMyBills.Views.indexView ({ collection: this.bills });

    this._swapView(indexView);
  },

  userShow: function(){
   
    var user = SplitMyBills.users.getOrFetch(currentUserID)
    
    var userShow = new SplitMyBills.Views.UserShow({
      model: user,
      collection: this.bills
    });

    this._swapView(userShow);
    
  },

  
  _swapView: function(view){
    this.current_view && this.current_view.remove();
    this.current_view = view;

    this.$rootEl.html(this.current_view.render().$el);
  }
})

