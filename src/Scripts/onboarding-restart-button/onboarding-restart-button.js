window.onload = function () {
	// Find the Add New Theme button
	const themeDiv = document.querySelector('.add-new-theme');

	// Check if the element exists
	if (themeDiv) {
		// Create a new 'Build with AI' element with a custom class
		const buildWithAIElement = document.createElement('div');
		buildWithAIElement.classList.add('theme', 'build-with-ai');

		buildWithAIElement.style.height = `${themeDiv.offsetHeight}px`;

		// Create an anchor (<a>) element
		const newLink = document.createElement('a');
		newLink.classList.add('build-with-ai__link');
		newLink.setAttribute(
			'href',
			window.nfdOnboardingRestartMeta?.buttonHref
		); // Set the href attribute

		// Create the theme screenshot div
		const themeScreenshot = document.createElement('div');
		themeScreenshot.classList.add('build-with-ai__icon');
		const span = document.createElement('span');
		span.classList.add('build-with-ai__icon-span');
		themeScreenshot.appendChild(span);

		// Create the theme name (h2) element
		const themeName = document.createElement('h2');
		themeName.classList.add('build-with-ai__text');
		themeName.textContent = window.nfdOnboardingRestartMeta?.buttonText;

		// Assemble the new element
		newLink.appendChild(themeScreenshot);
		newLink.appendChild(themeName);
		buildWithAIElement.appendChild(newLink);

		// Add the new 'Build with AI' element before the 'Add New Theme' Button
		themeDiv.parentNode.insertBefore(buildWithAIElement, themeDiv);
	}
};
