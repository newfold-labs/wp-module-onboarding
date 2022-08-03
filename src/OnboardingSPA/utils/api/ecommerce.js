import apiFetch from '@wordpress/api-fetch';

export async function updateWCOptions(options) {
	return apiFetch({ path: '/wp/v2/settings', method: 'POST', data: options });
}

export async function fetchWCCountries() {
	return apiFetch({ path: '/wc/v3/data/countries' });
}

export async function fetchWCOnboarding() {
	return apiFetch({ path: '/wc-admin/onboarding/tasks?ids=setup' });
}

export async function updateWCOnboarding(profile) {
	return apiFetch({
		path: '/wc-admin/onboarding/profile',
		method: 'POST',
		data: profile,
	});
}

export async function installYithPlugin(pluginName) {
	return apiFetch({
		path: '/newfold-ecommerce/v1/plugins/install',
		method: 'POST',
		data: { plugin: pluginName },
	});
}
