const wordpressPrettierConfig = require( '@wordpress/prettier-config' );

module.exports = {
	...wordpressPrettierConfig,
	printWidth: 100, // Default print width for all files. Override if needed.
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'es5',\
	overrides: [
		{
			files: '*.css',
			options: {
				printWidth: 160,
			},
		},
	],
};
