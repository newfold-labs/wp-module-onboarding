// <reference types="Cypress" />
import { GetPluginId } from '../wp-module-support/pluginID.cy';
import {
	BasicSidebarCheck,
	CheckHelpPanelLinks,
	CheckIllustrationPanel,
	CheckInfoPanel,
	CheckIntroPanel,
	continueSetup,
} from '../wp-module-support/sidebar.cy';

describe( 'Theme Styles Preview', function () {
	before( () => {
		cy.visit(
			'wp-admin/?page=nfd-onboarding#/wp-setup/step/design/theme-styles/preview'
		);
		cy.wait( 10000 );
		continueSetup();
	} );

	if ( GetPluginId() == 'bluehost' ) {
		it( 'Check to make sure sidebar opens, content is in place and close sidebar', () => {
			CheckIntroPanel( '__design-theme-styles-preview', 'Theme Styles' );
			CheckIllustrationPanel();
			CheckInfoPanel( 2 );
			CheckHelpPanelLinks();
		} );
	} else {
		it( 'Check to make sure Sidebar opens', () => {
			BasicSidebarCheck();
		} );
	}

	it( 'Check if Theme is selected and content is in place', () => {
		cy.get( ':nth-child(1) > .theme-styles-preview__title-bar' ).should(
			'be.visible'
		);
	} );

	it( 'Check if Theme List is Visible in the Drawer', () => {
		let previewCount = 0;
		const className = '.theme-styles-preview--drawer__list__item';
		const arr = cy.get( className );

		arr.each( () => {
			cy.get( className.concat( '__title-bar' ) )
				.eq( previewCount )
				.scrollIntoView()
				.should( 'be.visible' );
			cy.get( className.concat( '__live-preview-container' ) )
				.eq( previewCount )
				.scrollIntoView()
				.should( 'be.visible' );
			previewCount += 1;
		} );
	} );

	it( 'Check for the selected theme in Drawer', () => {
		cy.get( '.nfd-onboarding-drawer__panel-back' )
			.scrollIntoView()
			.should( 'be.visible' )
			.should( 'have.text', 'Design' );
		const className =
			':nth-child(2) > .theme-styles-preview--drawer__list__item__title-bar';
		cy.get( className );
		cy.get( className + ' > .live-preview-selected-check' )
			.scrollIntoView()
			.should( 'be.visible' );
	} );
} );
