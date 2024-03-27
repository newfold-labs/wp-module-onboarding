describe('SiteGen Site Logo Step', function () {
    const end_point = '/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fsitegen%2Fgenerate&flow=sitegen&_locale=user'
    before(() => {
        // cy.visit(
        //     'wp-admin/?page=nfd-onboarding#/sitegen/step/site-logo'
        // );
    });

  it.only('Check whether API mocking is possible for site_config', () => {
    const site_config_fixture = `vendor/newfold-labs/wp-module-onboarding/tests/cypress/fixtures/site-config.json`
    const site_classification_fixture = `vendor/newfold-labs/wp-module-onboarding/tests/cypress/fixtures/site-classification.json`
    // // 1st logic
    // cy.intercept(end_point)
    //   .as('sitegenCalls')

    //   cy.visit('wp-admin/index.php?page=nfd-onboarding#/sitegen/step/site-logo')
      
    //   // assert that a matching request has been made
    // cy.wait('@sitegenCalls', {timeout: 20000}).then((site_config_req) => {
    //   cy.log(JSON.stringify(site_config_req.request.body))
    //   site_config_req.reply({
    //     statusCode: 200,
    //     body: site_config_fixture,
    //   })
        
    // })
    
    // cy.wait('@sitegenCalls', {timeout: 20000} ).then((site_classification_req) => {
    //   cy.log(JSON.stringify(site_classification_req.request.body))
        
    //   })

    // second logic
    // Intercepting requests to the same endpoint
cy.intercept(end_point, (req) => {
  // Check the request object and provide appropriate mock response
  if (req.hasOwnProperty('identifier') && req.identifier.includes('site_config')) {

    req.reply({
      statusCode: 200,
      body: site_config_fixture,
      headers: {
        'content-type': 'application/json'
      }
    });
  } else if (req.identifier.includes('site_classification')) {
    req.reply({
      statusCode: 200,
      body: site_classification_fixture,
      headers: {
        'content-type': 'application/json'
      }
    });
  } else {
    // req.reply({
    //   statusCode: 200,
    //   body: {
    //     message: 'Default response'
    //   },
    //   headers: {
    //     'content-type': 'application/json'
    //   }
    // });
  }
}).as('sitegenCalls');
    
      cy.visit('wp-admin/index.php?page=nfd-onboarding#/sitegen/step/site-logo')
    
    cy.wait('@sitegenCalls', {timeout: 25000} )
    


  });
    
});