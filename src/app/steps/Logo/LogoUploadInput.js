import { dispatch, select } from '@wordpress/data';
import { uploadMedia, validateMimeType, validateFileSize } from '@wordpress/media-utils';
import classNames from 'classnames';
import { ImageImport, Label } from '@newfold/ui-component-library';
import { nfdOnboardingStore } from '@/data/store';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_LOGO_UPLOAD_FAILED } from '@/utils/analytics/hiive/constants';

const LogoUploadInput = ( { logoValue, setLogoValue } ) => {
	const [ isUploading, setIsUploading ] = useState( false );
	const [ error, setError ] = useState( {
		status: false,
		message: '',
	} );

	const validateFile = ( file ) => {
		const validationResult = {
			success: true,
			message: '',
		};
		// Validate the file type
		try {
			validateMimeType( file, [ 'image/jpeg', 'image/pjpeg', 'image/png' ] );
		} catch {
			validationResult.success = false;
			validationResult.message = __( 'File type is not supported', 'wp-module-onboarding' );
		}
		// Validate the file size
		try {
			validateFileSize( file, 1024 * 1024 * 5 );
		} catch {
			validationResult.success = false;
			validationResult.message = __( 'File size is too large', 'wp-module-onboarding' );
		}
		return validationResult;
	};

	const handleUpload = ( file ) => {
		// Reset the error state
		setError( {
			status: false,
			message: '',
		} );

		// Validate the file
		const validationResult = validateFile( file );
		if ( ! validationResult.success ) {
			setError( {
				status: true,
				message: validationResult.message,
			} );
			return;
		}

		// Process the upload
		setIsUploading( true );
		/**
		 * The uploadMedia function first calls the onFileChange immediately with a blob src.
		 * Then it calls onFileChange again with the final uploaded object.
		 * Since we're only interested in the final uploaded object...
		 * The isOptimisticUrl flag is used to track the first call and ignore the blob src.
		 */
		let isOptimisticUrl = false;
		uploadMedia( {
			multiple: false,
			filesList: [ file ],
			onFileChange: ( files ) => {
				if ( ! isOptimisticUrl ) {
					return isOptimisticUrl = true;
				}
				// Set the logo in the input slice
				dispatch( nfdOnboardingStore ).setLogo( {
					id: files[ 0 ].id,
					url: files[ 0 ].url,
				} );
				// Set the logo in the step state
				setLogoValue( {
					id: files[ 0 ].id,
					url: files[ 0 ].url,
				} );
				// Reset the uploading state
				setIsUploading( false );
			},
			onError: ( e ) => {
				// eslint-disable-next-line no-console
				console.error( e );
				setError( {
					status: true,
					message: __( 'Failed to upload logo. Please try again.', 'wp-module-onboarding' ),
				} );
				setIsUploading( false );
				// Analytics: track the logo upload failed event
				trackOnboardingEvent(
					new OnboardingEvent( ACTION_LOGO_UPLOAD_FAILED )
				);
			},
		} );
	};

	const handleReset = () => {
		// Reset the logo in the input slice
		dispatch( nfdOnboardingStore ).setLogo( {
			id: null,
			url: null,
		} );
		// Reset the logo in the step state
		setLogoValue( {
			id: 0,
			url: '',
		} );
	};

	/**
	 * Get the current site logo from the input slice
	 * @return {object|null} The current site logo object or null if no logo is set
	 */
	const getCurrentSiteLogo = () => {
		const { logo } = select( nfdOnboardingStore ).getInputSlice();
		return logo?.url || null;
	};

	/**
	 * On mount, set the parent logo state to the input slice.
	 * Helpful in cases where the user navigate to another step then return to the Logo step or...
	 * Refresh the app.
	 */
	useEffect( () => {
		const { logo } = select( nfdOnboardingStore ).getInputSlice();
		if ( logo?.url && logo?.id !== logoValue?.id ) {
			setLogoValue( {
				id: logo.id,
				url: logo.url,
			} );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	return (
		<div className="nfd-onboarding-logo-upload nfd-flex nfd-flex-col nfd-gap-2">
			<Label htmlFor="nfd-onboarding-logo-input">
				{ __( 'Site logo', 'wp-module-onboarding' ) }
			</Label>
			<ImageImport
				id="nfd-onboarding-logo-input"
				name="nfd-onboarding-logo-input"
				imageInputVariant="rounded"
				previewImage={ getCurrentSiteLogo() }
				dropLabel={ __( 'accepted: .png, .jpg, .jpeg (5MB max)', 'wp-module-onboarding' ) }
				buttonText={ __( 'Browse', 'wp-module-onboarding' ) }
				onChange={ ( { file } ) => handleUpload( file ) }
				onDrop={ handleUpload }
				onReset={ handleReset }
				disabled={ isUploading }
				isLoading={ isUploading }
				className={ classNames(
					'[&_.nfd-drop-zone]:nfd-border-solid',
					'[&_.nfd-drop-zone]:nfd-border',
					'[&_.nfd-drop-zone]:nfd-rounded-lg',
					'[&_.nfd-drop-zone]:nfd-p-4',
					'[&_.nfd-image-import__drop-label]:nfd-text-content-primary',
					'[&_.nfd-image-import__drop-label]:nfd-text-[14px]',
					{
						'[&_.nfd-drop-zone]:nfd-border-red-500': error.status,
						'[&_.nfd-drop-zone]:nfd-bg-red-50': error.status,
					}
				) }
			/>
			{ error.status && (
				<p className="nfd-text-red-500">{ error.message }</p>
			) }
		</div>
	);
};

export default LogoUploadInput;
