const fix = require('../../fixtures/example.json');
import { apiList, siteGenMockAll } from '../wp-module-support/MockApi.cy';

describe('SiteGen Site Logo Step', function () {
  const end_point = '/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fsitegen%2Fgenerate&flow=sitegen&_locale=user'
  // before(() => {
  //     // cy.visit(
  //     //     'wp-admin/?page=nfd-onboarding#/sitegen/step/site-logo'
  //     // );
  // });

  it.only('Check whether API mocking is possible for site_config', () => {
    const site_config_fixture = `vendor/newfold-labs/wp-module-onboarding/tests/cypress/fixtures/site-config.json`
    const site_classification_fixture = `vendor/newfold-labs/wp-module-onboarding/tests/cypress/fixtures/example`
    const target_audience_fixture = `vendor/newfold-labs/wp-module-onboarding/tests/cypress/fixtures/target-audience.json`
    // // ***************       START OF LOGIC 1 ****************************************
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
    // *********************** END OF LOGIC 1 **********************************

    // // *****************START OF LOGIC 2 *************************************
    // cy.fixture(site_classification_fixture).as('siteClassJson')
    // Intercepting requests to the same endpoint
    cy.intercept(apiList.sitegen, (req) => {
      siteGenMockAll(req)


      // const requestBody = req.body
      
      // Check the request object and provide appropriate mock response
      // if (requestBody.hasOwnProperty('identifier') && requestBody.identifier == 'site_config') {

      //   req.reply({
      //     statusCode: 200,
      //     body: fix,
      //     headers: {
      //       'content-type': 'application/json'
      //     }
      //   });
      // }
      // if ( requestBody.hasOwnProperty('identifier') && requestBody.identifier == 'site_classification') {
      //   req.reply({
      //     statusCode: 200,
      //     body: { "justtest": "yes" },
      //     headers: {
      //       'content-type': 'application/json'
      //     }
      //   });
      // } 

      // if (req.hasOwnProperty('identifier') && req.identifier.includes('target_audience')) {
      //   cy.log(JSON.stringify(req.body))
      //   req.reply({
      //     statusCode: 200,
      //     body: target_audience_fixture,
      //     headers: {
      //       'content-type': 'application/json'
      //     }
      //   });
      // }

      // similarly for other identifiers
    }).as('sitegenCalls');
    
    cy.visit('wp-admin/index.php?page=nfd-onboarding#/sitegen/step/site-logo')
    
    cy.wait('@sitegenCalls', { timeout: 25000 })
    
    // **************************** END OF LOGIC 2 ***************************
    


  });
});