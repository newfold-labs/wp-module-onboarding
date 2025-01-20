const path = require( 'path' );
const { merge } = require( 'webpack-merge' );
const wpScriptsConfig = require( '@wordpress/scripts/config/webpack.config' );
const version = require( './package.json' ).version; // never require full config!

/**
 * Aliases for resolving Brand imports
 */
const alias = {
	'@': path.resolve( __dirname, '/src/app/' ),
};

const nfdOnboardingWebpackConfig = {
	output: {
		path: path.resolve( process.cwd(), `build/${ version }` ),
		library: [ 'newfold', 'Onboarding', '[name]' ],
		libraryTarget: 'window',
	},
	resolve: { alias },
};

module.exports = merge( wpScriptsConfig, nfdOnboardingWebpackConfig );
