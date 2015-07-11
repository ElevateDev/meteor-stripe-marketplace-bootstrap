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
    'templating',
    'ui',
  ]);
  
  api.add_files([
      'client/creditCardTemplates.html',
      'client/creditCardTemplates.js',
    ],
    ['client']
  );
});
