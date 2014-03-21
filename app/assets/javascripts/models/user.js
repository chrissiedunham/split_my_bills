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
 
  parse: function(data){
    var bills = data.bills;
    this.bills().set(bills);

    return data;
         
  }


})


