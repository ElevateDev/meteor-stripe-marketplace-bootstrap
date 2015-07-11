Market.configure({
  checkout: {
    charges: function(id){
      var users = Meteor.users.find().fetch();
      return [{userId: users[0]._id, destinationId: users[1]._id, total: 5000, applicationFee: 500}];
    },
    onError: function( err ){
      console.log( err );
    }
  }
});
