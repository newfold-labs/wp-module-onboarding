import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __( 'Social Media', 'wp-module-onboarding' ),
		modals: {
			shortUrl: {
				modalTitle: __(
					"It looks like you're using a URL shortener!",
					'wp-module-onboarding'
				),
				modalText: __(
					"That's smart, but we encourage you to enter the standard URL for your social profiles to help search engines know this website is associated with your profile using Yoast's Open Graph support. You can always change the URLs used within your site to trackable in the future.",
					'wp-module-onboarding'
				),
			},
			invalidUrl: {
				modalTitle: __(
					"One of those URLs doesn't look like a social media URL.",
					'wp-module-onboarding'
				),
				modalText: __(
					"We recommend using your official social URL to help search engines know this website is associated with your profile using Yoast's Open Graph support. You can always change the URLs used within your site in the future.",
					'wp-module-onboarding'
				),
			},
		},
		errorText: {
			adLinkErrorText: __(
				"That's clever! Short URLs are a great way to track clicks. However, To help build your social graph, we need the full URLs to your social profiles. You can go into your menus and change your social icon links after setup.",
				'wp-module-onboarding'
			),
			invalidLinkErrorText: __(
				'To help build your social graph, we need the full URLs to your social profiles. Please check your URLs for typos and try copy & paste with the official URL if you continue to see this error.',
				'wp-module-onboarding'
			),
		},
	};
};

export default getContents;
