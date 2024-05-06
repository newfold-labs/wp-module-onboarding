// <reference types="Cypress" />
const customCommandTimeout = 30000;

export const CheckDrawerDisabled = () => {
	cy.get( '.nfd-onboarding-drawer__toggle-button', {
		timeout: customCommandTimeout,
	} )
		.click()
		.should( 'have.class', 'is-suppressed' );
	cy.get( '.nfd-onboarding-drawer__panel-scroll-container' )
		.scrollIntoView()
		.should( 'not.be.visible' );
};

export const DrawerOpen = () => {
	cy.get( '.nfd-onboarding-drawer__toggle-button' ).click();
	cy.get( '.nfd-onboarding-drawer__panel-scroll-container' )
		.scrollIntoView()
		.should( 'be.visible' );
};

export const DrawerClose = () => {
	cy.get( '.nfd-onboarding-drawer__toggle-button' ).click();
	cy.get( '.nfd-onboarding-drawer__panel-scroll-container' )
		.scrollIntoView()
		.should( 'not.be.visible' );
};

export const DrawerActivityForMenu = (
	text,
	itemPosition,
	isOpen = true
) => {
	let href;
	if ( ! isOpen ) {
		DrawerOpen();
	}
	cy.get( '.nfd-onboarding-drawer__panel-inner' , { timeout:15000 })
		.scrollIntoView()
		.should( 'be.visible' );
	cy.get( '.nfd-onboarding-drawer__panel-back' )
		.should( 'be.visible' )
		.contains( text );
	cy.get(
		itemPosition.concat( ' > .nfd-onboarding-drawer__panel-menu-link' )
	)
		.should( 'have.class', 'active' )
		.and( 'have.attr', 'href' )
		.then( ( value ) => ( href = value ) );
	cy.url().then( ( url ) => {
		expect( url ).to.include( href );
	} );
	DrawerClose();
};

export const DrawerActivityForSubMenu = (
	text,
	subMenuDrawer,
	itemClassName,
	itemCount,
	isOpen = true
) => {
	if ( ! isOpen ) {
		DrawerOpen();
	}
	cy.get( '.nfd-onboarding-drawer__panel-inner' , { timeout:15000 })
		.scrollIntoView()
		.should( 'be.visible' );
	cy.get( '.nfd-onboarding-drawer__panel-back', {
		timeout: customCommandTimeout,
	} )
		.should( 'be.visible' )
		.should( 'have.text', text );
	cy.get( subMenuDrawer ).should( 'be.visible' );
	cy.get( itemClassName ).should( 'have.length', itemCount );
};
