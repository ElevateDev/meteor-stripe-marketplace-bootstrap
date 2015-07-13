Template.marketplaceCreditCardsSelect.created = function(){
  Market._fetchCustomer();
};

Template.marketplaceCreditCardsSelect.helpers({
  customer: function(){
    return Market.customer();
  },
  customerReady: function(){
    return Market.customerReady();
  },
  addCardSchema: function(){
    return Market.creditCardSchema;
  }
});

AutoForm.hooks({
  'market_addCard': {
    onSubmit: function(card){
      this.event.preventDefault();
      exp = card.expiry.split('/');
      card.exp_month = parseInt(exp[0]);
      card.exp_year = parseInt(exp[1]);
      delete card.expiry;
      Market._stripe.token.create({
        card: card
      },function(err,doc){
        Meteor.call('marketplace/customer/createSource',doc.id,function(err,doc){
          Market._fetchCustomer();      
        });
      });
    }
  }
});
