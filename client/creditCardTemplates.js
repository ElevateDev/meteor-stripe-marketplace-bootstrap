// variable's for
//  adding card
//  selected card
//


var addingCard = new ReactiveVar();
var selectedCard = new ReactiveVar();
var selectedInitialized;
var error = new ReactiveVar();

Template.marketplaceCreditCardsSelect.created = function(){
  addingCard.set( false );
  error.set();
  Market._fetchCustomer(function(){
    var customer = Market.customer();
    selectedCard.set( customer.default_source );
  });
};

Template.marketplaceCreditCardsSelect.onRendered(function(){
  var errFunc = function(){
    if( !selectedCard.get() ){
      error.set("Please select a credit card for payment");
      return true;
    }else{
      error.set();
    }
  }
  this.data.register( errFunc );
});

Template.marketplaceCreditCardsSelect.helpers({
  customer: function(){
    return Market.customer();
  },
  customerReady: function(){
    return Market.customerReady();
  },
  addCardSchema: function(){
    return Market.schemas.creditCard;
  },
  addingCard: function(){
    return addingCard.get();
  },
  selected: function( id ){
    return selectedCard.get() === id ? "active" : "";
  },
  error: function(){
    return error.get();
  },
  formatted_exp_month: function(){
    return this.exp_month > 9 ? this.exp_month.toString() : "0" + this.exp_month.toString();
  }
});

Template.marketplaceCreditCardsSelect.events({
  'click *[name="add-card"]': function(){
    addingCard.set( true );
  },
  'click *[name="select-card"]': function(e){
    selectedCard.set( e.currentTarget.id );
    error.set();
  },
  'click *[name="continue-checkout"]': function(e,template){
    if( Market.customer() &&
        Market.customer().sources &&
        Market.customer().sources.data &&
        Market.customer().sources.data.length === 0 ){
      error.set( "Please add a payment source" );
    }else if( !selectedCard.get() ){
      error.set( "Please select a card" );
    }else{
      template.data.callback({source: selectedCard.get()});
    }
  }
});

AutoForm.hooks({
  'add-card-form': {
    onSubmit: function(card){
      this.event.preventDefault();
      exp = card.expiry.split('/');
      card.exp_month = parseInt(exp[0]);
      card.exp_year = parseInt(exp[1]);
      delete card.expiry;
      Market._stripe.token.create({
        card: card
      },function(err,doc){
        Meteor.call('market/customer/createSource',doc.id,function(err,doc){
          Market._fetchCustomer(function(){
            if( !err ){
              addingCard.set( false );
              Market.customer().sources.data.push( doc );
              selectedCard.set(doc.id);
              error.set();
            }else{
              console.log( err )
              error.set(err.reason)
            }
          });
        });
      });
    }
  }
});
