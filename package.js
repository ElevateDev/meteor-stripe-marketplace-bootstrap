Package.describe({
  summary: 'Stripe marketplace bootstrap templates.',
  name: 'jimmiebtlr:stripe-marketplace-bootstrap',
  version: '0.0.1-rc.1',
  git: 'https://github.com/elevatedevdesign/' +
       'meteor-stripe-marketplace-bootstrap.git'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.use([
    'jimmiebtlr:stripe-marketplace@0.0.1-rc.1',
    'elevatedevdesign:autoform-jquery-payments@0.0.5',
    'aldeed:autoform@5.3.2',
    'templating',
    'ui',
    'underscore',
    'reactive-var',
    'lepozepo:accounting@1.0.0',
    'fourseven:scss@3.2.0'
  ]);

  api.addFiles([
      'client/style.scss',
      'client/creditCardTemplates.html',
      'client/creditCardTemplates.js',
      'client/creditCardTemplates.css',
      'client/bankAccount.html',
      'client/bankAccount.js',
      'client/bankAccount.scss',
      'client/purchaseHistory.html',
      'client/purchaseHistory.js',
      'client/userInfo.html',
      'client/userInfo.js',
    ],
    ['client']
  );
});
