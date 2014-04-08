window.SplitMyBills.Collections.Friends = Backbone.Collection.extend({

  url: '/friends',
  model: SplitMyBills.Models.Friends,

  getOrFetch: function(id) {
    var model;
    var friends = this;

    if (model = friends.get(id)){
      model.fetch();
      return model;
    } else {
      model = new SplitMyBills.Models.Friend( { id: id });
      model.collection = this;
      model.fetch({
        success: function(friend) {
          friends.add(model);
        } 
      });
      return model;
    
    }

  
  }
})

