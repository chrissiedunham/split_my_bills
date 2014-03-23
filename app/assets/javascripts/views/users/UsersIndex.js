window.SplitMyBills.Views.UsersIndex = Backbone.CompositeView.extend({

  template: JST["users/index"],

  initialize: function(){
    this.listenTo(this.collection, "add", this.render);
    this.listenTo(this.collection, "remove", this.render);
  },


  render: function(){
    var content = this.template({ friends: this.collection });
    this.$el.html(content);
    return this;
  
  }


})
