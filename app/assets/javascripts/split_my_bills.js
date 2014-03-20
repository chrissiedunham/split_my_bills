window.SplitMyBills = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    SplitMyBills.bills = new SplitMyBills.Collections.Bills([]);
    SplitMyBills.bills.fetch({
    
      success: function(bills){
        new SplitMyBills.Routers.AppRouter({
        
          $rootEl: $('#content'),
          bills: SplitMyBills.bills
        })
        Backbone.history.start();
      }
    })
  }
};

$(document).ready(function(){
  SplitMyBills.initialize();
});
