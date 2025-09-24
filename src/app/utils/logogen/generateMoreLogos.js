import { select } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { getMoreLogos } from '@/utils/api/onboarding';
import { createLogoRecords } from './';

const generateMoreLogos = async () => {
	const logos = select( nfdOnboardingStore ).getLogos();
	const logogenReferenceId = select( nfdOnboardingStore ).getLogogenReferenceId();

	if ( logos.length > 6 || ! logogenReferenceId ) {
		// eslint-disable-next-line no-console
		console.error( 'Not allowed to generate more logos' );
		return false;
	}

	// Fire the API call to get more logos.
	getMoreLogos( logogenReferenceId );

	// Optimistically add the records to the store
	createLogoRecords( 3 );

	return true;
};

export default generateMoreLogos;
