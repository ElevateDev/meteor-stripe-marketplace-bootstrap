var fields = _.extend( {}, Market.userInfo.fields );
fields.country.autoform = {readonly: true};
var userInfoSchema = new SimpleSchema( fields );

Template.marketplaceUserInfo.onCreated(function(){
  this.subscribe('marketplace/userInfo')
})

Template.marketplaceUserInfo.helpers({
  editDoc(){
    return Market.userInfo.findOne({userId: Meteor.userId()})
  },
  action(){
    return Market.userInfo.findOne({userId: Meteor.userId()}) ?
      "update" :
      "insert"
  },
  submitLabel(){
    return Market.userInfo.findOne({userId: Meteor.userId()}) ?
      "Update" :
      "Insert"
  },
  schema(){
    return userInfoSchema;
  },
  collection(){
    return Market.userInfo;
  }
});


AutoForm.addHooks('user-info',{
  onSuccess: () => {
    Meteor.call('market/accounts/acceptTOS')
  }
})
