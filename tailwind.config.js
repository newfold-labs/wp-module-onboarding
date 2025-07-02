import { TAILWINDCSS_PRESET } from '@newfold/ui-component-library';

/** @type {import('tailwindcss').Config} */
module.exports = {
	presets: [ TAILWINDCSS_PRESET ],
	content: [
		...TAILWINDCSS_PRESET.content, // Newfold UI
		'./src/**/*.js', // Onboarding
	],
	// Override preset theme colors
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#196BDE',
					50: '#F5F9FE',
					100: '#E6F0FD',
					200: '#C5DCFB',
					300: '#93BDF7',
					400: '#4E94EE',
					500: '#196BDE',
					600: '#1259BC',
					700: '#0C479A',
					800: '#083577',
					900: '#052455',
				},
				content: {
					primary: '#1E1E1E',
					placeholder: '#B3BCC7',
				},
			},
		},
	},
};
