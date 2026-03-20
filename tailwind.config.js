import { TAILWINDCSS_PRESET } from '@newfold/ui-component-library';

/** @type {import('tailwindcss').Config} */
module.exports = {
	presets: [ TAILWINDCSS_PRESET ],
	content: [
		...TAILWINDCSS_PRESET.content, // Newfold UI
		'./src/**/*.{js,jsx}', // Onboarding
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
					default: '#030303',
					primary: '#1E1E1E',
					placeholder: '#B3BCC7',
				},
			},
			screens: {
				// Mobile breakpoints
				mobile: { max: '600px' },
				'mobile-sm': { max: '480px' },

				// Tablet breakpoints
				tablet: { max: '1024px' },
				'tablet-lg': { max: '1366px' },

				// Desktop breakpoints based on uploaded image resolutions
				'desktop-sm': { min: '1280px' },
				'desktop-md': { min: '1367px' },
				'desktop-lg': { min: '1441px' },
				'desktop-xl': { min: '1537px' },
				'desktop-2xl': { min: '1921px' },
				'desktop-3xl': { min: '2561px' },

				// Legacy breakpoints for backward compatibility
				small: { max: '1280px' },
				'small-only': { min: '1024px', max: '1280px' },
			},
		},
	},
};
