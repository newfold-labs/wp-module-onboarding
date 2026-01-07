/**
 * Checks if the current brand has access to blueprints/templates feature.
 *
 * Only Bluehost and Bluehost India brands have access to the templates feature.
 *
 * @return {boolean} True if the brand can access blueprints, false otherwise.
 */
export const canAccessBlueprints = () => {
	const brandId = window.nfdOnboarding?.runtime?.currentBrand?.brand;
	return brandId === 'bluehost' || brandId === 'bluehost-india';
};

/**
 * Gets the current brand identifier.
 *
 * @return {string|undefined} The brand identifier (e.g., 'bluehost', 'webcom', etc.)
 */
export const getBrandId = () => {
	return window.nfdOnboarding?.runtime?.currentBrand?.brand;
};

