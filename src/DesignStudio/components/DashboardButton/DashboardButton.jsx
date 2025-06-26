/* global MutationObserver */
import { createPortal, useEffect, useState } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { wordpress } from '@wordpress/icons';

/**
 * A button to exit the user to the plugin dashboard.
 * The button is injected before the save button of the site editor.
 * @return {React.ReactNode} Dashboard button component portal.
 */
const DashboardButton = () => {
	const [ dashboardButtonContainer, setDashboardButtonContainer ] = useState( null );

	useEffect( () => {
		/**
		 * Create and inject the dashboard button container into the site editor header actions.
		 * @return {void}
		 */
		const createDashboardButtonContainer = () => {
			const siteEditor = document.querySelector( '#site-editor' );
			if ( ! siteEditor ) {
				return;
			}

			const siteEditorHeaderActions = siteEditor.querySelector( '.editor-header .editor-header__settings' );
			if ( ! siteEditorHeaderActions ) {
				return;
			}

			// Prevent duplicates if the container already exists.
			const existingContainer = siteEditorHeaderActions.querySelector( '.nfd-design-studio-dashboard-button' );
			if ( existingContainer ) {
				setDashboardButtonContainer( existingContainer );
				return;
			}

			// Create the container element.
			const dashboardButtonContainerElement = document.createElement( 'div' );
			dashboardButtonContainerElement.className = 'nfd-design-studio-dashboard-button';
			// Insert before the save button
			const siteEditorSaveButton = siteEditorHeaderActions.querySelector( '.editor-post-publish-button__button' );
			if ( siteEditorSaveButton && siteEditorSaveButton.parentNode ) {
				siteEditorSaveButton.parentNode.insertBefore( dashboardButtonContainerElement, siteEditorSaveButton );
			} else {
				siteEditorHeaderActions.appendChild( dashboardButtonContainerElement );
			}

			setDashboardButtonContainer( dashboardButtonContainerElement );
		};
		createDashboardButtonContainer();

		// Observer: watch for DOM changes and ensure dashboard button presence.
		const observer = new MutationObserver( () => {
			// Use a timeout to debounce rapid DOM changes.
			setTimeout( () => {
				if ( ! dashboardButtonContainer ) {
					createDashboardButtonContainer();
				}
			}, 100 );
		} );
		observer.observe( document.body, {
			childList: true,
			subtree: true,
		} );

		// On unmount: remove the container and disconnect the observer.
		return () => {
			observer.disconnect();
			if ( dashboardButtonContainer && dashboardButtonContainer.parentNode ) {
				dashboardButtonContainer.parentNode.removeChild( dashboardButtonContainer );
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	const getPluginDashboardPageUrl = () => {
		// Get the admin URL from the NewfoldRuntime.
		const adminUrl = window.NewfoldRuntime?.admin_url;
		if ( adminUrl ) {
			const brand = window.NewfoldRuntime?.context?.brand?.name;
			if ( brand ) {
				return `${ adminUrl }admin.php?page=${ brand }&referrer=nfd-design-studio`;
			}

			return adminUrl;
		}

		// Fallback to the default WordPress admin URL.
		return '/wp-admin/';
	};

	const dashboardButtonComponent = (
		<Button
			variant="secondary"
			size="compact"
			icon={ wordpress }
			disabled={ false }
			href={ getPluginDashboardPageUrl() }
			className="nfd-design-studio-dashboard-button"
		>
			{ __( 'Dashboard' ) }
		</Button>
	);

	return dashboardButtonContainer ? createPortal( dashboardButtonComponent, dashboardButtonContainer ) : null;
};

export default DashboardButton;
