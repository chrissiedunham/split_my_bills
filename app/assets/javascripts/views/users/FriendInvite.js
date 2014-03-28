window.SplitMyBills.Views.FriendInvite = Backbone.View.extend({

  template: JST["users/friend_invite"],

  render: function(){
  
    var content = this.template();
    this.$el.html(content);
    return this;
  
  },
  events: {
    "click .friend-invite": "sendInviteEmail"
  },

  sendInviteEmail: function(event){
    event.preventDefault();
    

    $.ajax({
      url: "/reminder_emails",
      type: "POST",
      success: function() {
        alert("You sent an email!") 
      }
    })                    
  }


})
