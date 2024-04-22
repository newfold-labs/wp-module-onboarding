// <reference types="Cypress" />
import { DrawerActivityForMenu } from '../wp-module-support/drawer.cy';
import { CheckHeadingSubheading } from '../wp-module-support/header.cy';
import { EventsAPI, APIList } from '../wp-module-support/EventsApi.cy';

describe( 'Top Priority Page', function () {
	before( () => {
		cy.visit( 'wp-admin/?page=nfd-onboarding#/wp-setup/step/top-priority' );
	} );

	it.skip( 'Check Drawer Activity', () => {
		DrawerActivityForMenu(
			'Exit to WordPress',
			':nth-child(2)',
			'Top Priority'
		);
	} );

	it( 'Check if Header and Subheader shows up', () => {
		CheckHeadingSubheading();
	} );

	it( 'Check if different cards are present', () => {
		cy.get( '.selectable_cards' ).should( 'be.visible' );
	} );

	it( 'Check existence of Skip this Step button', () => {
		cy.get( '.components-button.skip-button' ).should( 'be.visible' );
	} );

	it( 'Check for API events when different cards are selected', ()=> {
		let previewCount = 0;
		const className = '.components-surface.components-card.nfd-card';
		const arr = cy.get( className );
		arr.each( () => {
			cy.get( className )
				.eq( previewCount )
				.should( 'be.visible' )
				.click();
				if ( previewCount == 0 ) {
					EventsAPI( 'top_priority', 'content', APIList.events_api_general_onb );
				}
				if ( previewCount == 1 ) {
					EventsAPI( 'top_priority', 'store', APIList.events_api_general_onb );
				}
				if ( previewCount > 1 ) {
					cy.wait( 5000 );
					EventsAPI( 'top_priority', 'design', APIList.events_api_general_onb );
				}
		previewCount += 1;
		});
	} );

	it.skip( 'Click on different cards and move on to next page', () => {
		let previewCount = 0;
		const className = '.components-surface.components-card.nfd-card';
		const arr = cy.get( className );
		arr.each( () => {
			cy.get( className )
				.eq( previewCount )
				.should( 'be.visible' )
				.click();
			previewCount += 1;
			cy.get( '.nfd-card__body.nfd-selected-card' )
				.find( '.nfd-card__body_title' )
				.invoke( 'text' )
				.then( ( $ele ) => {
					if ( $ele !== 'Selling' ) {
						cy.get(
							'.components-button.navigation-buttons.navigation-buttons_next.is-primary'
						).click();
						cy.url().should( 'include', 'theme-styles/menu', {
							timeout: 30000,
						} );
						cy.get('.navigation-buttons_back').click();
						cy.get(
							'.nfd-card__body.nfd-selected-card> .nfd-card__body_title'
						).contains( $ele );
					}
				} );
		} );
		cy.get( className )
			.eq( 1 )
			.then( ( $el ) => {
				cy.get( className ).eq( 1 ).should( 'be.visible' ).click();
				cy.get( '.nfd-card__body.nfd-selected-card' )
					.find( '.nfd-card__body_title' )
					.invoke( 'text' )
					.then( ( $ele ) => {
						cy.get(
							'.components-button.navigation-buttons.navigation-buttons_next.is-primary'
						).click();
						cy.wait( 10000 );
						cy.url().should( 'include', 'step/address', {
							timeout: 60000,
						} );
					} );
			} );
	} );
} );
