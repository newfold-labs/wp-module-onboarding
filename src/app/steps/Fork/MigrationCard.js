import { useNavigate } from 'react-router-dom';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import ActionCard from '@/components/ActionCard/ActionCard';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_FORK_OPTION_SELECTED } from '@/utils/analytics/hiive/constants';

const MigrationCard = ( {
	canMigrateSite,
	migrationFallbackUrl = '',
	...props
} ) => {
	const navigate = useNavigate(); // Router navigate.

	const handleAction = () => {
		if ( canMigrateSite ) {
			navigate( '/migration', {
				state: { direction: 'forward' },
				replace: false,
			} );
		} else if ( migrationFallbackUrl ) {
			window.open( migrationFallbackUrl, '_blank' );
		}
		// Analytics: migration fork option selected event
		trackOnboardingEvent(
			new OnboardingEvent(
				ACTION_FORK_OPTION_SELECTED,
				'MIGRATE'
			)
		);
	};

	return (
		<ActionCard
			onClick={ handleAction }
			{ ...props }
		>
			<div className="nfd-flex nfd-items-center nfd-justify-center nfd-text-center nfd-gap-3">
				<ArrowsRightLeftIcon className="nfd-w-6 nfd-h-6 nfd-text-black" />
				<span className="!nfd-text-xl nfd-font-medium nfd-text-black">
					{ __( 'Import an Existing WordPress Site', 'wp-module-onboarding' ) }
				</span>
			</div>
		</ActionCard>
	);
};

export default MigrationCard;
