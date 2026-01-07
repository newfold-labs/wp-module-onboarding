import { __ } from '@wordpress/i18n';
import { select, useSelect } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { Link } from '@newfold/ui-component-library';
import { pluginDashboardPage } from '@/data/constants';

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

/**
 * Dashboard Link Component
 * Returns JSX for the dashboard link based on conditions.
 *
 * @return {JSX.Element|null} Dashboard link or null
 */
export const DashboardLink = () => {
	const { sitegenHasFailed } = useSelect( ( selects ) => ( {
		sitegenHasFailed: selects( nfdOnboardingStore ).getSitegenHasFailed(),
	} ), [] );

	if ( canAccessBlueprints() || ! sitegenHasFailed ) {
		return null;
	}

	return (
		<div className="nfd-flex nfd-justify-center nfd-py-[10px]">
			<Link
				as="button"
				onClick={ () => window.location.href = pluginDashboardPage }
			>
				{ __( 'Go to Dashboard' ) }
			</Link>
		</div>
	);
};
