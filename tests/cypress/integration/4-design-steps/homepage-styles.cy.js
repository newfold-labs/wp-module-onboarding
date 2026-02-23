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

describe( 'Homepage Styles Page', function () {
	before( () => {
		// Ensure theme is activated before visiting the page
		cy.exec('npx wp-env run cli wp theme activate yith-wonder', { failOnNonZeroExit: false });
		cy.wait( 2000 );
		cy.visit(
			'wp-admin/?page=nfd-onboarding#/wp-setup/step/design/homepage-menu'
		);
		cy.wait( 8000 ); // Reduced from 15s but ensure page loads
		continueSetup();
	} );

	it( 'Check if Header and Subheader shows up', () => {
		CheckHeadingSubheading();
	} );

	it( 'Check Drawer Activity', () => {
		DrawerActivityForMenu(
			'Onboarding',
			':nth-child(5)',
			'Homepage Layouts'
		);
	} );

	if ( GetPluginId() == 'bluehost' ) {
		it( 'Check to make sure sidebar opens, content is in place and close sidebar', () => {
			CheckIntroPanel( '__design-homepage', 'Home Page' );
			CheckIllustrationPanel();
			CheckInfoPanel( 2 );
			CheckHelpPanelLinks();
		} );
	} else {
		it( 'Check to make sure Sidebar opens', () => {
			BasicSidebarCheck();
		} );
	}

	it( 'Check if Homepage Styles exist and are selectable', () => {
		let previewCount = 0;
		const className = '.homepage_preview__list__item';
		// Wait for elements to be visible before iterating
		cy.get( className, { timeout: 5000 } ).should('be.visible');
		const arr = cy.get( className );

		arr.each( () => {
			cy.get( className ).eq( previewCount ).click();
			cy.get( className )
				.eq( previewCount )
				.find( className.concat( '__title-bar--selected' ) )
				.should( 'be.visible' );
			previewCount += 1;
		} );
	} );
} );
