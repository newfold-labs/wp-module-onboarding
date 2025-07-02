import { dispatch, useSelect } from '@wordpress/data';
import { uploadMedia, validateMimeType, validateFileSize } from '@wordpress/media-utils';
import classNames from 'classnames';
import { ImageImport, Label } from '@newfold/ui-component-library';
import { nfdOnboardingStore } from '@/data/store';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_LOGO_UPLOAD_FAILED } from '@/utils/analytics/hiive/constants';

const LogoUploadInput = ( { isUploading, setIsUploading } ) => {
	const [ error, setError ] = useState( {
		status: false,
		message: '',
	} );

	const logo = useSelect( ( select ) => select( nfdOnboardingStore ).getLogo(), [] );

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
		let isOptimisticUrl = true;
		uploadMedia( {
			multiple: false,
			filesList: [ file ],
			onFileChange: ( files ) => {
				if ( isOptimisticUrl ) {
					isOptimisticUrl = false;
					return;
				}
				// If the file id is not found, set the error state and return
				if ( ! files[ 0 ]?.id ) {
					setError( {
						status: true,
						message: __( "Failed to upload logo. Please try again.", 'wp-module-onboarding' ),
					} );
					setIsUploading( false );
					return;
				}
				// Success...
				// Set the logo in the input slice
				dispatch( nfdOnboardingStore ).setLogo( {
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
	};

	return (
		<div className="nfd-onboarding-logo-upload nfd-flex nfd-flex-col nfd-gap-2">
			<Label htmlFor="nfd-onboarding-logo-input">
				{ __( 'Site logo', 'wp-module-onboarding' ) }
			</Label>
			<ImageImport
				key={ logo?.url || 'no-logo' }
				id="nfd-onboarding-logo-input"
				name="nfd-onboarding-logo-input"
				imageInputVariant="rounded"
				previewImage={ logo?.url || null }
				dropLabel={ __( 'accepted: .png, .jpg, .jpeg (5MB max)', 'wp-module-onboarding' ) }
				buttonText={ __( 'Browse', 'wp-module-onboarding' ) }
				onChange={ ( { file } ) => handleUpload( file ) }
				onDrop={ ( e ) => {
					handleUpload( e.dataTransfer.files[ 0 ] );
				} }
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
