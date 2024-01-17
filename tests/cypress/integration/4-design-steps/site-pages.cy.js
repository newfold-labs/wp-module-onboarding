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

describe( 'Site Pages', function () {
	before( () => {
		cy.visit(
			'wp-admin/?page=nfd-onboarding#/wp-setup/step/design/site-pages'
		);
		cy.wait( 10000 );
	} );

	it( 'Check if Header and Subheader shows up', () => {
		CheckHeadingSubheading();
	} );

	it( 'Check Drawer Activity', () => {
		DrawerActivityForMenu(
			'Onboarding',
			':nth-child(6)',
			'Page Layouts'
		);
	} );

	if(GetPluginId()!='hostgator'){
	it( 'Check to make sure sidebar opens, content is in place and close sidebar', () => {
		CheckIntroPanel( '__site-pages', 'Pages' );
		CheckIllustrationPanel();
		CheckInfoPanel();
		CheckHelpPanelLinks();
	} );
	}
	else{
		it( 'Check to make sure Sidebar opens', () => {
			BasicSidebarCheck();
		} );
	}

	it( 'Check if Site Pages Templates exist and are selectable', () => {
		let previewCount = 0;
		const className = '.site-pages__list__item';
		const arr = cy.get( className );

		arr.each( () => {
			cy.get( className )
				.eq( previewCount )
				.scrollIntoView()
				.find( '.components-checkbox-control' )
				.find( 'label' )
				.click();
			previewCount += 1;
		} );
	} );
} );
