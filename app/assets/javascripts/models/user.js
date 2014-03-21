window.SplitMyBills.Models.User = Backbone.Model.extend({

  urlRoot: '/users',

  
  bills: function(){
    if(!this._bills){
    
      this._bills = new SplitMyBills.Collections.Bills([], {
        user: this 
      });
    }
    return this._bills;
  },

  friends: function(){
    if(!this._friends){
    
      this._friends = new SplitMyBills.Collections.Users([], {
        user: this
      });
    }          
    return this._friends;
  },

 
  parse: function(data){
    var bills = data.bills;
    var friends = data.friends;
    //TODO add ifs
    
    this.bills().set(bills);
    this.friends().set(friends);
    return data;
         
  }


})


