// <reference types="Cypress" />
import { GetPluginId, GetPluginName } from '../wp-module-support/pluginID.cy';

describe( 'Branding', function () {
	before( () => {
		cy.visit( 'wp-admin/index.php?page=nfd-onboarding' );
	} );

	// since we are setting brand from plugin container, it will not be set to "newfold"
	// by default even if mm_brand option is deleted from the database
	it( 'Has ' + GetPluginId() + ' class when mm_brand does not exist.', () => {
		if(cy.url().should('contains','fork')){
			cy.get('.nfd-onboarding-sitegen-options__container__options')
				.eq(0)
				.should('be.visible')
				.click();
		};
		cy.exec( 'npx wp-env run cli wp option delete mm_brand' );
		cy.reload();
		if(GetPluginId()=='hostgator'){
			cy.exec( 'npx wp-env run cli wp option set hg_region BR' )
			cy.reload();
			cy.get(`.nfd-brand-${ GetPluginId() }-br`,{timeout:10000}).should('be.visible');
		}
		else{
			cy.get( 'body', {timeout:15000} ).should( 'have.class', `nfd-brand-${ GetPluginId() }` );
		}
		GetPluginName();
	} );

	it( 'Has default WordPress styles when mm_brand has an empty value', () => {
		const emptyString = JSON.stringify( '' );
		cy.exec(
			`npx wp-env run cli wp option set mm_brand '${ emptyString }'`
		);
		cy.reload();
		cy.get( 'body' ).should( 'have.class', 'nfd-brand-wordpress' );
		if(GetPluginId()!='hostgator'){
			cy.get( '.nfd-step-card-subheading' ).should( 'contain', 'web host' );
		};
	} );

	it( 'Has brand specific class for ' + GetPluginId(), () => {
		cy.exec( `npx wp-env run cli wp option update mm_brand ${ GetPluginId() }` );
		cy.reload();
		if(GetPluginId()=='hostgator'){
			cy.get(`.nfd-brand-${ GetPluginId() }-br`,{timeout:10000}).should('be.visible');
		}
		else{
			cy.get( 'body', {timeout:15000} ).should( 'have.class', `nfd-brand-${ GetPluginId() }` );
		}
		GetPluginName();
	} );
} );
