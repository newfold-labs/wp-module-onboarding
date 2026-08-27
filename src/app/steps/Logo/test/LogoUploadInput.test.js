/* eslint-env jest */
/**
 * Regression tests for the onboarding logo upload spinner.
 *
 * Bug (reported Aug 2026): uploading a logo in the onboarding flow spun
 * forever and left the "Next" button disabled. Root cause: uploadMedia()
 * only emits an optimistic placeholder onFileChange callback when server-side
 * media processing is used. WordPress 7.1 turned on client-side media
 * processing by default (in supporting browsers), so uploadMedia() emits a
 * single finalized callback — which the old "skip the first callback" logic
 * discarded, so isUploading never cleared.
 *
 * These tests drive LogoUploadInput with uploadMedia mocked to reproduce both
 * callback shapes and assert the logo is stored and the spinner is cleared.
 */
import { act } from 'react';
import { createElement, createRoot } from '@wordpress/element';
import { uploadMedia } from '@wordpress/media-utils';

import LogoUploadInput from '../LogoUploadInput';

// `__` is provided as a global by the webpack build (ProvidePlugin); jest has
// no such transform, so shim it to an identity function.
global.__ = ( text ) => text;

// Opt in to React 18's act() environment so state updates flush synchronously.
global.IS_REACT_ACT_ENVIRONMENT = true;

const mockSetLogo = jest.fn();

jest.mock( '@wordpress/media-utils', () => ( {
	uploadMedia: jest.fn(),
	validateMimeType: jest.fn(),
	validateFileSize: jest.fn(),
} ) );

jest.mock( '@wordpress/data', () => ( {
	useSelect: () => ( { logo: null, selectedLocale: 'en_US' } ),
	dispatch: () => ( { setLogo: mockSetLogo } ),
} ) );

jest.mock( '@/data/store', () => ( { nfdOnboardingStore: 'nfd/onboarding' } ) );

jest.mock( '@/utils/analytics/hiive', () => ( {
	OnboardingEvent: class {},
	trackOnboardingEvent: jest.fn(),
} ) );

jest.mock( '@/utils/analytics/hiive/constants', () => ( {
	ACTION_LOGO_UPLOAD_FAILED: 'logo_upload_failed',
} ) );

jest.mock( '../AiLogoCreator', () => ( { AiLogoCreator: () => null } ) );

jest.mock( '@newfold/ui-component-library', () => ( {
	Label: () => null,
	Spinner: () => null,
} ) );

jest.mock( '@heroicons/react/24/outline', () => ( {
	CloudArrowUpIcon: () => null,
} ) );

const FINAL_LOGO = { id: 42, url: 'https://example.test/logo.png' };

let container;
let root;

beforeEach( () => {
	jest.clearAllMocks();
	container = document.createElement( 'div' );
	document.body.appendChild( container );
} );

afterEach( () => {
	act( () => root.unmount() );
	container.remove();
} );

const renderInput = ( setIsUploading ) => {
	act( () => {
		root = createRoot( container );
		root.render(
			createElement( LogoUploadInput, { isUploading: false, setIsUploading } )
		);
	} );
};

const selectLogoFile = () => {
	const input = container.querySelector( '#nfd-onboarding-logo-input' );
	const file = new File( [ 'logo-bytes' ], 'logo.png', { type: 'image/png' } );
	Object.defineProperty( input, 'files', { value: [ file ], configurable: true } );
	act( () => {
		input.dispatchEvent( new Event( 'change', { bubbles: true } ) );
	} );
};

describe( 'LogoUploadInput', () => {
	it( 'stores the logo and stops the spinner when client-side media processing emits a single finalized callback', () => {
		// WordPress 7.1 client-side processing: no optimistic placeholder,
		// only the finalized attachment.
		uploadMedia.mockImplementation( ( { onFileChange } ) => {
			onFileChange( [ FINAL_LOGO ] );
		} );
		const setIsUploading = jest.fn();

		renderInput( setIsUploading );
		selectLogoFile();

		expect( mockSetLogo ).toHaveBeenCalledWith( { id: 42, url: FINAL_LOGO.url } );
		expect( setIsUploading ).toHaveBeenCalledWith( false );
	} );

	it( 'still stores the logo when server-side processing emits the placeholder then the finalized callback', () => {
		// Legacy behavior: optimistic blob placeholder first, finalized second.
		uploadMedia.mockImplementation( ( { onFileChange } ) => {
			onFileChange( [ { url: 'blob:placeholder' } ] );
			onFileChange( [ FINAL_LOGO ] );
		} );
		const setIsUploading = jest.fn();

		renderInput( setIsUploading );
		selectLogoFile();

		expect( mockSetLogo ).toHaveBeenCalledTimes( 1 );
		expect( mockSetLogo ).toHaveBeenCalledWith( { id: 42, url: FINAL_LOGO.url } );
		expect( setIsUploading ).toHaveBeenCalledWith( false );
	} );

	it( 'ignores the optimistic placeholder callback (no id)', () => {
		uploadMedia.mockImplementation( ( { onFileChange } ) => {
			onFileChange( [ { url: 'blob:placeholder' } ] );
		} );
		const setIsUploading = jest.fn();

		renderInput( setIsUploading );
		selectLogoFile();

		expect( mockSetLogo ).not.toHaveBeenCalled();
		// Still uploading — the finalized callback has not arrived yet.
		expect( setIsUploading ).not.toHaveBeenCalledWith( false );
	} );

	it( 'clears the spinner without storing a logo when the upload errors', () => {
		uploadMedia.mockImplementation( ( { onError } ) => {
			onError( new Error( 'upload failed' ) );
		} );
		const setIsUploading = jest.fn();

		renderInput( setIsUploading );
		selectLogoFile();

		expect( mockSetLogo ).not.toHaveBeenCalled();
		expect( setIsUploading ).toHaveBeenCalledWith( false );
		// The component logs the upload error; assert it so jest-console
		// treats the console.error as expected.
		expect( console ).toHaveErrored();
	} );
} );
