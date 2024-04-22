// <reference types="Cypress" />
import { DrawerActivityForSubMenu } from '../wp-module-support/drawer.cy';
import { GetPluginId } from '../wp-module-support/pluginID.cy';
import {
	BasicSidebarCheck,
	CheckHelpPanelLinks,
	CheckIllustrationPanel,
	CheckInfoPanel,
	CheckIntroPanel,
} from '../wp-module-support/sidebar.cy';

describe( 'Typography Step Test', function () {
	before( () => {
		cy.visit(
			'wp-admin/?page=nfd-onboarding#/wp-setup/step/design/typography'
		);
	} );

	it( 'Check Drawer Activity', () => {
		DrawerActivityForSubMenu(
			'Design',
			'.theme-fonts--drawer',
			'.font-palette',
			12
		);
	} );

	if(GetPluginId()=='bluehost'){
		it( 'Check to make sure sidebar opens, content is in place and close sidebar', () => {
			CheckIntroPanel( '__design-fonts', 'Fonts' );
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

	it( 'Check if Default Typography variations exists and are selectable', () => {
		let previewCount = 0;
		const className = '.font-palette ';
		const arr = cy.get( className );

		arr.each( () => {
			cy.get( className ).eq( previewCount ).click();
			cy.get( '.font-palette-selected' )
				.scrollIntoView()
				.should( 'be.visible' );
			previewCount += 1;
		} );
	} );
} );
