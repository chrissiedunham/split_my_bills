window.SplitMyBills.Collections.Users = Backbone.Collection.extend({

  url: '/users',
  model: SplitMyBills.Models.User,

  getOrFetch: function(id) {
    var model;
    var users = this;

    if ( model = users.get(id)){
      model.fetch();
      return model;
    } else {
      model = new SplitMyBills.Models.User( { id: id });
      model.collection = this;
      model.fetch({
        success: function(user) {
          users.add(model);
        } 
      });
      return model;
    
    }

  
  }
})

