/**
 * WordPress dependencies
 */
import { useCallback, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { dispatch, useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

/**
 * External dependencies
 */
import { motion } from 'motion/react';
import { AlertCircle, ArrowLeft } from 'lucide-react';

/**
 * Internal dependencies
 */
import { nfdOnboardingStore } from '@/data/store';
import { getSiteMigrateUrl, migrateRestURL, getWpSettings } from '@/utils/api';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import {
	ACTION_MIGRATION_INITIATED,
	ACTION_MFE_MIGRATION_INITIATED,
	ACTION_ERROR_STATE_TRIGGERED,
} from '@/utils/analytics/hiive/constants';

const MigrationView = ( { onBack } ) => {
	const [ status, setStatus ] = useState( {
		isLoading: true,
		error: false,
	} );

	const { canMigrateSite, brandName } = useSelect( ( select ) => ( {
		canMigrateSite: select( nfdOnboardingStore ).canMigrateSite(),
		brandName: select( nfdOnboardingStore ).getBrandName(),
	} ) );

	const trackMigrationInitiatedEvent = useCallback( async ( instaWpMigrationUrl ) => {
		let initiationSource;
		try {
			const wpSettings = await getWpSettings();
			initiationSource = wpSettings?.body?.nfd_migrate_site
				? ACTION_MFE_MIGRATION_INITIATED
				: ACTION_MIGRATION_INITIATED;
		} catch {
			initiationSource = ACTION_MIGRATION_INITIATED;
		}

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
	}, [] );

	const prepareMigration = useCallback( async () => {
		try {
			if ( ! canMigrateSite ) {
				throw new Error( 'Site does not have migration capabilities' );
			}

			const response = await getSiteMigrateUrl();
			const migrateUrl = response?.body?.data?.redirect_url;

			if ( migrateUrl ) {
				dispatch( nfdOnboardingStore ).setInstaWpMigrationUrl( migrateUrl );
				await trackMigrationInitiatedEvent( migrateUrl );

				const finalUrl = window?.NewfoldRuntime?.linkTracker?.addUtmParams( migrateUrl ) || migrateUrl;
				window.open( finalUrl, '_self' );
			} else {
				throw new Error( 'Failed to fetch migration url' );
			}
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'Migration error:', error.message );
			setStatus( { isLoading: false, error: true } );

			sendOnboardingEvent(
				new OnboardingEvent( ACTION_ERROR_STATE_TRIGGERED, 'migration' )
			);
		}
	}, [ canMigrateSite, trackMigrationInitiatedEvent ] );

	useEffect( () => {
		prepareMigration();
	}, [ prepareMigration ] );

	const title = brandName
		? __( "Let's migrate your existing site to %s", 'wp-module-onboarding' ).replace( '%s', brandName )
		: __( "Let's migrate your existing site", 'wp-module-onboarding' );

	return (
		<motion.div
			key="migration"
			initial={ { opacity: 0, y: 0 } }
			animate={ { opacity: 1, y: 0 } }
			exit={ { opacity: 0, y: -20 } }
			transition={ { duration: 0.35, ease: 'easeInOut' } }
			className="nfd-flex nfd-flex-1 nfd-flex-col nfd-items-center nfd-justify-center nfd-px-6 nfd-pb-10"
		>
			<div className="nfd-flex nfd-flex-col nfd-items-center nfd-text-center nfd-max-w-lg nfd-gap-8">
				<div>
					<h1 className="nfd-text-3xl nfd-font-normal nfd-leading-10 nfd-text-[rgb(31,31,31)] [-webkit-font-smoothing:antialiased] nfd-m-0 nfd-mb-3">
						{ title }
					</h1>
					<p className="nfd-text-lg nfd-font-normal nfd-leading-7 nfd-text-[rgb(95,99,104)] [-webkit-font-smoothing:antialiased] nfd-m-0">
						{ __( 'Please wait a few seconds while we get your new account ready to import your existing WordPress site.', 'wp-module-onboarding' ) }
					</p>
				</div>

				<div className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-4">
					{ status.error ? (
						<>
							<AlertCircle className="nfd-w-10 nfd-h-10 nfd-text-red-500" />
							<div className="nfd-text-center">
								<h2 className="nfd-text-xl nfd-font-medium nfd-text-[rgb(31,31,31)] nfd-m-0 nfd-mb-2">
									{ __( 'Oops! Something went wrong', 'wp-module-onboarding' ) }
								</h2>
								<p className="nfd-text-base nfd-text-[rgb(95,99,104)] nfd-m-0">
									{ __( 'An error occurred while attempting to set up your migration account.', 'wp-module-onboarding' ) }
								</p>
							</div>
							<button
								onClick={ onBack }
								className="nfd-flex nfd-items-center nfd-gap-2 nfd-mt-4 nfd-px-5 nfd-py-2.5 nfd-text-base nfd-font-medium nfd-text-primary nfd-bg-transparent nfd-border nfd-border-solid nfd-border-primary nfd-rounded-full nfd-cursor-pointer nfd-transition-colors hover:nfd-bg-blue-50"
							>
								<ArrowLeft size={ 18 } />
								{ __( 'Try again', 'wp-module-onboarding' ) }
							</button>
						</>
					) : (
						<>
							<h2 className="nfd-text-xl nfd-font-medium nfd-text-[rgb(31,31,31)] nfd-m-0">
								{ __( 'Preparing your account', 'wp-module-onboarding' ) }
							</h2>
							<div className="nfd-w-8 nfd-h-8 nfd-border-3 nfd-border-solid nfd-border-blue-200 nfd-border-t-primary nfd-rounded-full nfd-animate-spin" />
						</>
					) }
				</div>
			</div>
		</motion.div>
	);
};

export default MigrationView;
