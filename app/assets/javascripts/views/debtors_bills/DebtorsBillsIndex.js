window.SplitMyBills.Views.DebtorsBillsIndex= Backbone.CompositeView.extend({

  template: JST["debtors_bills/index"],

  initialize: function(options){

    this.user = options.user;

    this.listenTo(this.collection, "add sync change", this.render);
    this.listenTo(this.collection, "add", this.addDebtorsBill);
    
    this.collection.each(this.addDebtorsBill.bind(this));
  },

  addDebtorsBill: function(debtorsBill){
    var showView = new SplitMyBills.Views.DebtorsBillShow({ model: debtorsBill, user: this.user });            
    var that = this;
    debtorsBill.fetch( { 
      success: function(){
        that.addSubview(".debtors-bills", showView);
        showView.render();
      }
    });
  },

  render: function(){
    var content = this.template({ user: this.user});
    this.$el.html(content);

    this.renderSubviews();
    return this;
  },

})




