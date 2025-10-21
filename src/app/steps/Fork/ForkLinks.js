import { useSelect } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { nfdOnboardingStore } from '@/data/store';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_FORK_OPTION_SELECTED } from '@/utils/analytics/hiive/constants';
import { ActionCard } from '@/components';

const ForkLinks = () => {
	const { canMigrateSite, migrationFallbackUrl } = useSelect( ( select ) => {
		return {
			canMigrateSite: select( nfdOnboardingStore ).canMigrateSite(),
			migrationFallbackUrl: select( nfdOnboardingStore ).getMigrationFallbackUrl(),
		};
	} );
	const navigate = useNavigate();

	const MigrationLink = () => {
		const handleClick = ( e ) => {
			e.preventDefault();
			if ( canMigrateSite ) {
				navigate( '/migration', {
					state: { direction: 'forward' },
					replace: false,
				} );
			} else if ( migrationFallbackUrl ) {
				window.open( migrationFallbackUrl, '_blank' );
			}
			// Analytics: migration fork option selected event
			sendOnboardingEvent( new OnboardingEvent( ACTION_FORK_OPTION_SELECTED, 'MIGRATE' ) );
		};

		if ( canMigrateSite || migrationFallbackUrl ) {
			return (
				<ActionCard
					onClick={ handleClick }
					href={ migrationFallbackUrl || '#' }
					className="nfd-flex nfd-items-center nfd-justify-center nfd-gap-2 nfd-text-center nfd-text-base nfd-text-content-default nfd-bg-transparent nfd-py-3 nfd-px-12 nfd-border-2 nfd-border-gray-800 nfd-rounded-md hover:nfd-bg-primary-100 nfd-font-semibold"
				>
					<ArrowsRightLeftIcon className="nfd-w-[18px] nfd-h-[18px]" />
					<span>{ __( 'Migrate an existing site', 'wp-module-onboarding' ) }</span>
				</ActionCard>
			);
		}
	};

	return (
		<div className="nfd-flex nfd-flex-col nfd-items-center">
			<MigrationLink />
		</div>
	);
};

export default ForkLinks;
