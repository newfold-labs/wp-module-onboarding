import { select, dispatch } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { getLogogenStatus } from '@/utils/api/onboarding';
import { LOGOGEN_PENDING_STATES, LOGOGEN_STATES } from '@/utils/logogen';

const checkAgain = () => {
	setTimeout( checkLogogenStatus, 4000 );
};

const handleReceivedStatus = () => {
	checkAgain();
};

const handleGeneratingStatus = ( logos ) => {
	// Validate we have logos in received status to update
	const logosInReceivedStatus = logos.filter( ( logo ) => logo.status === LOGOGEN_STATES.RECEIVED );
	if ( logosInReceivedStatus.length > 0 ) {
		const updatedLogos = logos.map( ( logo ) => {
			// If the logo is in received status, update it
			if ( logo.status === LOGOGEN_STATES.RECEIVED ) {
				return { ...logo, status: LOGOGEN_STATES.GENERATING };
			}

			// If the logo is not in received status, return it
			return logo;
		} );

		// Update the store
		dispatch( nfdOnboardingStore ).setLogos( updatedLogos );
	}

	checkAgain();
};

const handleFailedStatus = ( logos ) => {
	// Validate we have logos in pending status to update
	const logosInPendingStatus = logos.filter( ( logo ) => LOGOGEN_PENDING_STATES.includes( logo.status ) );
	if ( logosInPendingStatus.length > 0 ) {
		const updatedLogos = logos.map( ( logo ) => {
			// If the logo is in pending status, update it
			if ( LOGOGEN_PENDING_STATES.includes( logo.status ) ) {
				return { ...logo, status: LOGOGEN_STATES.FAILED };
			}

			// If the logo is not in pending status, return it
			return logo;
		} );

		// Update the store
		dispatch( nfdOnboardingStore ).setLogos( updatedLogos );
	}
};

const handleCompletedStatus = ( logos, generatedLogos ) => {
	// Get logos that already have a reference id (completed logos)
	const logosWithReferenceId = logos.filter( ( logo ) => logo.reference_id );
	// Remove their matches from the generated logos
	const filteredGeneratedLogos = generatedLogos.filter( ( logo ) => ! logosWithReferenceId.includes( logo ) );

	// Validate we have logos in pending status to update
	const logosInPendingStatus = logos.filter( ( logo ) => LOGOGEN_PENDING_STATES.includes( logo.status ) );
	if ( logosInPendingStatus.length > 0 ) {
		const updatedLogos = logos.map( ( logo, index ) => {
			// If the logo is in pending status, update it
			if ( LOGOGEN_PENDING_STATES.includes( logo.status ) ) {
				/**
				 * Assign a generated logo to a pending logo
				 * If the generated logos are not enough, the remaining pending logos will be set to failed
				 */
				const generatedLogo = filteredGeneratedLogos[ index ] ?? null;
				return {
					status: generatedLogo ? LOGOGEN_STATES.COMPLETED : LOGOGEN_STATES.FAILED,
					reference_id: generatedLogo ? generatedLogo.reference_id : null,
					styles: generatedLogo ? generatedLogo.styles : null,
					src: generatedLogo ? generatedLogo.url : null,
					selected_src: null,
				};
			}

			// If the logo is not in pending status, return it
			return logo;
		} );

		// Update the store
		dispatch( nfdOnboardingStore ).setLogos( updatedLogos );
	}
};

const checkLogogenStatus = async () => {
	const referenceId = select( nfdOnboardingStore ).getLogogenReferenceId();
	const logos = select( nfdOnboardingStore ).getLogos();
	const logosInPendingStatus = logos.filter( ( logo ) => LOGOGEN_PENDING_STATES.includes( logo.status ) );

	// If there are any logos that are pending, check the status every 4 seconds...
	if ( logosInPendingStatus.length > 0 ) {
		const response = await getLogogenStatus( referenceId );
		if ( response.error ) {
			// eslint-disable-next-line no-console
			console.error( 'Failed to get logogen status' );
			return;
		}

		const { status } = response.body;
		// Received status.
		if ( status === LOGOGEN_STATES.RECEIVED ) {
			handleReceivedStatus( logos );
			return;
		}
		// Generating status.
		if ( status === LOGOGEN_STATES.GENERATING ) {
			handleGeneratingStatus( logos );
			return;
		}
		// Failed status.
		if ( status === LOGOGEN_STATES.FAILED ) {
			handleFailedStatus( logos );
			return;
		}
		// Completed status.
		if ( status === LOGOGEN_STATES.COMPLETED ) {
			const generatedLogos = response.body.logos;
			handleCompletedStatus( logos, generatedLogos );
		}
	}
};

export default checkLogogenStatus;

