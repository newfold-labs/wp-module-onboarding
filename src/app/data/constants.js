import { addQueryArgs } from '@wordpress/url';

export const wpAdminUrl = window.nfdOnboarding.runtime.adminUrl;
export const wpSiteUrl = window.nfdOnboarding.runtime.siteUrl;
export const wpRestURL = window.nfdOnboarding.runtime.restUrl;
export const aiPlatformBase = window.nfdOnboarding.runtime.aiPlatformUrl;
export const wpRestRoute = 'wp/v2';
export const onboardingRestRoute = 'newfold-onboarding/v1';
export const wpRestBase = `${ wpRestURL }/${ wpRestRoute }`;
export const onboardingRestBase = `${ wpRestURL }/${ onboardingRestRoute }`;
export const wpAdminPage = addQueryArgs(
	`${ wpAdminUrl }index.php`,
	window.nfdOnboarding.runtime.currentBrand?.dashboardRedirectParams,
);
export const pluginDashboardPage =
	addQueryArgs(
		window.nfdOnboarding.runtime.currentBrand?.pluginDashboardPage,
		window.nfdOnboarding.runtime.currentBrand?.dashboardRedirectParams,
	) ?? wpAdminPage;

/**
 *
 * PostHog constants
 *
 * This is not sensitive data and is exposed to the client.
 * It's the equivalent of a Google Analytics property ID but they call it a public API key.
 *
 * For more details or to reset the key, see:
 * https://us.posthog.com/project/234516/settings/project#snippet&selectedSetting=variables&setting=variables
 * "Write-only means it can only create new events. It can't read events or
 * any of your other data stored with PostHog, so it's safe to use in public apps."
 */
export const POSTHOG_PUBLIC = {
	// public facing api key has written only access - this is not a sensitive key
	PUBLIC_API_KEY: 'phc_6wQThygzyWKFpi6f5MItEjm4qVqcigezljk7orxhpUi',
	PUBLIC_HOST: 'https://us.i.posthog.com',
	DEFAULT_VERSION: '2025-05-24',
	CAPTURE_EXCEPTIONS: true,
};
