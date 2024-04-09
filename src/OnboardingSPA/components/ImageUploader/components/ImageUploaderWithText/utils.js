// Misc
import { THEME_LIGHT, THEME_DARK } from '../../../../../constants';

export const getDominantColor = ( imageSrc, callback ) => {
	// eslint-disable-next-line no-undef
	const img = new Image();
	img.crossOrigin = 'Anonymous';
	/* Registering on load before src to so that event listener is ready capture when image loads */
	img.onload = () => {
		const canvas = document.createElement( 'canvas' );
		const ctx = canvas.getContext( '2d' );
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage( img, 0, 0 );
		const imageData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
		const data = imageData.data;
		let r = 0,
			g = 0,
			b = 0,
			count = 0;

		/* skip transparent areas as the 0 alpha value leads to lower rgb values even in white logos */
		for ( let i = 0; i < data.length; i += 4 ) {
			const alpha = data[ i + 3 ];
			if ( alpha > 0 ) {
				r += data[ i ];
				g += data[ i + 1 ];
				b += data[ i + 2 ];
				count++;
			}
		}

		/* Get the average rgb value of the image  */
		if ( count > 0 ) {
			// To avoid division by zero
			r = Math.floor( r / count );
			g = Math.floor( g / count );
			b = Math.floor( b / count );
		}

		// Callback with the avrage dominant color
		callback( `rgb(${ r }, ${ g }, ${ b })` );
	};
	img.src = imageSrc;
};

export const getContrastingColor = ( color ) => {
	/* if the contrast value more than 150 it should have black bg, otherwise white */
	const [ r, g, b ] = color.match( /\d+/g ).map( Number );
	const contrastValue = 0.2126 * r + 0.7152 * g + 0.0722 * b;
	return contrastValue > 160 ? THEME_DARK : THEME_LIGHT;
};
