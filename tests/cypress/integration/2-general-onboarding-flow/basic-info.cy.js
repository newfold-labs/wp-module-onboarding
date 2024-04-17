// <reference types="Cypress" />
import { DrawerClose } from '../wp-module-support/drawer.cy';
import { CheckHeadingSubheading } from '../wp-module-support/header.cy';
import {
	BasicSidebarCheck,
	CheckHelpPanelLinks,
	CheckIllustrationPanel,
	CheckInfoPanel,
	CheckIntroPanel
} from '../wp-module-support/sidebar.cy';
import { SocialMediaTextValidations } from '../wp-module-support/socialMedia.cy';
import { APIList, BasicInfoAPI } from '../wp-module-support/EventsApi.cy';
import { GetPluginId } from '../wp-module-support/pluginID.cy';

describe.skip( 'Basic Info Page', function () {
	const desc = 'Welcome to WordPress';
	const title = 'Hello WordPress';
	const customCommandTimeout = 10000;

	before( () => {
		cy.visit( 'wp-admin/?page=nfd-onboarding#/wp-setup/step/basic-info' );
	} );

	it( 'Check Drawer Activity', () => {
		let href;
		cy.get( '.nfd-onboarding-drawer__toggle' )
			.as( 'drawerOpen' )
			.invoke( 'attr', 'class' )
			.then( ( class_name ) => {
				if ( ! class_name.includes( 'is-open' ) ) {
					cy.get( '.nfd-onboarding-drawer__toggle-button' ).click();
				}
			} );
		cy.get( '.nfd-onboarding-drawer__panel-inner', {timeout: 10000} )
			.scrollIntoView()
			.should( 'be.visible' );

		cy.get( ':nth-child(2) > .nfd-onboarding-drawer__panel-menu-link' )
			.should( 'have.class', 'active' )
			.and( 'have.attr', 'href' )
			.then( ( value ) => ( href = value ) );
		cy.url().then( ( url ) => {
			expect( url ).to.include( href );
		} );
	} );

	it( 'Check if Header and Subheader shows up', () => {
		cy.wait( 3000 );
		DrawerClose();
		CheckHeadingSubheading();
	} );

	if(GetPluginId()=='bluehost'){
		it( 'Check to make sure sidebar opens, content is in place and close sidebar', () => {
			CheckIntroPanel( '__basic-info', 'Basic Info' );
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

	it( 'Enter a Title and then Check if it reflects elsewhere', () => {
		const titleBox = cy.get( ':nth-child(1) > label > .nfd-input__field' );
		if ( titleBox.should( 'exist' ) ) {
			titleBox.scrollIntoView();
			titleBox.clear();
			cy.wait( 1000 );
			titleBox.type( title );

			// Check if Mini Preview Tab has the Title
			cy.get( '.browser-row-title_bar_main-text' ).contains( title );
			// Check if Mini Preview Webpage Search result has the Title
			cy.get( '.browser-content_top-row-name' ).contains( title );
		}
	} );

	it( 'Enter a Desc and then Check if it reflects elsewhere', () => {
		const descBox = cy.get( ':nth-child(2) > label > .nfd-input__field' );
		if ( descBox.should( 'exist' ) ) {
			descBox.scrollIntoView();
			descBox.clear();
			cy.wait( 1000 );
			descBox.type( desc );

			// Check if Mini Preview Webpage Search result has the Desc
			cy.get( '.browser-content_desc' ).contains( desc );
		}
	} );

	it( 'Check if Social Media Accordion Toggles', () => {
		cy.get(
			':nth-child(7) > .social-form__label > .social-form__label_name'
		)
			.should( 'exist' )
			.should( 'not.be.visible' );

		// Open Social Media Accordion
		cy.get( '.social-form__top-row_icon' ).click();
		cy.get(
			':nth-child(7) > .social-form__label > .social-form__label_name'
		)
			.should( 'exist' )
			.scrollIntoView()
			.should( 'have.css', 'opacity', '1' );
	} );

	it( 'Check for the short URL tooltip & Modal exists when we use URL shortner', () => {
		const shortURL = 'https://bit.ly';
		const Tooltiptext1 = 'Short URLs are a great way to track clicks';
		const ModalText1 = `It looks like you're using a URL shortener!`;
		SocialMediaTextValidations( shortURL, Tooltiptext1, ModalText1 );
	} );

	it( 'Check if the URL automatically updates http to https', () => {
		const sampleURL = 'http://www.facebook.com';
		const socialTest = '#facebook';
		cy.get( '.social-form__top-row_icon' ).click( { force: true } );
		if ( cy.get( socialTest ).should( 'exist' ) ) {
			cy.get( socialTest ).clear({force: true});
			cy.get( socialTest ).type( sampleURL );
			cy.get( '#twitter' ).focus();
			cy.get( socialTest )
				.invoke( 'val' )
				.should( 'contain', 'https://' );
		}
	} );

	it( 'Check for twitter or instagram id starting with `@` to convert it to URL', () => {
		const sampleID = '@infinity';
		const socialTest3 = '#instagram';
		if ( cy.get( socialTest3 , { timeout: customCommandTimeout} ).should( 'exist' ) ) {
			cy.get( socialTest3 ).clear({ force: true });
			cy.get( socialTest3 ).type( sampleID );
			cy.wait(200);
			cy.get( '#facebook' ).focus();
			cy.get( socialTest3 )
				.invoke( 'val' )
				.should( 'contain', 'https://' );
		}
		// cy.wait( 2000 )
	} );

	it( 'Check if Social Media URL checks are done', () => {
		const invalidURL = 'htt';
		const validURL = 'https://www.facebook.com';
		const Tooltiptext2 = 'we need the full URLs to your social profiles.';
		const ModalText2 = `One of those URLs doesn't look like a social media URL.`;

		// Facebook Social Media Component
		const socialTest2 = cy.get( '#twitter' );
		const socialTest = cy.get( '#facebook' );
		cy.wait(3000)

		if ( socialTest.should( 'exist', { timeout: customCommandTimeout } ) ) {
			cy.get( '#facebook' ).clear();
			cy.get( '.browser-content_social_icon.--no-url', { timeout: customCommandTimeout } ).should( 'exist' )
			cy.get(
				'.browser-content_social_icon[style="background-image: var(--facebook-icon);"]',
				{ timeout : customCommandTimeout }
			).should( 'have.css', 'opacity', '0.5' );

			socialTest2.focus();
			socialTest.type( invalidURL );
			cy.wait(200);
			socialTest2.focus();
			cy.wait(200);
			if(GetPluginId()!='hostgator'){
				cy.get( '.Tooltip-Wrapper', { timeout: 3000 } ).should( 'exist' );
				cy.get( '.Tooltip-Tip', { timeout: 3000 } )
					.should( 'be.visible' )
					.should( 'contain', Tooltiptext2 );
				cy.get( '.navigation-buttons_next' ).click();
				cy.get( '.components-modal__content' ).should( 'be.visible' );
				cy.get( '.components-modal__header-heading' ).should(
					'have.text',
					ModalText2
				);
			}
			else{
				cy.get( '.Tooltip-Tip', { timeout: 3000 } ).should( 'be.visible' );
				cy.get( '.navigation-buttons_next' ).click();
				cy.get( '.components-modal__content' ).should( 'be.visible' );
			};

			cy.get( '.components-modal__header button' , { timeout: customCommandTimeout } ).click();
			cy.wait(200);
			cy.get(
				'.browser-content_social_icon[style="background-image: var(--facebook-icon);"]'
			).should( 'have.css', 'opacity', '0.75' );
			// The URL Checker runs on a debounce
			// Shows the message to the User in case of Invalid URL
			
			// cy.get( '.components-modal__content' ).type( '{esc}' );
			

			socialTest.focus();
			socialTest.clear();
			cy.wait(200);
			socialTest.type( validURL );
			socialTest2.focus();
			cy.wait(200);
			cy.get( '.Tooltip-Wrapper', { timeout: 3000 } ).should(
				'not.exist'
			);
			cy.wait( 2000 )
			cy.get(
				'.browser-content_social_icon[style="background-image: var(--facebook-icon);"]'
			).should( 'have.css', 'opacity', '1' );

			// Close Social Media Accordion
			cy.get( '.social-form__top-row_icon' ).scrollIntoView().click();
		}
	} );

	it( 'Check if Image gets Uploaded', () => {
		const sampleLogo = `vendor/newfold-labs/wp-module-onboarding/tests/cypress/fixtures/image.png`;

		if (
			cy
				.get( '.image-uploader_window-reset-btn' )
				.should( 'exist' )
		) {
			cy.get( '.image-uploader_window-logo-icon-selected' ).should(
				'not.exist'
			);

			// Upload the Image into the Upload Section
			cy.get( '.image-uploader_window-select-btn', { timeout: 10000 } )
				.scrollIntoView()
				.should( 'exist' )
				.selectFile( sampleLogo, { force: true } )
				.then( () => {
					cy.wait( 1000 );
					// Check if the image got uploaded
					cy.get(
						'.image-uploader_window-logo-icon-selected'
					).should( 'exist' );
					cy.get( '.image-uploader_window-reset-btn' )
						.should( 'exist' )
						.scrollIntoView()
						.contains( 'RESET' );
				} );
		}
	} );

	it('Test Basic Info Events API gets triggered', () => {
		const socialTest = '#facebook'
		const socialTest2 = '#twitter';
		const socialTest3 = '#instagram'
		const socialTest4 = '#youtube';
		const socialTest5 = '#linkedin';
		const socialTest6 = '#yelp';
		const socialTest7 = '#tiktok';
		const label_keys = ['', 'title', 'tagline', 'logo_added', 'platform', 'platform', 'platform', 'platform', 'platform', 'platform', 'platform'];
		const actual_values = ['', title, desc, '', 'facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'yelp', 'tiktok'];

		cy.get('.social-form__top-row_icon')
			.as('socialFormToggle')
			.invoke('attr', 'class')
			.then((class_name) => {
				if (
					!class_name.includes('social-form__top-row_icon_opened')
				) {
					cy.get('@socialFormToggle').click();
				}
			});
		
		cy.get( socialTest ).should( 'exist' );
		cy.get( socialTest ).clear();
		cy.get( socialTest ).type( 'https://www.facebook.com/testfacebook' );
	
		cy.get( socialTest2 ).should( 'exist' );
		cy.get( socialTest2 ).clear();
		cy.get(socialTest2).type('@testTweet');
		
		cy.get( socialTest3 ).should( 'exist' );
		cy.get( socialTest3 ).clear();
		cy.get( socialTest3 ).type( '@testInsta' );

		cy.get( socialTest4 ).should( 'exist' );
		cy.get( socialTest4 ).clear();
		cy.get( socialTest4 ).type( '@testYouTube' );

		cy.get( socialTest5 ).should( 'exist' );
		cy.get( socialTest5 ).clear();
		cy.get( socialTest5 ).type( 'https://linkedin.com/in/testLinkedIn' );

		cy.get( socialTest6 ).should( 'exist' );
		cy.get( socialTest6 ).clear();
		cy.get( socialTest6 ).type( 'https://www.yelp.com/testYelp' );

		cy.get( socialTest7 ).should( 'exist' );
		cy.get( socialTest7 ).clear();
		cy.get( socialTest7 ).type( 'https://www.tiktok.com/testTikTok' );

		cy.wait( 2000 );
		cy.intercept( APIList.events_api_general_onb ).as( 'events' );
		cy.get( '.navigation-buttons_next' ).click();
		BasicInfoAPI( 'basic_info', label_keys, actual_values );
	} );
} );
