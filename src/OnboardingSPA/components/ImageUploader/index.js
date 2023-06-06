import { __ } from '@wordpress/i18n';
import { memo, useRef, useState } from '@wordpress/element';

import { ImageUploadLoader } from '../Loaders';
import { uploadImage } from '../../utils/api/uploader';

/*
 * Image Uploader
 *
 */
const ImageUploader = ( { icon, iconSetter } ) => {
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
				iconSetter( {
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

	const imageChange = ( e ) => {
		if ( e?.target?.files && e?.target?.files.length > 0 ) {
			updateItem( e?.target?.files[ 0 ] );
		}
	};

	const removeSelectedImage = () => {
		iconSetter( {
			id: 0,
			url: '',
		} );
		if ( inputRef?.current?.files.length > 0 ) {
			inputRef.current.value = '';
		}
	};
	function loader() {
		return (
			<div className="image-uploader_window">
				<ImageUploadLoader />
			</div>
		);
	}

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

	function getImageUploadWindow() {
		return (
			<div
				className={ `image-uploader_window ${
					onDragActive && 'image-uploader_window--on-drag'
				}` }
				onDrop={ ( e ) => handleDrop( e ) }
				onDragOver={ ( e ) => handleDragOver( e ) }
				onDragEnter={ ( e ) => handleDragEnter( e ) }
				onDragLeave={ ( e ) => handleDragLeave( e ) }
			>
				<div className="image-uploader_window-empty"></div>
				<div className="image-uploader_window-logo">
					{ ( icon === undefined || icon?.id === 0 ) && (
						<div className="image-uploader_window-logo-icon-empty"></div>
					) }
					{ icon?.id !== 0 && icon?.id !== undefined && (
						<img
							className="image-uploader_window-logo-icon-selected"
							src={ icon?.url }
							alt="Thumb"
						/>
					) }
				</div>
				<div className="image-uploader_window-reset">
					{ icon !== undefined && icon?.id !== 0 && (
						<button
							className="image-uploader_window-reset-btn"
							onClick={ removeSelectedImage }
						>
							{ __( 'RESET', 'wp-module-onboarding' ) }
						</button>
					) }
					{ ( icon === undefined || icon?.id === 0 ) && (
						<button
							className="image-uploader_window-reset-btn"
							onClick={ handleClick }
						>
							{ __( 'UPLOAD', 'wp-module-onboarding' ) }
						</button>
					) }
					<input
						className="image-uploader_window-select-btn"
						accept="image/*"
						type="file"
						ref={ inputRef }
						onChange={ imageChange }
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="image-uploader">
			<h4 className="image-uploader_heading">Logo</h4>
			{ isUploading ? loader() : getImageUploadWindow() }
		</div>
	);
};

export default memo( ImageUploader );
