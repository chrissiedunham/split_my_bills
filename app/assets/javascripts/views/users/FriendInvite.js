window.SplitMyBills.Views.FriendInvite = Backbone.View.extend({

  template: JST["users/friend_invite"],

  render: function(){
  
    var content = this.template();
    this.$el.html(content);
    return this;
  
  },
  events: {},
  

})
