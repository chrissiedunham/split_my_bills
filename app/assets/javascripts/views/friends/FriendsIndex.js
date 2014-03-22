window.SplitMyBills.Views.FriendsIndex = Backbone.CompositeView.extend({

  template: JST["friends/index"],

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  
  }


})
