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
} from '../wp-module-support/sidebar.cy';

describe( 'Site Features', function () {
	before( () => {
		cy.visit(
			'wp-admin/?page=nfd-onboarding#/wp-setup/step/site-features'
		);
		cy.wait( 10000 );
	} );

	it( 'Check if Header and Subheader shows up', () => {
		CheckHeadingSubheading();
	} );

	it( 'Check if Header has text `site` in it', () => {
		cy.get( '.nfd-main-heading__title' )
			.should('be.visible')
			.contains('site');
	} );

	it( 'Check Drawer Activity', () => {
		DrawerActivityForMenu(
			'WordPress',
			':nth-child(5)',
			false
		);
	} );

	if(GetPluginId()!='hostgator'){
	it( 'Check to make sure sidebar opens, content is in place and close sidebar', () => {
		CheckIntroPanel( '__site-features', 'Features' );
		CheckIllustrationPanel();
		CheckInfoPanel();
		CheckHelpPanelLinks();
	} );
	}
	else{
		it( 'Check to make sure Sidebar opens', () => {
			BasicSidebarCheck();
		} );
	};

	it( 'Check if Site Features list exists and select them', () => {
		let previewCount = 0;
		const className = '.checkbox-item ';
		const arr = cy.get( className );

		arr.each( () => {
			cy.get( className )
				.eq( previewCount )
				.find( '.components-base-control' )
				.find( 'input' )
				.scrollIntoView()
				.click();
			previewCount += 1;
		} );
	} );
} );
