// <reference types="Cypress" />
import { APIList, EventsAPI } from '../wp-module-support/EventsApi.cy';
import { CheckDrawerDisabled } from '../wp-module-support/drawer.cy';
import { CheckCardHeadingSubheading } from '../wp-module-support/header.cy';
import {
	BasicSidebarCheck,
	CheckHelpPanelLinks,
	CheckIllustrationPanel,
	CheckInfoPanel,
	CheckIntroPanel,
} from '../wp-module-support/sidebar.cy';
import { GetPluginId } from '../wp-module-support/pluginID.cy';

describe( 'Get Started Site Type Secondary', function () {
	before( () => {
		cy.visit(
			'wp-admin/?page=nfd-onboarding#/wp-setup/step/get-started/site-secondary'
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
		it( 'Check to make sure sidebar opens, content is in place and close sidebar', () => {
			CheckIntroPanel( '__get-started-site-type', 'Site Type' );
			CheckIllustrationPanel();
			CheckInfoPanel();
			CheckHelpPanelLinks();
		} );
	}
	else{
		it( 'Check to make sure Sidebar opens', () => {
			BasicSidebarCheck();
		} )
	};

	it( 'Check for Event API call being made when different sub-categories are selected', ()=>{
		let SubcategoryCount = 0;
		let num = 0;
		const className = '.nfd-card-sec-category';
		cy.get( className ).should( 'be.visible' );
		const arr = cy.get( className );
		arr.each( () => {
			cy.get( className )
				.eq( SubcategoryCount )
				.click()
				.then(($element) => {
					const dataSlugText = $element.attr('data-slug');
					if(num>=2){
						cy.wait(5000);
					}
					EventsAPI('secondary_type', dataSlugText, APIList.site_secondary);
					num+=1;
				});
			SubcategoryCount += 1;
		} );
	} );

	it( 'Check for Event API call when we enter text in input box', ()=>{
		cy.get( '.nfd-setup-primary-custom__tellus-input' )
			.scrollIntoView()
			.should( 'be.visible' )
			.type( 'Test' );
		EventsAPI('secondary_type', 'Test', APIList.site_secondary);
	} );

	it( 'Check different categories exist using `<` and `>`', () => {
		cy.get( '.nfd-setup-secondary-categories' ).should( 'be.visible' );
		const category_selected = cy.get('.category-scrolling-wrapper__type-text');
		cy.get( '.category-scrolling-wrapper__left-btn' )
			.scrollIntoView()
			.should('be.visible')
			.click();
		cy.get( '.category-scrolling-wrapper__type-text' ).should('not.contain', category_selected);
		cy.reload();
		cy.get('.category-scrolling-wrapper__right-btn-icon')
			.should('be.visible')
			.click();
		cy.get( '.category-scrolling-wrapper__type-text' ).should('not.contain', category_selected);
	});

	it( 'Check different subCategories exist and is selectable', () => {
		let categoryCount = 0;
		const className = '.subCategoriesSection';
		cy.get( className ).should( 'be.visible' );
		const arr = cy.get( className.concat( ' div' ) );
		arr.each( () => {
			cy.get( className.concat( ' div' ) )
				.eq( categoryCount )
				.click()
				.should( 'have.class', 'chosenSecondaryCategory' );
			categoryCount += 1;
		} );
	} );

	it( 'Check if input box exists and is editable', () => {
		let categoryCount = 0;
		const className = '.subCategoriesSection';
		cy.get( className ).should( 'be.visible' );
		cy.get( '.nfd-setup-primary-custom__tellus-input' )
			.scrollIntoView()
			.should( 'be.visible' )
			.type( 'Cars' );
		const arr = cy.get( className.concat( ' div' ) );
		arr.each( () => {
			cy.get( className.concat( ' div' ) )
				.eq( categoryCount )
				.should( 'not.have.class', 'chosenSecondaryCategory' );
			categoryCount += 1;
		} );
	} );

	it( 'Check selecting subCategory resets input box', () => {
		cy.get( '.subCategoriesSection span' ).first().click();
		cy.get( '.subCategoriesSection' )
			.children()
			.should( 'have.class', 'chosenSecondaryCategory' );
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
			'#/wp-setup/step/get-started/site-secondary'
		);
		cy.get( '.navigation-buttons_back' ).click();
	} );

	it( 'Go to the previous step on clicking navigation Back', () => {
		cy.get( '.navigation-buttons_back' ).click();
		cy.url().should(
			'not.include',
			'#/wp-setup/step/get-started/site-secondary'
		);
		cy.get( '.navigation-buttons_next' ).click();
	} );

	it( 'Go to next step on Continue Setup', () => {
		cy.get( '.nfd-nav-card-button' ).click();
		cy.url().should(
			'not.include',
			'#/wp-setup/step/get-started/site-secondary'
		);
	} );
} );
