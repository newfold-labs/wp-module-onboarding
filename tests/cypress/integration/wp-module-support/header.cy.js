// <reference types="Cypress" />

export const CheckCardHeadingSubheading = ( question = false ) => {
	cy.get( '.nfd-step-card-heading' ).scrollIntoView().should( 'be.visible' );
	if ( question ) {
		cy.get( '.nfd-step-card-subheading-other' ).should( 'be.visible' );
		cy.get( '.nfd-step-card-question' ).should( 'be.visible' );
	} else {
		cy.get( '.nfd-step-card-subheading' ).should( 'be.visible' );
	}
};

export const CheckHeadingSubheading = () => {
	cy.get( '.nfd-main-heading__title', { timeout:15000 } ).should( 'be.visible' );
	cy.get( '.nfd-main-heading__subtitle' ).should( 'be.visible' );
};
