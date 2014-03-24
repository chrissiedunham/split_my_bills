window.SplitMyBills.Models.User = Backbone.Model.extend({

  urlRoot: '/users',

  
  credit_bills: function(){
    if(!this._credit_bills){
    
      this._credit_bills = new SplitMyBills.Collections.Bills([], {
        user: this 
      });
    }
    return this._credit_bills;
  },
  debit_bills: function(){
    if(!this._debit_bills){
    
      this._debit_bills = new SplitMyBills.Collections.Bills([], {
        user: this 
      });
    }
    return this._debit_bills;
  },

  bills: function() {
    return this.credit_bills();           
    
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
    this.credit_bills().set(data.credit_bills);
    this.debit_bills().set(data.debit_bills);
    this.friends().set(data.friends);
    return data;
         
  }


})


