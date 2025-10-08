import { useSelect } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { nfdOnboardingStore } from '@/data/store';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_FORK_OPTION_SELECTED } from '@/utils/analytics/hiive/constants';
import { ActionCard } from '@/components';

const ForkLinks = ( { variant } ) => {
	const { canMigrateSite, migrationFallbackUrl } = useSelect(
		( select ) => {
			return {
				canMigrateSite: select( nfdOnboardingStore ).canMigrateSite(),
				migrationFallbackUrl: select( nfdOnboardingStore ).getMigrationFallbackUrl(),
			};
		}
	);
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
			// Analytics: migration fork option selected event with variant info
			sendOnboardingEvent(
				new OnboardingEvent(
					ACTION_FORK_OPTION_SELECTED,
					`MIGRATE|variant_${ variant }`
				)
			);
		};

		if ( canMigrateSite || migrationFallbackUrl ) {
			return (
				<ActionCard
					onClick={ handleClick }
					href={ migrationFallbackUrl || '#' }
					className="nfd-w-full nfd-max-w-[780px] nfd-flex nfd-items-center nfd-justify-center nfd-gap-2 nfd-text-center nfd-text-base nfd-text-content-default nfd-bg-transparent nfd-py-3 nfd-px-6 nfd-border nfd-border-primary nfd-rounded-xl hover:nfd-bg-primary-100"
				>
					<ArrowsRightLeftIcon className="nfd-w-[18px] nfd-h-[18px]" />
					<span>
						{ __( 'Migrate an existing site', 'wp-module-onboarding' ) }
					</span>
				</ActionCard>
			);
		}
	};

	const handleWPAdmin = ( e ) => {
		e.preventDefault();
		sendOnboardingEvent(
			new OnboardingEvent(
				ACTION_FORK_OPTION_SELECTED,
				`WP_ADMIN|variant_${ variant }`
			)
		);
		window.location.href = window.nfdOnboarding?.adminUrl || '/wp-admin';
	};

	const handleHostingPanel = ( e ) => {
		e.preventDefault();
		sendOnboardingEvent(
			new OnboardingEvent(
				ACTION_FORK_OPTION_SELECTED,
				`HOSTING_PANEL|variant_${ variant }`
			)
		);
		window.open( window.nfdOnboarding?.hostingPanelUrl || 'https://my.bluehost.com', '_blank' );
	};

	return (
		<div className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-4">
			<MigrationLink />
			<div className="nfd-flex nfd-items-center nfd-gap-4 mobile:nfd-flex-col mobile:nfd-gap-2">
				<span className="nfd-text-content-default">
					{ __( "I'm an expert, ", 'wp-module-onboarding' ) }
					<a
						href="#"
						onClick={ handleWPAdmin }
						className="nfd-text-primary nfd-no-underline"
					>
						{ __( 'take me to the WP Admin', 'wp-module-onboarding' ) }
					</a>
				</span>
				<span className="nfd-text-content-default mobile:nfd-hidden">|</span>
				<span className="nfd-text-content-default">
					{ __( 'Go to ', 'wp-module-onboarding' ) }
					<a
						href="#"
						onClick={ handleHostingPanel }
						className="nfd-text-primary nfd-no-underline"
					>
						{ __( 'Hosting Panel', 'wp-module-onboarding' ) }
					</a>
				</span>
			</div>
		</div>
	);
};

export default ForkLinks;
