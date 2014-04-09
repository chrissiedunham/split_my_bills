window.SplitMyBills.Views.FriendInvite = Backbone.View.extend({

  template: JST["users/friend_invite"],

  render: function(){
  
    var content = this.template();
    this.$el.html(content);
    return this;
  
  },
  events: {

    "click .send-friend-invite": "sendInviteEmail"
  },

  sendInviteEmail: function(event){

    var data = this.$el.find('form').serializeJSON()["email"];

    data["id"] = currentUserID;
    

    $.ajax({
      url: "/invite_emails",
      type: "POST",
      data: data,
      success: function() {

        $('.modal').modal('hide');

      }
    })                    
  }


})
