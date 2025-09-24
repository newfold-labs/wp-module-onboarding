import { nfdOnboardingStore } from '@/data/store';
import { dispatch, select } from '@wordpress/data';
import { getLogos } from '@/utils/api/onboarding';
import { createLogoRecords } from './';

const generateLogos = async () => {
	// Prevent multiple logo generations batches.
	const storedReferenceId = select( nfdOnboardingStore ).getLogogenReferenceId();
	if ( storedReferenceId ) {
		throw new Error( 'This action is not allowed' );
	}

	// Optimistically add the records to the store
	createLogoRecords( 3 );

	// const siteTitle = select( nfdOnboardingStore ).getSiteTitle();
	// const prompt = select( nfdOnboardingStore ).getPrompt();
	// const locale = select( nfdOnboardingStore ).getSelectedLocale();

	// // Generate the logos.
	// const response = await getLogos( siteTitle, prompt, locale );
	// if (
	// 	response.error ||
	// 	! response.body?.reference_id
	// ) {
	// 	// eslint-disable-next-line no-console
	// 	console.error( 'Failed to generate logos' );

	// 	return false;
	// }

	// // Set the generation reference id in the store
	// const generationReferenceId = response.body.reference_id;
	dispatch( nfdOnboardingStore ).setLogogenReferenceId( 'wMJMJeC' );

	return true;
};

export default generateLogos;
