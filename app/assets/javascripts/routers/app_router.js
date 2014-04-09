window.SplitMyBills.Routers.AppRouter = Backbone.Router.extend({

  initialize: function(options){
              
    this.$rootEl = options.$rootEl,
    this.users = options.users,
    this.bills = options.bills
              
  },

  routes: {
    "": "home",
    "bills": "currentUserShow",
    "friends" : "friendsIndex",
    "friends/:id" : "friendShow",
    "bills/:id" : "billShow"
  
  },

  home: function(){
    var user = this.users.getOrFetch(currentUserID);
    var bills = user.bills();
    var that = this;
    bills.fetch({
      success: function(){
        var userShow = new SplitMyBills.Views.Home({
          model: user
        });

        that._swapView(userShow);
      } 
    });

  },

  currentUserShow: function(){
   
    var user = this.users.getOrFetch(currentUserID);

    var userShow = new SplitMyBills.Views.UserShow({
      model: user
    });

    this._swapView(userShow);
    
  },

  friendsIndex: function(){
    var user = SplitMyBills.users.getOrFetch(currentUserID);
    var friendsIndex = new SplitMyBills.Views.UsersIndex({
      collection: user.friends()
    });

    SplitMyBills.users.fetch();
    this._swapView(friendsIndex);
  },

  friendShow: function(id){
   
    var friend = new SplitMyBills.Models.Friend( { id: id} );
    var that = this;

    friend.fetch({
      success: function(){
        var friendShow = new SplitMyBills.Views.FriendShow({
          model: friend,
        });
                   
        that._swapView(friendShow);
      } 
    });

    
  },

  billShow: function(id){

    var user = new SplitMyBills.Models.User( { id: currentUserID} );
    var that = this;

    user.fetch({
      success: function(){
        var bill = new SplitMyBills.Models.Bill( { id: id });
        var billShow = new SplitMyBills.Views.BillShow({
          model: bill,
          user: user
        });

        that._swapView(billShow);
      } 
    });

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

