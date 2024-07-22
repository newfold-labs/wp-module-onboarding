// <reference types="Cypress" />
import {
	apiList,
	customizeDataMock,
	themeStyleMock,
} from '../wp-module-support/MockApi.cy';
import {
	AdminBarCheck,
	LightBGCheck,
	ProgressBarCheck,
} from '../wp-module-support/siteGen.cy';

describe( 'SiteGen Site Editor Step', function () {
	before( () => {
		cy.visit(
			'wp-admin/index.php?page=nfd-onboarding#/sitegen/step/preview'
		);
		cy.wait( 10000 );
	} );

	it( 'Select any theme and go forward to the next step', () => {
		cy.get(
			'.live-preview-sitegen--selectable-card__live-preview-container__overlay',
			{ timeout: 60000 }
		)
			.eq( 0 )
			.click();
		cy.url().should( 'not.contain', 'sitegen/step/preview', {
			timeout: 20000,
		} );
	} );

	it( 'Check for the header admin bar', () => {
		AdminBarCheck();
	} );

	it( 'Check for the existing light background', () => {
		LightBGCheck();
	} );

	it( 'Check if we cannot change to dark background', () => {
		cy.get( '.nfd-onboarding-toggle__theme__button__light' ).should(
			'not.exist'
		);
		cy.get( '.nfd-onboarding-sitegen-dark' ).should( 'not.exist' );
	} );

	it( 'Check the Progress Bar Value', () => {
		ProgressBarCheck( '83.3333%' );
	} );

	it( 'Check if the sidebar is closed upon landing', () => {
		cy.get( 'nfd-onboarding-sidebar__panel is-open' ).should( 'not.exist' );
	} );

	it( 'Check if rename functionality works as expected', () => {
		let existing_theme_name;
		cy.get( '.nfd-onboarding-header__center-input' )
			.invoke( 'attr', 'value' )
			.then( ( value ) => {
				existing_theme_name = value;
				cy.get( '.nfd-onboarding-header__center-input' ).should(
					'be.disabled'
				); // not able to rename
				cy.get( '.nfd-onboarding-header__center-dropdown_icon' )
					.should( 'be.visible' )
					.click();
				cy.get(
					'.nfd-onboarding-header__version_dropdown-menu'
				).should( 'be.visible' );
				cy.get( '.components-menu-item__button' )
					.eq( 0 )
					.should( 'be.visible' )
					.should( 'have.text', 'Rename' )
					.click();
				cy.get( '.nfd-onboarding-header__center-input' )
					.clear()
					.type( 'New Theme Name' );
				cy.get( '.nfd-onboarding-header__progress-bar' ).click();
				let NewVal;
				cy.get( '.nfd-onboarding-header__center-input' )
					.invoke( 'attr', 'value' )
					.then( ( value ) => {
						NewVal = value;
						expect( existing_theme_name ).to.not.equal( NewVal );
					} );
			} );
	} );

	it( 'Check for all the themes to be visible inside sidebar', () => {
		cy.get( '.nfd-onboarding-header__center-dropdown_icon' )
			.should( 'be.visible' )
			.click();
		cy.get( '.components-menu-item__button' )
			.eq( 1 )
			.should( 'be.visible' )
			.should( 'have.text', 'View All' )
			.click();
		cy.get( '.nfd-onboarding-sidebar__panel.is-open' ).should(
			'be.visible'
		);
		cy.get(
			'.nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container'
		)
			.should( 'be.visible' )
			.should( 'have.length', 3 ); // as we are not regenrating new themes
	} );

	it( 'Check for favoriting a theme and it appears everywhere', () => {
		cy.get(
			'.nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container'
		)
			.eq( 1 )
			.click();
		cy.get( 'g[clip-path="url(#heart-filled_svg__a)"]' ).should(
			'not.exist'
		);
		cy.get(
			':nth-child(4) > .nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context > .nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context__icon__fill'
		).should( 'not.exist' );
		cy.get( '.navigation-buttons-editor__favorite' )
			.should( 'be.visible' )
			.click();
		cy.get( 'g[clip-path="url(#heart-filled_svg__a)"]', {
			timeout: 20000,
		} ).should( 'exist' );
		cy.get(
			':nth-child(3) > .nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context > .nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context__icon__fill'
		).should( 'exist' );
	} );

	it( 'Check for favorite themes inside favorite tab', () => {
		cy.get(
			'.nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__favorites-tab', {
			timeout: 10000
		} )
			.scrollIntoView()
			.should( 'be.visible' )
			.click();
		cy.get(
			'.nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container'
		)
			.should( 'be.visible' )
			.should( 'have.length', 1 );
		cy.get(
			'.components-button.nfd-onboarding-sidebar--sitegen-editor-patterns__header__icon'
		).should( 'be.visible' );
	} );

	it( 'Check for the existence of Regenerate button', () => {
		cy.get( '.nfd-onboarding-header--sitegen__editor__start__regenerate' )
			.scrollIntoView()
			.should( 'be.visible' );
	} );

	it( 'Check existence of Save & Continue button', () => {
		cy.get( '.nfd-onboarding-header--sitegen__editor__end__save-button' )
			.scrollIntoView()
			.should( 'exist' );
	} );

	it( 'Check changing the existing fonts from sidebar', () => {
		cy.intercept( apiList.themestyle, ( req ) => {
			themeStyleMock( req );
		} ).as( 'themeStyleCalls' );
		cy.intercept( apiList.customizedata, ( req ) => {
			customizeDataMock( req );
		} ).as( 'customizeDataCall' );
		cy.wait( 2000 );
		cy.get(
			'.nfd-onboarding-header--sitegen__editor__end__customize-button'
		).click();
		cy.wait( '@themeStyleCalls', { timeout: 60000 } );
		cy.wait( '@customizeDataCall', { timeout: 60000 } );
		cy.get(
			'.components-panel__body.nfd-onboarding-sidebar-learn-more.is-opened',
			{ timeout: 20000 }
		).should( 'be.visible' );
		cy.get(
			'.components-panel__body.nfd-onboarding-sidebar--customize__design-fonts-panel.is-opened',
			{ timeout: 20000 }
		).should( 'be.visible' );
		let FontsCount = 0;
		const FontsClass =
			'.nfd-onboarding-sidebar--customize__design-fonts-panel__font-group__container__button__font-name__container';
		const arr = cy.get( FontsClass, { timeout: 20000 } );
		arr.each( () => {
			cy.get( FontsClass ).eq( FontsCount ).scrollIntoView().click();
			FontsCount += 1;
		} );
	} );

	it( 'Check changing the custom fonts from sidebar', () => {
		const CustomeFontsClass =
			'.nfd-onboarding-sidebar--customize__design-fonts-panel__fonts-form__container';
		cy.get( CustomeFontsClass ).should( 'not.exist' );
		cy.get(
			'.nfd-onboarding-sidebar--customize__design-fonts-panel__container > .components-button'
		)
			.scrollIntoView()
			.click();
		cy.get( CustomeFontsClass ).should( 'exist' );
		cy.get( '#headings' )
			.scrollIntoView()
			.should( 'be.visible' )
			.select( 'poppins' );
		cy.get( '#body' )
			.scrollIntoView()
			.should( 'be.visible' )
			.select( 'oswald' );
		cy.get( '.components-button.apply.is-primary' )
			.scrollIntoView()
			.should( 'be.visible' )
			.click();
		cy.get(
			'.nfd-onboarding-sidebar--customize__design-fonts-panel__custom-fonts__container > .nfd-onboarding-sidebar--customize__design-fonts-panel__font-group__container > .nfd-onboarding-sidebar--customize__design-fonts-panel__font-group__container__button > .nfd-onboarding-sidebar--customize__design-fonts-panel__font-group__container__button__icon'
		)
			.scrollIntoView()
			.should( 'exist' );
		cy.get(
			'.nfd-onboarding-sidebar--customize__design-fonts-panel__font-group__container__button__font-name__container'
		).should( 'have.length', 6 );
	} );

	it( 'Check changing the existing colors from sidebar', () => {
		cy.get(
			'.components-panel__body.nfd-onboarding-sidebar--customize__design-colors-panel.is-opened'
		).should( 'exist' );
		const ColorPalleteClass =
			'.nfd-onboarding-sidebar--customize__color-palette-icon__container';
		let ColorCount = 0;
		const arr = cy.get( ColorPalleteClass, { timeout: 20000 } );
		arr.each( () => {
			cy.get( ColorPalleteClass )
				.eq( ColorCount )
				.scrollIntoView()
				.click();
			ColorCount += 1;
		} );
	} );

	it( 'Check changing the custom colors from sidebar', () => {
		const CustomColorClass =
			'.nfd-onboarding-sidebar--customize__design-colors-panel__custom__colors__container';
		cy.get( CustomColorClass ).should( 'not.exist' );
		cy.get(
			'.nfd-onboarding-sidebar--customize__design-colors-panel__custom__colors__button__container'
		)
			.scrollIntoView()
			.should( 'be.visible' )
			.click();
		cy.get( CustomColorClass ).should( 'exist' );
		let previewCount = 0;
		const className = '.custom-palette__below__row';
		const array = cy.get( className );
		const colors = [ 'F31267', '1E5B32', '331E5C', 'E00505', 'EB22E9' ];
		array.each( () => {
			const randomIndex = Math.floor( Math.random() * colors.length );
			cy.get( className ).eq( previewCount ).click();
			cy.get( '.components-color-palette__custom-color-button' ).click();
			cy.get( '.components-input-control__input' ).clear();
			cy.get( '.components-input-control__input' ).type(
				colors[ randomIndex ]
			);
			cy.get( className ).eq( previewCount ).click();
			previewCount += 1;
		} );
		cy.get( '.components-button.is-primary' ).scrollIntoView().click();
		cy.get(
			'.nfd-onboarding-sidebar--customize__color-palette-icon__container'
		)
			.should( 'be.visible' )
			.should( 'have.length', 6 );
	} );

	it( 'Check clicking the reset button', () => {
		cy.get( '.components-panel__header > :nth-child(2)' )
			.scrollIntoView()
			.should( 'exist' )
			.click();
		cy.get(
			'.nfd-onboarding-sidebar--customize__design-colors-panel__custom__colors__container'
		).should( 'not.exist' );
	} );
} );
