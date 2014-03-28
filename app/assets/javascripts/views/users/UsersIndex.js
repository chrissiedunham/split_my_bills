window.SplitMyBills.Views.UsersIndex = Backbone.CompositeView.extend({

  template: JST["users/index"],

  initialize: function(){
    this.listenTo(this.collection, "add", this.render);
    this.listenTo(this.collection, "remove", this.render);

    this.addFriendInviteSubview();
  },

  addFriendInviteSubview: function(){
                       
    var friendInviteView = new SplitMyBills.Views.FriendInvite( );
    this.addSubview(".friend-invite", friendInviteView);
    friendInviteView.render();
  },

  render: function(){
    var content = this.template({ friends: this.collection });
    this.$el.html(content);

    this.renderSubviews();
    return this;
  
  }


})
