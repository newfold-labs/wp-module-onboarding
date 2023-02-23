const restrictedImports = [
	{
		name: 'framer-motion',
		message:
			'Please use the Framer Motion API through `@wordpress/components` instead.',
	},
	{
		name: 'lodash',
        // [TODO] Update this list as we start moving away from lodash.
		importNames: [
            'memoize'
		],
		message:
			'This Lodash method is not recommended. Please use native functionality instead. If using `memoize`, please use `memize` instead.',
	},
	{
		name: 'reakit',
		message:
			'Please use Reakit API through `@wordpress/components` instead.',
	},
	{
		name: 'redux',
		importNames: [ 'combineReducers' ],
		message: 'Please use `combineReducers` from `@wordpress/data` instead.',
	},
	{
		name: 'puppeteer-testing-library',
		message: '`puppeteer-testing-library` is still experimental.',
	},
	{
		name: '@emotion/css',
		message:
			'Please use `@emotion/react` and `@emotion/styled` in order to maintain iframe support. As a replacement for the `cx` function, please use the `useCx` hook defined in `@wordpress/components` instead.',
	},
	{
		name: '@wordpress/edit-post',
		message:
			"edit-post is a WordPress top level package that shouldn't be imported into other packages",
	},
	{
		name: '@wordpress/edit-site',
		message:
			"edit-site is a WordPress top level package that shouldn't be imported into other packages",
	},
	{
		name: '@wordpress/edit-widgets',
		message:
			"edit-widgets is a WordPress top level package that shouldn't be imported into other packages",
	},
];

module.exports = {
    root: true,
    extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
	],
    rules: {
        'no-restricted-imports': [
			'error',
			{
				paths: restrictedImports,
			},
		],
    }
}
