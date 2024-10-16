const site_config_mock = require( '../../fixtures/site-config.json' );
const site_classification_mock = require( '../../fixtures/site-classification.json' );
const target_audience_mock = require( '../../fixtures/target-audience.json' );
const content_tones_mock = require( '../../fixtures/content-tones.json' );
const content_structure_mock = require( '../../fixtures/content-structure.json' );
const color_palette_mock = require( '../../fixtures/color-palette.json' );
const sitemap_mock = require( '../../fixtures/sitemap.json' );
const plugin_recommendation_mock = require( '../../fixtures/plugin-recommendation.json' );
const font_pair_mock = require( '../../fixtures/font-pair.json' );
const homepages_mock = require( '../../fixtures/homepages.json' );
const theme_style_mock = require( '../../fixtures/theme-style.json' );
const customize_data_mock = require( '../../fixtures/customize-data.json' );
const homepage_regenerate_mock = require( '../../fixtures/homepage-regenerate.json' );
const migrate_connect_mock = require( '../../fixtures/migrate-connect.json' );

export const apiList = {
	sitegen:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fsitegen%2Fgenerate&flow=sitegen&_locale=user',
	homepages:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fsitegen%2Fhomepages&flow=sitegen&_locale=user',
	homepagesRegenerate:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fsitegen%2Fhomepages%2Fregenerate&flow=sitegen&_locale=user',
	themestyle:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fthemes%2Fvariations&variations=false&flow=sitegen&_locale=user',
	customizedata:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fsitegen%2Fcustomize-data&flow=sitegen&_locale=user',
	migrateConnect:
		'/index.php?rest_route=%2Fnewfold-migration%2Fv1%2Fmigrate%2Fconnect&_locale=user',
};

export const siteGenMockAll = ( req ) => {
	const requestBody = req.body;
	const sitegen_identifiers = {
		site_config: site_config_mock,
		site_classification: site_classification_mock,
		target_audience: target_audience_mock,
		content_tones: content_tones_mock,
		content_structure: content_structure_mock,
		color_palette: color_palette_mock,
		sitemap: sitemap_mock,
		plugin_recommendation: plugin_recommendation_mock,
		font_pair: font_pair_mock,
	};

	if ( sitegen_identifiers.hasOwnProperty( requestBody.identifier ) ) {
		req.reply( {
			statusCode: 200,
			body: sitegen_identifiers[ requestBody.identifier ],
			headers: {
				'content-type': 'application/json',
			},
			delay: 3000,
		} );
	}
};

export const homePagesMock = ( req ) => {
	req.reply( {
		method: 'POST',
		statusCode: 201,
		body: homepages_mock,
		headers: {
			'content-type': 'application/json',
		},
	} );
};

export const themeStyleMock = ( req ) => {
	req.reply( {
		method: 'GET',
		statusCode: 200,
		body: theme_style_mock,
	} );
};

export const customizeDataMock = ( req ) => {
	req.reply( {
		method: 'GET',
		statusCode: 200,
		body: customize_data_mock,
		headers: {
			'content-type': 'application/json',
		},
	} );
};

export const homePagesRegenerate = ( req ) => {
	req.reply( {
		method: 'POST',
		statusCode: 200,
		body: homepage_regenerate_mock,
		headers: {
			'content-type': 'application/json',
		},
	} );
};

export const migrationConnection = ( req ) => {
	req.reply( {
		method: 'GET',
		statusCode: 200,
		body: migrate_connect_mock,
		delay: 13000,
	} );
};
