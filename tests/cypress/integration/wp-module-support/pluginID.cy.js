// <reference types="Cypress" />
export const GetPluginId = () => {
  return Cypress.env('pluginId');
  }

export const GetPluginName = () => {
  if(GetPluginId()=='bluehost'){
    cy.get( '.nfd-step-card-subheading', {timeout:20000} ).should( 'contain', 'Bluehost');
  };
  if(GetPluginId()=='hostgator'){
    cy.get( '.nfd-step-card-subheading', {timeout:20000} ).should( 'contain', 'HostGator');
  };
  if(GetPluginId()=='crazy-domains'){
    cy.get( '.nfd-step-card-subheading', {timeout:20000} ).should( 'contain', 'Crazy Domains');
  };
}

export const getAppId = () => {
  return Cypress.env('appId')
}
