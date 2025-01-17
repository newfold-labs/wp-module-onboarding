import { TAILWINDCSS_PRESET } from "@newfold/ui-component-library";

/** @type {import('tailwindcss').Config} */
module.exports = {
	presets: [ TAILWINDCSS_PRESET ],
	content: [
		...TAILWINDCSS_PRESET.content, // Newfold UI
		"./src/**/*.js", // Onboarding
	],
}
