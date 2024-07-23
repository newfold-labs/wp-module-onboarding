// <reference types="Cypress" />
import { DrawerActivityForSubMenu } from '../wp-module-support/drawer.cy';
import { GetPluginId } from '../wp-module-support/pluginID.cy';
import {
	BasicSidebarCheck,
	CheckHelpPanelLinks,
	CheckIllustrationPanel,
	CheckInfoPanel,
	CheckIntroPanel,
	continueSetup,
} from '../wp-module-support/sidebar.cy';

describe( 'Header menu Page', function () {
	before( () => {
		cy.visit(
			'wp-admin/?page=nfd-onboarding#/wp-setup/step/design/header-menu'
		);
		cy.wait( 10000 );
		continueSetup();
	} );

	it( 'Check Drawer Activity', () => {
		DrawerActivityForSubMenu(
			'Design',
			'.nfd-onboarding-drawer__panel-inside',
			'.theme-header-menu-preview--drawer__list__item',
			4
		);
	} );

	it( 'Check to make sure design button is visble', () => {
		cy.contains( 'button', 'Design' , { timeout:15000 }).should( 'be.visible' );
	} );

	if ( GetPluginId() == 'bluehost' ) {
		it( 'Check to make sure sidebar opens, content is in place and close sidebar', () => {
			CheckIntroPanel( '__design-header-menu', 'Header & Menu' );
			CheckIllustrationPanel();
			CheckInfoPanel( 2 );
			CheckHelpPanelLinks();
		} );
	} else {
		it( 'Check to make sure Sidebar opens', () => {
			BasicSidebarCheck();
		} );
	}

	it( 'Check to make sure different design is selected', () => {
		let previewCount = 0;
		const classname = '.theme-header-menu-preview--drawer__list__item';
		const arr = cy.get( classname );
		arr.each( () => {
			cy.get( classname ).eq( previewCount ).click();
			cy.wait( 3000 );
			cy.get( classname )
				.eq( previewCount )
				.find( classname.concat( '__title-bar--selected' ) )
				.should( 'be.visible' );
			previewCount += 1;
		} );
	} );

	it.skip( 'Check navigation back button is visible and go one step back', () => {
		cy.get( '.navigation-buttons_back' ).should( 'be.visible' ).click();
		cy.wait( 3000 );
		cy.url().should( 'not.contain', '/wp-setup/step/design/header-menu' );
		cy.go( 'back' );
		cy.wait( 3000 );
	} );

	it.skip( 'Check if Navigation Next button is visible and go one step next', () => {
		cy.get( '.navigation-buttons_next' ).should( 'be.visible' ).click();
		cy.wait( 1000 );
		cy.url().should( 'not.contain', '/wp-setup/step/design/header-menu' );
	} );
} );
