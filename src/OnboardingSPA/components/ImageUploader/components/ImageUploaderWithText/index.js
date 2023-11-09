import { __ } from '@wordpress/i18n';

import { memo, useRef, useState } from '@wordpress/element';
import { uploadImage } from '../../../../utils/api/uploader';
import Spinner from '../../../Loaders/Spinner';

const ImageUploaderWithText = ( { image, imageSetter } ) => {
	const inputRef = useRef( null );
	const [ isUploading, setIsUploading ] = useState( false );
	const [ onDragActive, setOnDragActive ] = useState( false );

	async function updateItem( fileData ) {
		if ( fileData ) {
			setIsUploading( true );
			const res = await uploadImage( fileData );
			if ( res ) {
				const id = res?.body?.id;
				const url = res?.body?.source_url;
				imageSetter( {
					id,
					url,
				} );
			}
		}

		setIsUploading( false );
	}

	const handleClick = () => {
		inputRef?.current.click();
	};

	const handleDragEnter = ( e ) => {
		e.preventDefault();
		e.stopPropagation();
		setOnDragActive( true );
	};

	const handleDragLeave = ( e ) => {
		e.preventDefault();
		e.stopPropagation();
		setOnDragActive( false );
	};

	const handleDragOver = ( e ) => {
		e.preventDefault();
		e.stopPropagation();
		setOnDragActive( true );
	};

	const removeSelectedImage = () => {
		imageSetter( {
			id: 0,
			url: '',
		} );
		if ( inputRef?.current?.files.length > 0 ) {
			inputRef.current.value = '';
		}
	};

	const imageChange = ( e ) => {
		if ( e?.target?.files && e?.target?.files.length > 0 ) {
			updateItem( e?.target?.files[ 0 ] );
		}
	};

	const handleDrop = ( e ) => {
		e.preventDefault();
		e.stopPropagation();
		setOnDragActive( false );
		if ( e?.dataTransfer?.files && e?.dataTransfer?.files.length > 0 ) {
			if (
				e?.dataTransfer?.files[ 0 ]?.type.split( '/' )[ 0 ] === 'image'
			) {
				updateItem( e?.dataTransfer?.files[ 0 ] );
			}
		}
	};

	return (
		<div
			className={ `nfd-onboarding-image-uploader--with-text ${
				onDragActive &&
				'nfd-onboarding-image-uploader--with-text--on-drag'
			}` }
			onDrop={ ( e ) => handleDrop( e ) }
			onDragOver={ ( e ) => handleDragOver( e ) }
			onDragEnter={ ( e ) => handleDragEnter( e ) }
			onDragLeave={ ( e ) => handleDragLeave( e ) }
		>
			{ isUploading ? (
				<Spinner />
			) : (
				<>
					{ ( image === undefined || image?.id === 0 ) && (
						<>
							<div className="nfd-onboarding-image-uploader--with-text__heading">
								<div className="nfd-onboarding-image-uploader--with-text__heading__icon"></div>
								<p className="nfd-onboarding-image-uploader--with-text__heading__text">
									<span className="nfd-onboarding-image-uploader--with-text__heading__text__drop">
										{ __(
											'Drop your logo here, or ',
											'wp-module-onboarding'
										) }
									</span>
									<button
										onClick={ handleClick }
										className="nfd-onboarding-image-uploader--with-text__heading__text__modal"
									>
										{ __(
											'browse',
											'wp-module-onboarding'
										) }
									</button>
									<input
										className="nfd-onboarding-image-uploader--with-text__heading__text__input"
										accept="image/*"
										type="file"
										ref={ inputRef }
										onChange={ imageChange }
									/>
								</p>
							</div>
							<div className="nfd-onboarding-image-uploader--with-text__subheading">
								<p className="nfd-onboarding-image-uploader--with-text__subheading__text">
									{ __(
										'supports .jpg, .png, .gif',
										'wp-module-onboarding'
									) }
								</p>
							</div>
						</>
					) }
					{ image?.id !== 0 && image?.id !== undefined && (
						<>
							<img
								className="nfd-onboarding-image-uploader--with-text__site_logo"
								src={ image?.url }
								alt="Thumb"
							/>
							<div className="nfd-onboarding-image-uploader--with-text__site_logo-reset">
								<button
									className="nfd-onboarding-image-uploader--with-text__site_logo-reset__button"
									onClick={ removeSelectedImage }
								>
									{ __( 'Reset', 'wp-module-onboarding' ) }
								</button>
							</div>
						</>
					) }
				</>
			) }
		</div>
	);
};

export default memo( ImageUploaderWithText );
