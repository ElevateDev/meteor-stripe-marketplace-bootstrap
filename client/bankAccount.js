var addingBank = new ReactiveVar();
var selectedBankAccount = new ReactiveVar();

Template.marketplaceBankAccountSelect.created = function(){
  Market._fetchAccount();
  addingBank.set( false );
};

Template.marketplaceBankAccountSelect.helpers({
  account: function(){
    return Market.account();
  },
  addingBank: function(){
    return addingBank.get();
  },
  addBankAccountSchema: function(){
    return Market.schemas.bankAccount;
  },
  selected: function( id ){
    return selectedBankAccount.get() === id;
  }
});

Template.marketplaceBankAccountSelect.events({
  'click *[name="add-bank-account"]': function(){
    addingBank.set( true );
  },
  'click *[name="set-default"]': function(){
    Market.setDefaultExternalAccount( this.id );
  },
  'click *[name="remove-bank-account"]': function(){
    Market.deleteExternalAccount( this.id );
  }
});

AutoForm.hooks({
  'add-bank-account': {
    onSubmit: function(bankAccount){
      this.event.preventDefault();
      console.log( bankAccount );
      Market._stripe.token.create({
        bank_account: bankAccount
      },function(err,doc){
        Market.registerExternalAccount( doc );
        addingBank.set( false );
      });
    }
  }
});
