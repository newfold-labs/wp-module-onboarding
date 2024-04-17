// <reference types="Cypress" />
import { APIList, EventsAPI } from '../wp-module-support/EventsApi.cy';
import { CheckDrawerDisabled } from '../wp-module-support/drawer.cy';
import { CheckCardHeadingSubheading } from '../wp-module-support/header.cy';
import { GetPluginId } from '../wp-module-support/pluginID.cy';
import {
	BasicSidebarCheck,
	CheckHelpPanelLinks,
	CheckIllustrationPanel,
	CheckInfoPanel,
	CheckIntroPanel,
} from '../wp-module-support/sidebar.cy';

describe.skip( 'Get Started Site Type Primary', function () {
	before( () => {
		cy.visit(
			'wp-admin/?page=nfd-onboarding&flow=ecommerce#/wp-setup/step/get-started/site-primary'
		);
		cy.wait( 3000 );
	} );

	it( 'Check if the Suppressed Drawer does not open on clicking Toggle Button', () => {
		CheckDrawerDisabled();
	} );

	it( 'Check if Header and Subheader shows up', () => {
		CheckCardHeadingSubheading( true );
	} );

	if(GetPluginId()=='bluehost'){
		it( 'Check if `store` appears in heading', () => {
			cy.get('.nfd-step-card-heading')
				.should('be.visible')
				.contains('store');
		} );

		it( 'Check to make sure sidebar opens, content is in place and close sidebar', () => {
			CheckIntroPanel( '__get-started-site-type', 'Store Type' );
			CheckIllustrationPanel();
			CheckInfoPanel();
			CheckHelpPanelLinks();
		} );

		it( 'Check if Business category is pre-selected', () => {
			cy.get( '.chosenPrimaryCategory' )
				.find( '.categName' )
				.should( 'have.text', 'Business' );
		} );
	}
	else{
		it( 'Check to make sure Sidebar opens', () => {
			BasicSidebarCheck();
		} );
	};

	it( 'Check for Event API call being made when different categories are selected', ()=>{
		let categoryCount = 0;
		let num = 0;
		const className = '.nfd-card-pri-category';
		cy.get( className ).should( 'be.visible' );
		const arr = cy.get( className );
		arr.each( () => {
			cy.get( className )
				.eq( categoryCount )
				.click()
				.then(($element) => {
					const dataSlugText = $element.attr('data-slug');
					if(num>=2){
						cy.wait(4000);
					}
					EventsAPI('primary_type', dataSlugText, APIList.events_api_ecomm);
					num+=1;
				});
			categoryCount += 1;
		} );
	} );

	it( 'Check for Event API call when we enter text in input box', ()=>{
		cy.get( '.nfd-setup-primary-custom__tellus-input' )
			.scrollIntoView()
			.should( 'be.visible' )
			.type( 'Test' );
		EventsAPI('primary_type', 'Test', APIList.events_api_ecomm);
	} );

	it( 'Check different Categories exist and is selectable', () => {
		let categoryCount = 0;
		const className = '.nfd-card-pri-category';
		cy.get( className ).should( 'be.visible' );
		const arr = cy.get( className );
		arr.each( () => {
			cy.get( className )
				.eq( categoryCount )
				.click()
				.should( 'have.class', 'chosenPrimaryCategory' );
			categoryCount += 1;
		} );
	} );

	it( 'Check if input box exists and is editable', () => {
		let categoryCount = 0;
		const className = '.nfd-card-pri-category';
		cy.get( className ).should( 'be.visible' );
		cy.get( '.nfd-setup-primary-custom__tellus-input' )
			.scrollIntoView()
			.should( 'be.visible' )
			.type( 'Not Business' );
		const arr = cy.get( className );
		arr.each( () => {
			cy.get( className )
				.eq( categoryCount )
				.should( 'not.have.class', 'chosenPrimaryCategory' );
			categoryCount += 1;
		} );
	} );

	it( 'Check selecting Category resets input box', () => {
		cy.get( '.nfd-card-pri-category-wrapper span' ).first().click();
		cy.get( '.nfd-setup-primary-custom__tellus-input' )
			.scrollIntoView()
			.should( 'be.visible' )
			.should( 'be.empty' );
	} );

	it( 'Check existence of Need Help Tag', () => {
		cy.get( '.nfd-card-need-help-tag' )
			.scrollIntoView()
			.should( 'be.visible' );
	} );

	it( 'Check existence of Need Help URL', () => {
		cy.get( '.nfd-card-need-help-tag > a' ).should( 'have.attr', 'href' );
	} );

	it( 'Go to the next step on clicking navigation Next', () => {
		cy.get( '.navigation-buttons_next' ).click();
		cy.url().should(
			'not.include',
			'#/wp-setup/step/get-started/site-primary'
		);
		cy.get( '.navigation-buttons_back' ).click();
	} );

	it( 'Go to the previous step on clicking navigation Back', () => {
		cy.get( '.navigation-buttons_back' ).click();
		cy.url().should(
			'not.include',
			'#/wp-setup/step/get-started/site-primary'
		);
		cy.get( '.navigation-buttons_next' ).click();
	} );

	it( 'Go to next step on Continue Setup', () => {
		cy.get( '.nfd-nav-card-button' ).click();
		cy.url().should(
			'not.include',
			'#/wp-setup/step/get-started/site-primary'
		);
	} );
} );
