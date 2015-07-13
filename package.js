Package.describe({
    summary: "Stripe marketplace bootstrap templates.",
    name: "elevatedevdesign:stripe-marketplace-bootstrap",
  	version: "0.0.1-rc.1",
    git: "https://github.com/elevatedevdesign/meteor-stripe-marketplace-bootstrap.git"
});

Package.on_use(function (api) {
	api.versionsFrom("METEOR@1.0");
	
  api.use([
    'elevatedevdesign:stripe-marketplace@0.0.1-rc.1',
    'elevatedevdesign:autoform-jquery-payments@0.0.5',
    'aldeed:autoform@5.3.2',
    'templating',
    'ui',
    'sacha:spin'
  ]);
  
  api.add_files([
      'client/creditCardTemplates.html',
      'client/creditCardTemplates.js',
    ],
    ['client']
  );
});
