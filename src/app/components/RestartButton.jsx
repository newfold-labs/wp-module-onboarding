/* global MutationObserver */
import { createPortal, useEffect, useState } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { backup } from '@wordpress/icons';

const isOnboardingComplete = () => {
	return sessionStorage.getItem( 'nfd_onboarding_complete' ) === 'true';
};

/**
 * A button to restart the onboarding flow.
 * Only rendered when the site editor was opened after onboarding completed.
 * The button is injected before the save button of the site editor.
 * @return {React.ReactNode|null} Restart button component portal.
 */
const RestartButton = () => {
	const shouldRender = isOnboardingComplete();
	const [ container, setContainer ] = useState( null );

	useEffect( () => {
		if ( ! shouldRender ) {
			return;
		}

		const createContainer = () => {
			const siteEditor = document.querySelector( '#site-editor' );
			if ( ! siteEditor ) {
				return;
			}

			const headerActions = siteEditor.querySelector( '.editor-header .editor-header__settings' );
			if ( ! headerActions ) {
				return;
			}

			const existing = headerActions.querySelector( '.nfd-onboarding-restart-button' );
			if ( existing ) {
				setContainer( existing );
				return;
			}

			const el = document.createElement( 'div' );
			el.className = 'nfd-onboarding-restart-button';

			// Insert before the save button.
			const saveButton = headerActions.querySelector( '.editor-post-publish-button__button' );
			if ( saveButton && saveButton.parentNode ) {
				saveButton.parentNode.insertBefore( el, saveButton );
			} else {
				headerActions.appendChild( el );
			}

			setContainer( el );
		};

		createContainer();

		const observer = new MutationObserver( () => {
			setTimeout( () => {
				if ( ! container ) {
					createContainer();
				}
			}, 100 );
		} );
		observer.observe( document.body, {
			childList: true,
			subtree: true,
		} );

		return () => {
			observer.disconnect();
			if ( container && container.parentNode ) {
				container.parentNode.removeChild( container );
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ shouldRender ] );

	if ( ! shouldRender ) {
		return null;
	}

	const handleClick = () => {
		// eslint-disable-next-line no-console
		console.log( '[RestartButton] Restart onboarding clicked' );
	};

	const button = (
		<Button
			variant="tertiary"
			size="compact"
			icon={ backup }
			onClick={ handleClick }
			className="nfd-onboarding-restart-button"
		>
			{ __( 'Restart', 'wp-module-onboarding' ) }
		</Button>
	);

	return container ? createPortal( button, container ) : null;
};

export default RestartButton;
