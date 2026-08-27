const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/jest-unit.config.js' );

/**
 * Jest config for the onboarding SPA (JS unit/integration tests).
 *
 * Extends @wordpress/scripts' default unit preset and teaches it the same
 * "@/" -> src/app alias the webpack build uses.
 */
module.exports = {
	...defaultConfig,
	rootDir: path.resolve( __dirname ),
	moduleNameMapper: {
		...( defaultConfig.moduleNameMapper || {} ),
		'^@/(.*)$': '<rootDir>/src/app/$1',
	},
};
