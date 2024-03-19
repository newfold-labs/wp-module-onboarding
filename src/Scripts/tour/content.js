import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		steps: [
			{
				title: __( 'Welcome to WordPress' ),
				content: __(
					'Take a moment to click through some features and tools that you may find useful in your next steps.'
				),
				stepTargetClassName: null,
				image: 'welcome',
			},
			{
				title: __( 'Introducing WonderBlocks' ),
				content: __(
					'Enhance your page designs with our custom pre-built patterns and templates.'
				),
				stepTargetClassName: __( 'nfd-wba-shrink-0' ),
                image: 'wonderblocks',
			},
			{
				title: __( 'Ready to share your website?' ),
				content: __(
					'Click the "Publish" button to save changes and publish content to your live website.'
				),
				stepTargetClassName: __( 'editor-post-publish-button' ),
                image: 'publish',
			},
			{
				title: __( 'Exiting the WordPress Editor' ),
				content: __(
					'Return to the WordPress admin area anytime by clicking the WordPress "W" icon.'
				),
				stepTargetClassName: __( 'edit-post-fullscreen-mode-close' ),
                image: 'wp',
			},
		],
	};
};
export default getContents;
