if( Meteor.users.find().count() === 0 && Meteor.isServer ){
  // Create 2 accounts and call login hooks to init their accounts

  var userId = Accounts.createUser({'email': 'test@test.com', "password": "changeme"});
  _.each( Market._onLogin, function(f){
    f( userId );
  });

  var userId = Accounts.createUser({'email': 'test2@test.com', "password": "changeme"});
  _.each( Market._onLogin, function(f){
    f( userId );
  });
}
