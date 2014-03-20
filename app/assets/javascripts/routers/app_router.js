window.SplitMyBills.Routers.AppRouter = Backbone.Router.extend({

  initialize: function(options){
              
    this.$rootEl = options.$rootEl,
    this.bills = SplitMyBills.bills
              
  },

  routes: {
    "": "index",
  
  },

  index: function() {
    var indexView = new SplitMyBills.Views.BillsIndex({ collection: this.bills });

    this._swapView(indexView);
  },

  
  _swapView: function(view){
    this.current_view && this.current_view.remove();
    this.current_view = view;

    this.$rootEl.html(this.current_view.render().$el);
  }
})

