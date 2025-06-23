/* eslint-disable no-console */
/**
 * Remove global styles from all locations in the editor
 */
export const removeGlobalStyles = () => {
	const hideGlobalStylesElements = () => {
		try {
			const stylesButtons = document?.querySelectorAll(
				'button[aria-label="Styles"], ' +
					'.edit-site-header-edit-mode button[aria-label="Styles"], ' +
					'.interface-pinned-items button[aria-label="Styles"]'
			);

			stylesButtons.forEach( ( button ) => {
				if ( button ) {
					button.style.display = 'none';
				}
			} );

			if ( ! document?.getElementById( 'nfd-hide-global-styles-css' ) ) {
				const styleElement = document?.createElement( 'style' );
				styleElement.id = 'nfd-hide-global-styles-css';
				styleElement.innerHTML = `
	                button[aria-label="Styles"],
	                .interface-pinned-items button[aria-label="Styles"],
	                #edit-site\\:global-styles,
	                .interface-complementary-area[aria-label="Styles"],
	                .components-dropdown-menu__menu-item[aria-label="Styles"],
	                [aria-label="Styles panel"],
	                .edit-site-global-styles-sidebar,
	                button[aria-expanded="true"][aria-label="Styles"] {
	                    display: none !important;
	                }
	            `;
				document?.head.appendChild( styleElement );
			}
		} catch ( e ) {
			console.error( 'NFD Onboarding: Error hiding global styles', e );
		}
	};

	hideGlobalStylesElements();

	// Run the DOM-based approach repeatedly to catch dynamically rendered elements
	const interval = setInterval( hideGlobalStylesElements, 500 );
	setTimeout( () => clearInterval( interval ), 10000 ); // Stop after 10 seconds
};
