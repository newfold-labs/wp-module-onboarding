import { useCallback } from '@wordpress/element';
import { dispatch, useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { Container, Title, Spinner } from '@newfold/ui-component-library';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { nfdOnboardingStore } from '@/data/store';
import { Navigate, Step } from '@/components';
import { getSiteMigrateUrl, getWpSettings, updateWpSettings, migrateRestURL } from '@/utils/api';
import migrationFigureUrl from '@/assets/nfd-migration.png';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_ERROR_STATE_TRIGGERED, ACTION_MFE_MIGRATION_INITIATED, ACTION_MIGRATION_INITIATED } from '@/utils/analytics/hiive/constants';

const MigrationStep = () => {
	const [ siteMigrationApiStatus, setSiteMigrationApiStatus ] = useState( {
		isLoading: true,
		error: false,
	} );

	const { canMigrateSite, brandName } = useSelect( ( select ) => {
		return {
			canMigrateSite: select( nfdOnboardingStore ).canMigrateSite(),
			brandName: select( nfdOnboardingStore ).getBrandName(),
		};
	} );

	/**
	 * Track migration initiated event
	 *
	 * @param { string } instaWpMigrationUrl The migration url
	 * @return { Promise<void> }
	 */
	const trackMigrationInitiatedEvent = async ( instaWpMigrationUrl ) => {
		let initiationSource = null;
		const wpSettings = await getWpSettings();
		if ( wpSettings?.body?.nfd_migrate_site ) {
			initiationSource = ACTION_MFE_MIGRATION_INITIATED;
		} else {
			initiationSource = ACTION_MIGRATION_INITIATED;
		}

		/*
		Send analytics event to custom migration endpoint. This uses the application endpoint (via the worker)
		to ensure reliable event delivery The `await` ensures the request completes before navigation, preventing it from being cancelled on redirect.
		*/
		await apiFetch( {
			url: migrateRestURL( 'migrate/events' ),
			method: 'POST',
			data: {
				key: initiationSource,
				data: {
					path: instaWpMigrationUrl,
					page: window.location.href,
				},
			},
		} );
	};

	const prepareMigration = useCallback( async () => {
		try {
			if ( ! canMigrateSite ) {
				throw new Error( 'Site does not have migration capabilities' );
			}

			// Fetch migration url
			const response = await getSiteMigrateUrl();
			const migrateUrl = response?.body?.data?.redirect_url;

			// On success
			if ( migrateUrl ) {
				dispatch( nfdOnboardingStore ).setInstaWpMigrationUrl( migrateUrl );
				await trackMigrationInitiatedEvent( migrateUrl );

				await updateWpSettings( {
					nfd_migrate_site: false,
				} );

				// Open migration url (external)
				window.open( migrateUrl, '_self' );
			} else {
				throw new Error( 'Failed to fetch migration url' );
			}
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'Error:', error.message );
			// Set the error state
			setSiteMigrationApiStatus( {
				isLoading: false,
				error: true,
			} );

			// Analytics: migration error event
			trackOnboardingEvent(
				new OnboardingEvent(
					ACTION_ERROR_STATE_TRIGGERED,
					'migration',
				)
			);
		}
	}, [ canMigrateSite ] );

	useEffect( () => {
		prepareMigration();
	}, [ prepareMigration ] );

	/**
	 * @return { string } The title content
	 */
	const getTitleContent = useCallback( () => {
		return sprintf(
			/* translators: %s: to replace brand name */
			__( "Let's migrate your existing site to %s", 'wp-module-onboarding' ),
			brandName
		);
	}, [ brandName ] );

	/**
	 * Render the migration status
	 *
	 * @return {React.ReactNode} The migration status
	 */
	const renderMigrationStatus = () => {
		// On error
		if ( siteMigrationApiStatus.error ) {
			return (
				<>
					<ExclamationCircleIcon className="nfd-text-red-500 nfd-w-8 nfd-h-8" />
					<Title as="h2" className="nfd-mt-4 nfd-mb-2">
						{ __( 'Oops! Something went wrong', 'wp-module-onboarding' ) }
					</Title>
					<p>
						{ __( 'An error occurred while attempting to set up your migration account.', 'wp-module-onboarding' ) }
					</p>
					<Navigate
						toRoute="/"
						direction="backward"
						className="nfd-mt-4"
					>
						{ __( 'Try again', 'wp-module-onboarding' ) }
					</Navigate>
				</>
			);
		}

		// On loading
		return (
			<>
				<Title as="h2" className="nfd-mt-4 nfd-mb-4">
					{ __( 'Preparing your account', 'wp-module-onboarding' ) }
				</Title>
				<Spinner
					variant="primary"
					size="8"
				/>
			</>
		);
	};

	return (
		<Step>
			<Container
				className="nfd-onboarding-step-container nfd-onboarding-step-migration"
			>
				<Container.Header
					title={ getTitleContent() }
					description={ __( 'Please wait a few seconds while we get your new account ready to import your existing WordPress site.', 'wp-module-onboarding' ) }
				/>
				<Container.Block>
					<div className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-14 nfd-text-center nfd-text-content-primary">
						<img
							src={ migrationFigureUrl }
							alt={ __( 'Migration Figure', 'wp-module-onboarding' ) }
							width="325"
						/>
						<div className="nfd-flex nfd-flex-col nfd-items-center">
							{ renderMigrationStatus() }
						</div>
					</div>
				</Container.Block>
			</Container>
		</Step>
	);
};

export default MigrationStep;
