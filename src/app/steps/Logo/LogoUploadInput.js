import { useState, useRef } from '@wordpress/element';
import { dispatch, useSelect } from '@wordpress/data';
import { uploadMedia, validateMimeType, validateFileSize } from '@wordpress/media-utils';
import classNames from 'classnames';
import { Label, Spinner } from '@newfold/ui-component-library';
import { SparklesIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { nfdOnboardingStore } from '@/data/store';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_LOGO_UPLOAD_FAILED } from '@/utils/analytics/hiive/constants';

const LogoUploadInput = ( { isUploading, setIsUploading } ) => {
	const fileInputRef = useRef( null );
	const [ isDragging, setIsDragging ] = useState( false );

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
						message: __( 'Failed to upload logo. Please try again.', 'wp-module-onboarding' ),
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
		// Reset the file input
		if ( fileInputRef.current ) {
			fileInputRef.current.value = '';
		}
	};

	const handleFileChange = ( e ) => {
		const file = e.target.files?.[ 0 ];
		if ( file ) {
			handleUpload( file );
		}
	};

	const handleDragOver = ( e ) => {
		e.preventDefault();
		setIsDragging( true );
	};

	const handleDragLeave = ( e ) => {
		e.preventDefault();
		setIsDragging( false );
	};

	const handleDrop = ( e ) => {
		e.preventDefault();
		setIsDragging( false );
		const file = e.dataTransfer?.files?.[ 0 ];
		if ( file ) {
			handleUpload( file );
		}
	};

	const handleBrowseClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className="nfd-onboarding-logo-upload nfd-flex nfd-flex-col nfd-gap-4 nfd-w-full nfd-px-4 sm:nfd-w-[600px] sm:nfd-px-0 lg:nfd-w-[800px]">
			<div className="nfd-flex nfd-items-center nfd-justify-between">
				<Label htmlFor="nfd-onboarding-logo-input" className="nfd-text-lg nfd-font-semibold nfd-text-content-primary nfd-m-0">
					{ __( 'Site Logo:', 'wp-module-onboarding' ) }
				</Label>
				<button
					type="button"
					className="nfd-flex nfd-items-center nfd-gap-1.5 nfd-text-[#3B82F6] nfd-text-base nfd-font-semibold hover:nfd-underline nfd-bg-transparent nfd-border-0 nfd-p-0 nfd-cursor-pointer"
					onClick={ () => {
						// TODO: Implement AI logo generation
					} }
				>
					<SparklesIcon className="nfd-w-4 nfd-h-4 nfd-stroke-2" />
					{ __( 'Create with AI', 'wp-module-onboarding' ) }
				</button>
			</div>
			<input
				ref={ fileInputRef }
				type="file"
				id="nfd-onboarding-logo-input"
				name="nfd-onboarding-logo-input"
				accept="image/jpeg,image/pjpeg,image/png"
				onChange={ handleFileChange }
				className="nfd-hidden"
				disabled={ isUploading }
			/>
			{ logo?.url ? (
				<div className="nfd-relative nfd-w-full nfd-min-h-[250px] nfd-flex nfd-items-center nfd-justify-center nfd-bg-white nfd-rounded-lg nfd-border-2 nfd-border-dashed nfd-border-[#D1D5DB] nfd-p-4">
					<img src={ logo.url } alt="Logo" className="nfd-max-w-full nfd-max-h-[200px] nfd-object-contain" />
					<button
						type="button"
						onClick={ handleReset }
						className="nfd-absolute nfd-top-2 nfd-right-2 nfd-text-red-500 nfd-text-sm nfd-font-medium hover:nfd-underline nfd-bg-white nfd-px-3 nfd-py-1 nfd-rounded-md nfd-border nfd-border-gray-300"
					>
						{ __( 'Remove', 'wp-module-onboarding' ) }
					</button>
				</div>
			) : (
				<div
					onDragOver={ handleDragOver }
					onDragLeave={ handleDragLeave }
					onDrop={ handleDrop }
					className={ classNames(
						'nfd-flex nfd-flex-col nfd-items-center nfd-justify-center nfd-gap-4',
						'nfd-w-full nfd-min-h-[250px] nfd-p-12',
						'nfd-bg-white nfd-rounded-lg nfd-border-2 nfd-border-dashed',
						'nfd-cursor-pointer nfd-transition-colors',
						{
							'nfd-border-[#D1D5DB]': ! isDragging && ! error.status,
							'nfd-border-[#3B82F6] nfd-bg-blue-50': isDragging && ! error.status,
							'nfd-border-red-500 nfd-bg-red-50': error.status,
						}
					) }
					onClick={ handleBrowseClick }
					role="button"
					tabIndex={ 0 }
					onKeyDown={ ( e ) => {
						if ( e.key === 'Enter' || e.key === ' ' ) {
							e.preventDefault();
							handleBrowseClick();
						}
					} }
				>
					{ isUploading ? (
						<Spinner />
					) : (
						<>
							<CloudArrowUpIcon className="nfd-w-12 nfd-h-12 nfd-text-[#9CA3AF]" />
							<p className="nfd-text-base nfd-font-normal nfd-text-content-primary nfd-m-0">
								{ __( 'Choose a file or drag & drop it here', 'wp-module-onboarding' ) }
							</p>
							<p className="nfd-text-sm nfd-text-[#6B7280] nfd-text-center nfd-m-0">
								{ __( 'JPG, PNG, JPEG & SVG formats, up to 5MB', 'wp-module-onboarding' ) }
							</p>
							<button
								type="button"
								onClick={ ( e ) => {
									e.stopPropagation();
									handleBrowseClick();
								} }
								className="nfd-px-6 nfd-py-2.5 nfd-border nfd-border-[#3B82F6] nfd-text-[#3B82F6] nfd-bg-white nfd-rounded-md nfd-text-sm nfd-font-medium hover:nfd-bg-[#3B82F6] hover:nfd-text-white nfd-transition-colors"
							>
								{ __( 'Browse File', 'wp-module-onboarding' ) }
							</button>
						</>
					) }
				</div>
			) }
			{ error.status && (
				<p className="nfd-text-red-500 nfd-text-sm nfd-mt-2">{ error.message }</p>
			) }
		</div>
	);
};

export default LogoUploadInput;
