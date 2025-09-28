import { createContext } from '@wordpress/element';
import { select, dispatch, useDispatch, resolveSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { nfdOnboardingStore } from '@/data/store';
import { selectLogo } from '@/utils/api';

export const LogoGenSetSiteLogoHookContext = createContext( null );

export const LogoGenSetSiteLogoHookContextProvider = ( {
	children,
	...props
} ) => {
	const setSiteLogoHookValues = useLogoGenSetSiteLogo();

	return (
		<LogoGenSetSiteLogoHookContext.Provider value={ {
			...setSiteLogoHookValues,
			...props,
		} }>
			{ children }
		</LogoGenSetSiteLogoHookContext.Provider>
	);
};

const useLogoGenSetSiteLogo = () => {
	const [ status, setStatus ] = useState( {
		isSettingSiteLogo: false,
		hasError: false,
		message: '',
	} );
	const { editEntityRecord, saveEditedEntityRecord } = useDispatch( coreStore );

	const reportStarted = () => {
		setStatus( {
			isSettingSiteLogo: true,
			hasError: false,
			message: __( 'Setting your site logo…', 'wp-module-onboarding' ),
		} );
	};

	const reportError = () => {
		setStatus( {
			isSettingSiteLogo: false,
			hasError: true,
			message: __( 'Uh oh! Something went wrong. Please try again.', 'wp-module-onboarding' ),
		} );
	};

	const reportSuccess = () => {
		setStatus( {
			isSettingSiteLogo: false,
			hasError: false,
			message: __( 'Your site logo has been set!', 'wp-module-onboarding' ),
		} );
	};

	/**
	 * Save the selected site logo to the data stores and WordPress.
	 *
	 * @param {string} logoReferenceId
	 * @param {string} attachmentId
	 * @param {string} attachmentUrl
	 * @return {boolean} True if the store was updated successfully, false otherwise.
	 */
	const SaveSiteLogo = async ( logoReferenceId, attachmentId, attachmentUrl ) => {
		const logos = select( nfdOnboardingStore ).getLogos();
		const updatedLogos = logos.map( ( logo ) => {
			// Find the selected logo.
			if ( logo.reference_id === logoReferenceId ) {
				// Only update the store if the attachment value has changed.
				if (
					logo.attachment_data?.id !== attachmentId ||
					logo.attachment_data?.url !== attachmentUrl
				) {
					return { ...logo, attachment_data: { id: attachmentId, url: attachmentUrl } };
				}
			}
			return logo;
		} );
		// Update the logos in the store
		dispatch( nfdOnboardingStore ).setLogos( updatedLogos );

		// Ensure core site data is loaded.
		await resolveSelect( coreStore ).getEntityRecord( 'root', 'site' );
		// Update the site logo in the core data store
		editEntityRecord( 'root', 'site', undefined, {
			site_logo: attachmentId,
		} );
		// Save the site logo to WordPress.
		const saveResult = await saveEditedEntityRecord( 'root', 'site' );
		// Check if the site logo was saved successfully.
		if ( saveResult?.site_logo === attachmentId ) {
			// Update the site logo in the store (This will update the preview in the input of the logo Step)
			dispatch( nfdOnboardingStore ).setLogo( {
				id: attachmentId,
				url: attachmentUrl,
			} );
			return true;
		}
		return false;
	};

	const setSiteLogo = async ( { logoReferenceId } ) => {
		reportStarted();

		// Check if the logo already has a attachment (from a previous attempt).
		const logos = select( nfdOnboardingStore ).getLogos();
		const selectedLogo = logos.find( ( logo ) => logo.reference_id === logoReferenceId );
		// If the logo already has a attachment, update the store with the attachment data.
		if ( selectedLogo.attachment_data?.id && selectedLogo.attachment_data?.url ) {
			const result = await SaveSiteLogo(
				logoReferenceId,
				selectedLogo.attachment_data.id,
				selectedLogo.attachment_data.url,
			);

			/**
			 * Since we already have attachment data, the SaveSiteLogo operation can be very fast.
			 * We need to add a minimum delay to ensure UI messaging and state updates are visible.
			 */
			await new Promise( ( resolve ) => setTimeout( resolve, 1300 ) );

			if ( result ) {
				reportSuccess();
			} else {
				reportError();
			}
			return result;
		}

		// Select the logo on the service side and get the URL.
		const response = await selectLogo( logoReferenceId );
		// Error.
		if (
			response.error ||
			! response.body?.selected_logo_id ||
			! response.body?.selected_logo_url
		) {
			// eslint-disable-next-line no-console
			console.error( 'Failed to get the selected logo', response );
			reportError();
			return false;
		}

		// Success.
		const attachmentData = response.body;
		const result = SaveSiteLogo(
			logoReferenceId,
			attachmentData.selected_logo_id,
			attachmentData.selected_logo_url,
		);
		if ( result ) {
			reportSuccess();
		} else {
			reportError();
		}
		return result;
	};

	return { status, setSiteLogo };
};

export default useLogoGenSetSiteLogo;
