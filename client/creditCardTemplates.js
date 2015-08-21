var addingCard = new ReactiveVar();
var selectedCard = new ReactiveVar();
var selectedInitialized;
var error = new ReactiveVar();

Template.marketplaceCreditCardsSelect.created = function(){
  Market._fetchCustomer();
  addingCard.set( false );
  selectedInitialized = false;
  error.set();
};

Template.marketplaceCreditCardsSelect.rendered = function(){
  this.autorun(function(){
    var customer = Market.customer();
    if( !selectedInitialized && Market.customer() ){
      selectedInitialized = true;
      selectedCard.set( customer.default_source );
    }
  });
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
  'click .card-line-item': function(e){
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
          addingCard.set( false );
          if( !err ){ 
            Market.customer().sources.data.push( doc );
            selectedCard.set(doc.id);
            error.set();
          }
        });
      });
    }
  }
});
