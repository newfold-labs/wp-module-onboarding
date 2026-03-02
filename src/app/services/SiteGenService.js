import { dispatch, resolveSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { nfdOnboardingStore } from '@/data/store';
import { AiPlatformService, PreviewPageService } from '@/services';
import { installSiteTypeRequiredPlugins, setSiteLogo } from '@/utils/api/onboarding';

class SiteGenService {
	static eventHandlersMap = {
		sitegen_discovery_site_type_completed: this.handleSiteTypeCompleted.bind( this ),
		sitegen_discovery_completed: this.handleSiteDiscoveryCompleted.bind( this ),
		sitegen_content_generation_completed: this.handleContentGenerationCompleted.bind( this ),
	};

	static async generate() {
		AiPlatformService.generateSite( {
			onEvent: ( response ) => {
				this.handleEvent( response );
			},
			onError: ( error ) => {
				console.log( error );
			},
			onClose: () => {
				console.log( 'close' );
			},
		} );
	}

	static async handleEvent( response ) {
		const { event, data } = response;
		const handler = this.eventHandlersMap[ event ];

		if ( handler ) {
			handler( data );
		}
	}

	static async handleSiteTypeCompleted( data ) {
		const { site_type: siteType } = JSON.parse( data );
		dispatch( nfdOnboardingStore ).setSiteType( siteType );
		installSiteTypeRequiredPlugins( siteType );
		dispatch( nfdOnboardingStore ).setIsSiteTypeRequiredPluginsInstalled( true );
	}

	static handleSiteDiscoveryCompleted( data ) {
		const discoveryData = JSON.parse( data );
		const {
			site_brand_identity: siteBrandIdentity,
			site_map: siteMap,
		} = discoveryData;

		if (
			siteBrandIdentity &&
			typeof siteBrandIdentity === 'object' &&
			Object.keys( siteBrandIdentity ).length > 0
		) {
			// Set WordPress site title and tagline
			if ( siteBrandIdentity.site_title ) {
				this.setSiteTitle( siteBrandIdentity.site_title );
			}
			if ( siteBrandIdentity.tagline ) {
				this.setSiteTagline( siteBrandIdentity.site_tagline );
			}
		}

		if (
			siteMap &&
			typeof siteMap === 'object' &&
			Object.keys( siteMap ).length > 0
		) {
			dispatch( nfdOnboardingStore ).setSitemap( siteMap );
		}
	}

	static async handleContentGenerationCompleted( data ) {
		const contentGenerationData = JSON.parse( data );

		console.log( contentGenerationData );

		const {
			site_kit: sitekit,
			site_colors: siteColors,
			site_logo: siteLogo,
		} = contentGenerationData;

		// publish preview page
		const previewPage = new PreviewPageService( sitekit, siteColors );
		await previewPage.createPreviewPage();

		// create fake sitenav

		// set site logo
		await setSiteLogo( siteLogo.logo_url );
	}

	static async setSiteTitle( title ) {
		// Ensure the site entity is loaded.
		await resolveSelect( coreStore ).getEntityRecord( 'root', 'site' );
		// Change site title.
		dispatch( coreStore ).editEntityRecord( 'root', 'site', undefined, {
			title,
		} );
		dispatch( coreStore ).saveEditedEntityRecord( 'root', 'site' );
	}

	static async setSiteTagline( tagline ) {
		// Ensure the site entity is loaded.
		await resolveSelect( coreStore ).getEntityRecord( 'root', 'site' );
		// Change site tagline.
		dispatch( coreStore ).editEntityRecord( 'root', 'site', undefined, {
			description: tagline,
		} );
		dispatch( coreStore ).saveEditedEntityRecord( 'root', 'site' );
	}
}

export default SiteGenService;
