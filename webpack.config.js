const path = require( 'path' );
const { merge } = require( 'webpack-merge' );
const wpScriptsConfig = require( '@wordpress/scripts/config/webpack.config' );
const { ProvidePlugin, DefinePlugin } = require( 'webpack' );
const version = require( './package.json' ).version; // never require full config!

// Load environment variables from .env file
require( 'dotenv' ).config();

/**
 * Aliases for resolving Brand imports
 */
const alias = {
	'@': path.resolve( __dirname, '/src/app/' ),
};

/**
 * Make most-common imports available globally.
 * (Instead of import { useEffect } from '@wordpress/element' in every file)
 */
const mostCommonImports = {
	useState: [ 'react', 'useState' ],
	useEffect: [ 'react', 'useEffect' ],
	useContext: [ 'react', 'useContext' ],
	useLocation: [ 'react-router-dom', 'useLocation' ],
	useNavigate: [ 'react-router-dom', 'useNavigate' ],
	__: [ '@wordpress/i18n', '__' ],
	_n: [ '@wordpress/i18n', '_n' ],
	sprintf: [ '@wordpress/i18n', 'sprintf' ],
};

const nfdOnboardingWebpackConfig = {
	output: {
		path: path.resolve( process.cwd(), `build/${ version }` ),
		library: [ 'newfold', 'Onboarding', '[name]' ],
		libraryTarget: 'window',
	},
	resolve: { alias },
	plugins: [
		new ProvidePlugin( mostCommonImports ),
		new DefinePlugin( {
			'process.env.POSTHOG_PUBLIC_API_KEY': JSON.stringify( process.env.POSTHOG_PUBLIC_API_KEY || '' ),
			'process.env.POSTHOG_PUBLIC_HOST': JSON.stringify( process.env.POSTHOG_PUBLIC_HOST || 'https://us.i.posthog.com' ),
		} ),
	],
};

module.exports = merge( wpScriptsConfig, nfdOnboardingWebpackConfig );
