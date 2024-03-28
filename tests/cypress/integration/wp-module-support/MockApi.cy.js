const site_config_mock = require( '../../fixtures/site-config.json' );
const site_classification_mock = require( '../../fixtures/site-classification.json' );
const target_audience_mock = require( '../../fixtures/target-audience.json' );
const content_tones_mock = require( '../../fixtures/content-structure.json' );
const content_structure_mock = require( '../../fixtures/content-structure.json' );
const color_palette_mock = require( '../../fixtures/color-palette.json' );
const sitemap_mock = require( '../../fixtures/sitemap.json' );
const plugin_recommendation_mock = require( '../../fixtures/plugin-recommendation.json' );
const font_pair_mock = require( '../../fixtures/font-pair.json' );
const homepages_mock = require( '../../fixtures/homepages.json' );

export const apiList = {
	sitegen:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fsitegen%2Fgenerate&flow=sitegen&_locale=user',
	homepages:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fsitegen%2Fhomepages&flow=sitegen&_locale=user',
};

export const siteGenMockAll = ( req ) => {
	const requestBody = req.body;
	const sitegen_identifiers = [
		'site_config',
		'site_classification',
		'target_audience',
		'content_tones',
		'content_structure',
		'color_palette',
		'sitemap',
		'plugin_recommendation',
		'font_pair',
	];
	const siteGenFixtures = [
		site_config_mock,
		site_classification_mock,
		target_audience_mock,
		content_tones_mock,
		content_structure_mock,
		color_palette_mock,
		sitemap_mock,
		plugin_recommendation_mock,
		font_pair_mock,
	];

	sitegen_identifiers.forEach( ( identifierKey, index ) => {
		if (
			requestBody.hasOwnProperty( 'identifier' ) &&
			requestBody.identifier == identifierKey
		) {
			req.reply( {
				statusCode: 200,
				body: siteGenFixtures[ index ],
				headers: {
					'content-type': 'application/json',
				},
			} );
		}
	} );
};

export const homePagesMock = ( req ) => {
	req.reply( {
		statusCode: 200,
		body: homepages_mock,
		headers: {
			'content-type': 'application/json',
		},
	} );
};
