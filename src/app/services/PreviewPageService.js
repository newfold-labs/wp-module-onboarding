import { nfdOnboardingStore } from '@/data/store';
import { getSiteGenPreviewSnapshot } from '@/utils/api';
import { dispatch } from '@wordpress/data';

class PreviewPageService {
	constructor( sitekit, colors ) {
		this.sitekit = this.parseSitekit( sitekit );
		this.siteColors = this.parseSiteColors( colors );
	}

	parseSitekit( sitekit ) {
		const headerPattern = sitekit.sitekits[ 0 ].header.patternContent;
		const footerPattern = sitekit.sitekits[ 0 ].footer.patternContent;
		const homePagePatterns = sitekit.sitekits[ 0 ].pages.home;

		// loop through homePagePatterns and combine them into a single string
		let homePageContent = '';
		homePagePatterns.forEach( ( pattern ) => {
			homePageContent += pattern.patternContent;
		} );

		const content = headerPattern + homePageContent + footerPattern;
		return content;
	}

	parseSiteColors( colors ) {
		let customStyles = ':root {';

		const colorPalette = colors[ 0 ];
		if ( colorPalette && typeof colorPalette === 'object' ) {
			Object.entries( colorPalette ).forEach( ( [ slug, color ] ) => {
				customStyles += `--wp--preset--color--${ slug.replace( /_/g, '-' ) }: ${ color } !important;`;
			} );
		}

		customStyles += '}';
		return customStyles;
	}

	async createPreviewPage() {
		const response = await getSiteGenPreviewSnapshot(
			this.sitekit,
			'bluehost-ai-preview',
			this.siteColors
		);

		const { post_id: postId, post_url: iframeSrc } = response.body;

		dispatch( nfdOnboardingStore ).setPreview( {
			postId,
			iframeSrc,
		} );

		return true;
	}
}

export default PreviewPageService;
