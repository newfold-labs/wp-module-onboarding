// <reference types="Cypress" />
import { DrawerActivityForMenu } from '../wp-module-support/drawer.cy';
import { CheckHeadingSubheading } from '../wp-module-support/header.cy';
import { GetPluginId } from '../wp-module-support/pluginID.cy';
import {
	BasicSidebarCheck,
	CheckHelpPanelLinks,
	CheckIllustrationPanel,
	CheckInfoPanel,
	CheckIntroPanel,
	continueSetup,
} from '../wp-module-support/sidebar.cy';

describe( 'Theme Styles Menu', function () {
	before( () => {
		// Ensure theme is activated before visiting the page
		cy.exec('npx wp-env run cli wp theme activate yith-wonder', { failOnNonZeroExit: false });
		cy.wait( 2000 );
		cy.visit(
			'wp-admin/?page=nfd-onboarding#/wp-setup/step/design/theme-styles/menu'
		);
		cy.wait( 8000 ); // Increased wait for page to fully load
		continueSetup();
	} );

	it( 'Check Drawer Activity', () => {
		DrawerActivityForMenu( 'Onboarding', ':nth-child(1)', 'Theme Styles' );
	} );

	if ( GetPluginId() == 'bluehost' ) {
		it( 'Check to make sure sidebar opens, content is in place and close sidebar', () => {
			CheckIntroPanel( '__design-theme-styles-menu', 'Theme Styles' );
			CheckIllustrationPanel();
			CheckInfoPanel( 2 );
			CheckHelpPanelLinks();
		} );
	} else {
		it( 'Check to make sure Sidebar opens', () => {
			BasicSidebarCheck();
		} );
	}

	it( 'Checks if Heading and Subheading are present', () => {
		CheckHeadingSubheading();
	} );

	it( 'Check if Default Theme variations exists in Menu', () => {
		let previewCount = 0;
		const className = '.theme-styles-menu__list__item';
		// Wait for elements to be visible before iterating
		cy.get( className , { timeout : 5000 }).should('be.visible');
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
} );
