import { select } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';

/**
 * Checks if the current brand has access to blueprints/templates feature.
 *
 * Only Bluehost and Bluehost India brands have access to the templates feature.
 *
 * @return {boolean} True if the brand can access blueprints, false otherwise.
 */
export const canAccessBlueprints = () => {
	const brandId = select( nfdOnboardingStore ).getBrandId();
	return brandId === 'bluehost' || brandId === 'bluehost-india';
};

/**
 * Gets the current brand identifier.
 *
 * @return {string|undefined} The brand identifier (e.g., 'bluehost', 'webcom', etc.)
 */
export const getBrandId = () => {
	return select( nfdOnboardingStore ).getBrandId();
};

