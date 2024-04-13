// WordPress
import { __ } from '@wordpress/i18n';
import { memo, useContext, useRef, useState } from '@wordpress/element';
import { Icon, closeSmall } from '@wordpress/icons';

// Third-party
import classNames from 'classnames';
import bytes from 'bytes';

// Classes and functions
import { uploadImage } from '../../../../utils/api/uploader';
import { getDominantColor, getContrastingColor } from './utils';

// Components
import { ThemeContext } from '../../../ThemeContextProvider';
import Spinner from '../../../Loaders/Spinner';

// Misc
import { THEME_LIGHT, THEME_DARK } from '../../../../../constants';

const ImageUploaderWithText = ( { image, imageSetter, onFailure } ) => {
	const inputRef = useRef( null );
	const { theme } = useContext( ThemeContext );
	const [ isUploading, setIsUploading ] = useState( false );
	const [ onDragActive, setOnDragActive ] = useState( false );
	const [ pngLogoBgTheme, setPngLogoBgTheme ] = useState( '' );

	async function updateItem( fileData ) {
		if ( fileData ) {
			setIsUploading( true );
			const res = await uploadImage( fileData );
			if ( ! res?.body ) {
				setIsUploading( false );
				handleFailure();
				return false;
			}
			const id = res.body?.id;
			const url = res.body?.source_url;

			if ( fileData && fileData.type === 'image/png' ) {
				// Process the image to find the dominant color
				getDominantColor( url, ( dominantColor ) => {
					const contrastingColor =
						getContrastingColor( dominantColor );
					setPngLogoBgTheme( contrastingColor );
				} );
			}
			imageSetter( {
				id,
				url,
				fileName: fileData?.name,
				fileSize: fileData?.size,
			} );
		}
		setIsUploading( false );
	}

	const handleFailure = () => {
		if ( typeof onFailure === 'function' ) {
			return onFailure();
		}
	};

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
		setPngLogoBgTheme( '' );
		imageSetter( {
			id: 0,
			url: '',
			fileName: '',
			fileSize: 0,
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

	const isImageUploaded =
		! isUploading && image?.id !== 0 && image?.id !== undefined;

	const logoContainerClassnames = classNames(
		'nfd-onboarding-image-uploader--with-text',
		{
			'nfd-onboarding-image-uploader--with-text--on-drag': onDragActive,
			'nfd-onboarding-image-uploader--with-text--not-dashed':
				isImageUploaded,
			'nfd-onboarding-image-uploader--with-text--not-dashed__dark':
				isImageUploaded && pngLogoBgTheme === THEME_DARK,
			'nfd-onboarding-image-uploader--with-text--not-dashed__light':
				isImageUploaded && pngLogoBgTheme === THEME_LIGHT,
		}
	);

	return (
		<div
			className={ logoContainerClassnames }
			onDrop={ ( e ) => handleDrop( e ) }
			onDragOver={ ( e ) => handleDragOver( e ) }
			onDragEnter={ ( e ) => handleDragEnter( e ) }
			onDragLeave={ ( e ) => handleDragLeave( e ) }
		>
			{ isUploading ? (
				<Spinner />
			) : (
				<>
					{ ! isImageUploaded && (
						<>
							<div className="nfd-onboarding-image-uploader--with-text__heading">
								<div
									className={ classNames(
										'nfd-onboarding-image-uploader--with-text__heading__icon',
										theme === THEME_LIGHT
											? 'nfd-onboarding-image-uploader--with-text__heading__icon--light'
											: null
									) }
								></div>
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
					{ isImageUploaded && (
						<div className="nfd-onboarding-image-uploader--with-text__site_logo__preview">
							<div className="nfd-onboarding-image-uploader--with-text__site_logo__preview__wrapper">
								<img
									className="nfd-onboarding-image-uploader--with-text__site_logo__preview__image"
									src={ image.url }
									alt={ __(
										'Site Logo Preview',
										'wp-module-onboarding'
									) }
								/>
							</div>
							<div className="nfd-onboarding-image-uploader--with-text__site_logo__preview__details">
								<p className="nfd-onboarding-image-uploader--with-text__site_logo__preview__details__filename">
									{ image.fileName }
								</p>
								<p className="nfd-onboarding-image-uploader--with-text__site_logo__preview__details__filesize">
									{ bytes( image.fileSize ) }
								</p>
							</div>
							<div className="nfd-onboarding-image-uploader--with-text__site_logo__preview__reset">
								<button
									className="nfd-onboarding-image-uploader--with-text__site_logo__preview__reset__button"
									onClick={ removeSelectedImage }
								>
									<Icon
										className="nfd-onboarding-image-uploader--with-text__site_logo__preview__reset__button__icon"
										icon={ closeSmall }
									/>
								</button>
							</div>
						</div>
					) }
				</>
			) }
		</div>
	);
};

export default memo( ImageUploaderWithText );
