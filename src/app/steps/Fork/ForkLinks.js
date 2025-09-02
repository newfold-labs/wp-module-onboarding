import { useSelect } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { Link, Title } from '@newfold/ui-component-library';
import { ArrowsRightLeftIcon, ServerStackIcon } from '@heroicons/react/24/outline';
import { nfdOnboardingStore } from '@/data/store';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_FORK_OPTION_SELECTED } from '@/utils/analytics/hiive/constants';

const ForkLinks = () => {
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
			// Analytics: migration fork option selected event
			trackOnboardingEvent(
				new OnboardingEvent(
					ACTION_FORK_OPTION_SELECTED,
					'MIGRATE'
				)
			);
		};

		if ( canMigrateSite || migrationFallbackUrl ) {
			return (
				<Link
					onClick={ handleClick }
					href={ migrationFallbackUrl || '#' }
					className="nfd-text-tiny nfd-text-content-default nfd-no-underline nfd-inline-flex nfd-gap-2 nfd-items-center focus:nfd-ring-primary nfd-cursor-pointer"
				>
					<ArrowsRightLeftIcon className="nfd-w-4 nfd-h-4" />
					<span>
						{ __( 'Migrate your site', 'wp-module-onboarding' ) }
					</span>
				</Link>
			);
		}
	};

	const HostingLink = () => {
		return (
			<Link
				href="https://www.bluehost.com/my-account"
				target="_blank"
				className="nfd-text-tiny nfd-text-content-default nfd-no-underline nfd-inline-flex nfd-gap-2 nfd-items-center focus:nfd-ring-primary nfd-cursor-pointer"
			>
				<ServerStackIcon className="nfd-w-4 nfd-h-4" />
				<span>
					{ __( 'Access to your Hosting panel', 'wp-module-onboarding' ) }
				</span>
			</Link>
		);
	};

	return (
		<div className="nfd-flex nfd-flex-col nfd-gap-2.5">
			<Title
				as="h4"
				className="nfd-text-tiny nfd-text-content-default nfd-font-bold nfd-mb-1.5"
			>
				{ __( 'Skip to:', 'wp-module-onboarding' ) }
			</Title>
			<ul>
				<li><MigrationLink /></li>
				<li><HostingLink /></li>
			</ul>
		</div>
	);
};

export default ForkLinks;
