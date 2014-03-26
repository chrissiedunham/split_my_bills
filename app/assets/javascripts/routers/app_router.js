window.SplitMyBills.Routers.AppRouter = Backbone.Router.extend({

  initialize: function(options){
              
    this.$rootEl = options.$rootEl,
    this.users = options.users,
    this.bills = options.bills
              
  },

  routes: {
    "": "currentUserShow",
    "friends" : "friendsIndex",
    "friends/:id" : "friendShow"
  
  },

  currentUserShow: function(){
   
    var user = this.users.getOrFetch(currentUserID);

    var userShow = new SplitMyBills.Views.UserShow({
      model: user
    });

    this._swapView(userShow);
    this._addSelects();
    
  },

  friendsIndex: function(){
    var user = SplitMyBills.users.getOrFetch(currentUserID);
    var friendsIndex = new SplitMyBills.Views.UsersIndex({
      collection: SplitMyBills.users
    });

    SplitMyBills.users.fetch();
    this._swapView(friendsIndex);
  },

  friendShow: function(id){
   
    var user = SplitMyBills.users.getOrFetch(id);
    
    var friendShow = new SplitMyBills.Views.FriendShow({
      model: user,
    });
    user.fetch();

    this._swapView(friendShow);
    
  },

  _addSelects: function() {
    $('.chosen-select').chosen({
      allow_single_deselect: true,
      no_results_text: 'No results matched',
      width: '100%',
      disable_search_threshold: 3
    });
  },
  
  _swapView: function(view){
    this.current_view && this.current_view.remove();
    this.current_view = view;

    this.$rootEl.html(this.current_view.render().$el);
  }
})

