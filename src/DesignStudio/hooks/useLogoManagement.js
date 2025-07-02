/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

export default function useLogoManagement() {
	const [ temporaryURL, setTemporaryURL ] = useState();

	// Get current site logo from WordPress data store
	const { siteLogoId, canUserEdit, mediaItemData, isRequestingMediaItem } = useSelect(
		( select ) => {
			const { canUser, getEntityRecord, getEditedEntityRecord } = select( coreStore );

			const _canUserEdit = canUser( 'update', { kind: 'root', name: 'site' } );
			const siteSettings = _canUserEdit ? getEditedEntityRecord( 'root', 'site' ) : undefined;
			const siteData = getEntityRecord( 'root', '__unstableBase' );
			const _siteLogoId = _canUserEdit ? siteSettings?.site_logo : siteData?.site_logo;

			const mediaItem =
				_siteLogoId && select( coreStore ).getMedia( _siteLogoId, { context: 'view' } );

			const _isRequestingMediaItem =
				!! _siteLogoId &&
				! select( coreStore ).hasFinishedResolution( 'getMedia', [
					_siteLogoId,
					{ context: 'view' },
				] );

			return {
				siteLogoId: _siteLogoId,
				canUserEdit: _canUserEdit,
				url: siteData?.home,
				mediaItemData: mediaItem,
				isRequestingMediaItem: _isRequestingMediaItem,
			};
		},
		[]
	);

	// Get dispatch functions
	const { editEntityRecord } = useDispatch( coreStore );

	// Get logo details
	const {
		alt_text: alt,
		source_url: logoUrl,
		media_details: logoMediaDetails,
	} = mediaItemData ?? {};

	// Set logo function
	const setLogo = ( newValue ) => {
		editEntityRecord( 'root', 'site', undefined, {
			site_logo: newValue,
		} );
	};

	// Handle logo selection
	const onSelectLogo = ( media ) => {
		if ( ! media ) {
			return;
		}

		if ( ! media.id && media.url ) {
			// This is a temporary blob image
			setTemporaryURL( media.url );
			return;
		}

		setLogo( media.id );
	};

	// Handle logo removal
	const onRemoveLogo = () => {
		setLogo( null );
	};

	// Reset temporary url when logoUrl is available
	useEffect( () => {
		if ( logoUrl && temporaryURL ) {
			setTemporaryURL();
		}
	}, [ logoUrl, temporaryURL ] );

	return {
		siteLogoId,
		canUserEdit,
		mediaItemData,
		isRequestingMediaItem,
		temporaryURL,
		logoUrl,
		logoMediaDetails,
		alt,
		onSelectLogo,
		onRemoveLogo,
	};
}
