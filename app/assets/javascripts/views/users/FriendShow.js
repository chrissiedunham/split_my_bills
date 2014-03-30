window.SplitMyBills.Views.FriendShow = Backbone.CompositeView.extend({

  template: JST["users/friend_show"],

  initialize: function(options){

    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.debtorsBills(), "add change remove", this.render);
   },

  render: function(){
    var content = this.template({ 
      user: this.model, 
      debtorsBills: this.model.debtorsBills() 
    });
    this.$el.html(content);

    return this;
  },
})




