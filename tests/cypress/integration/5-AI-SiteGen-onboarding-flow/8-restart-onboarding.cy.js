// <reference types="Cypress" />

const {
	SingleEventsAPI,
} = require('../wp-module-support/single-events-track.cy');

describe('Restart Onboarding', function () {
	before(() => {
		cy.visit('wp-admin/themes.php');
		cy.wait(2000);
	});

	it('Check for the Build with AI Button', () => {
		cy.get('.theme.build-with-ai', { timeout: 30000 })
			.scrollIntoView()
			.should('be.visible');
	});

	it('Check if onboarding restarts', () => {
		cy.get('.theme.build-with-ai', { timeout: 10000 })
			.scrollIntoView()
			.click();
		cy.url().should('include', '?page=nfd-onboarding', { timeout: 10000 });
	});

	it('Check if Event triggers', () => {
		SingleEventsAPI('onboarding_restarted', 'location', 'theme');
	});
});
