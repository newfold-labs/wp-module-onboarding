let buildWithAIInserted = false; // Flag to track if the Build with AI element is already inserted

// Function to create an SVG icon element
function createSVGIcon() {
	const svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
	svg.setAttribute( 'xmlns', 'http://www.w3.org/2000/svg' );
	svg.setAttribute( 'viewBox', '0 0 384 512' );
	svg.setAttribute( 'width', '50px' );
	svg.setAttribute( 'height', '50px' );

	const path = document.createElementNS(
		'http://www.w3.org/2000/svg',
		'path'
	);
	path.setAttribute(
		'd',
		'M162.4 6c-1.5-3.6-5-6-8.9-6l-19 0c-3.9 0-7.5 2.4-8.9 6L104.9 57.7c-3.2 8-14.6 8-17.8 0L66.4 6c-1.5-3.6-5-6-8.9-6L48 0C21.5 0 0 21.5 0 48L0 224l0 22.4L0 256l9.6 0 364.8 0 9.6 0 0-9.6 0-22.4 0-176c0-26.5-21.5-48-48-48L230.5 0c-3.9 0-7.5 2.4-8.9 6L200.9 57.7c-3.2 8-14.6 8-17.8 0L162.4 6zM0 288l0 32c0 35.3 28.7 64 64 64l64 0 0 64c0 35.3 28.7 64 64 64s64-28.7 64-64l0-64 64 0c35.3 0 64-28.7 64-64l0-32L0 288zM192 432a16 16 0 1 1 0 32 16 16 0 1 1 0-32z'
	);
	path.setAttribute( 'fill', '#8c8f94' );
	svg.appendChild( path );

	return svg;
}

// Function to create the 'Build with AI' element
function createBuildWithAIElement( themeDiv ) {
	const buildWithAIElement = document.createElement( 'div' );
	buildWithAIElement.classList.add( 'theme', 'build-with-ai' );
	buildWithAIElement.style.height = `${ themeDiv.offsetHeight }px`;

	const newLink = document.createElement( 'span' );
	newLink.classList.add( 'build-with-ai__link' );

	const themeScreenshot = document.createElement( 'div' );
	themeScreenshot.classList.add( 'build-with-ai__icon' );

	const iconSpan = document.createElement( 'span' );
	iconSpan.classList.add( 'build-with-ai__icon-span' );
	iconSpan.appendChild( createSVGIcon() );
	themeScreenshot.appendChild( iconSpan );

	const themeName = document.createElement( 'h2' );
	themeName.classList.add( 'build-with-ai__text' );
	themeName.textContent = window.nfdOnboardingRestartMeta?.buttonText;

	newLink.appendChild( themeScreenshot );
	newLink.appendChild( themeName );
	buildWithAIElement.appendChild( newLink );

	buildWithAIElement.addEventListener( 'click', () => {
		window.location.href =
			window.nfdOnboardingRestartMeta?.buttonHref + '&restart=theme';
	} );

	return buildWithAIElement;
}

// Function to handle the appearance of the themeDiv
function handleThemeDivAppearance() {
	const themeDiv = document.querySelector( '.add-new-theme' );

	if ( themeDiv && ! buildWithAIInserted ) {
		// Check if the element exists and hasn't been inserted yet

		const buildWithAIElement = createBuildWithAIElement( themeDiv );
		themeDiv.parentNode.insertBefore( buildWithAIElement, themeDiv );

		buildWithAIInserted = true; // Set the flag to true after insertion
	}
}

// Setting up MutationObserver to detect the appearance of the themeDiv element
function observeForThemeDiv() {
	// eslint-disable-next-line no-undef
	const observerObj = new MutationObserver( ( mutationsList ) => {
		mutationsList.forEach( ( mutation ) => {
			if ( mutation.type === 'childList' ) {
				handleThemeDivAppearance(); // Check for the element whenever the DOM changes
			}
		} );
	} );

	observerObj.observe( document.body, {
		childList: true,
		subtree: true,
	} );
}

// Wait for the DOM to be fully loaded and then start observing
window.addEventListener( 'DOMContentLoaded', function () {
	observeForThemeDiv();
} );
