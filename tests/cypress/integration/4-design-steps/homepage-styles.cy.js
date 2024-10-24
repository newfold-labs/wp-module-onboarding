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
		cy.visit(
			'wp-admin/?page=nfd-onboarding#/wp-setup/step/design/homepage-menu'
		);
		cy.wait( 15000 );
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
		const arr = cy.get( className, { timeout:15000 } );

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
