Template.marketplacePurchaseHistory.onCreated(function() {
  this.subscribe('market/purchaseHistory');
  this.subscribe('templates');
});

Template.marketplacePurchaseHistory.helpers({
  purchases: function() {
    return Market.PurchaseHistory.find(
      {'userId': Meteor.userId()},
      {sort: {'createdAt': -1}}
    );
  },
  formatDate: function(date) {
    if (date) {
      return moment(date).format('MMM Do YYYY, h:mm:ss a');
    }
  },
});

UI.registerHelper('formatMoney',function(amount) {
  return accounting.formatMoney(amount / 100.0);
});

UI.registerHelper('purchased',function( type, id ){
  return !!Market.PurchaseHistory.purchased( Meteor.userId(), type, id );
});
