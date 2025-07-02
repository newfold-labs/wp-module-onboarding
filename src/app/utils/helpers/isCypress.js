/**
 * Checks if the code is running in a Cypress test environment.
 */
function isCypress() {
	return !! window.Cypress;
}

export default isCypress;
