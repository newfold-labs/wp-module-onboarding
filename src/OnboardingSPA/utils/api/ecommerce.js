import apiFetch from "@wordpress/api-fetch";

export async function updateWCOptions(options) {
	return apiFetch({ path: "/wc-admin/options", method: "POST", data: options });
}

export async function updateWCOnboarding(profile) {
	return apiFetch({
		path: "/wc-admin/onboarding/profile",
		method: "POST",
		data: profile,
	});
}

export async function installYithPlugin(pluginName) {
	return apiFetch({
		path: "/newfold-ecommerce/v1/plugins/install",
		method: "POST",
		data: { plugin: pluginName },
	});
}
