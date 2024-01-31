window.onload = function () {
	const homepages = window.nfdOnboarding.homepages.data;
	const activeTheme = window.nfdOnboarding.active;
	Object.keys( homepages ).forEach( ( slug ) => {
		const homepage = homepages[ slug ];
		const ele = document.getElementById( `${ slug }-name` );
		if ( ele ) {
			ele.innerHTML =
				( activeTheme === slug ? '<span>Active:</span>' : '' ) +
				`<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M10 19.6584L8.975 18.7334C7.20833 17.1167 5.75 15.7209 4.6 14.5459C3.45 13.3709 2.53333 12.3209 1.85 11.3959C1.16667 10.4709 0.6875 9.63338 0.4125 8.88337C0.1375 8.13337 0 7.37504 0 6.60837C0 5.10837 0.504167 3.85421 1.5125 2.84587C2.52083 1.83754 3.76667 1.33337 5.25 1.33337C6.2 1.33337 7.07917 1.55837 7.8875 2.00837C8.69583 2.45837 9.4 3.10837 10 3.95837C10.7 3.05837 11.4417 2.39587 12.225 1.97087C13.0083 1.54587 13.85 1.33337 14.75 1.33337C16.2333 1.33337 17.4792 1.83754 18.4875 2.84587C19.4958 3.85421 20 5.10837 20 6.60837C20 7.37504 19.8625 8.13337 19.5875 8.88337C19.3125 9.63338 18.8333 10.4709 18.15 11.3959C17.4667 12.3209 16.55 13.3709 15.4 14.5459C14.25 15.7209 12.7917 17.1167 11.025 18.7334L10 19.6584Z" fill="#EF4A71"/>
               </svg>
               ` +
				`<svg width="24" height="25" viewBox="0 0 24 25" class="nfd-onboarding-sitegen-theme-marker-filled" fill="none" xmlns="http://www.w3.org/2000/svg">
               <rect x="0.5" y="1" width="23" height="23" rx="5.5" stroke="white"/>
               <path d="M6.85742 16L9.54834 8.24951H11.4551L14.1514 16H12.4434L11.8687 14.1201H9.13477L8.56006 16H6.85742ZM10.4561 9.79639L9.50537 12.9062H11.498L10.5527 9.79639H10.4561ZM14.9673 16V8.24951H16.5894V16H14.9673Z" fill="white"/>
               </svg>               
               ` +
				`<span class="nfd-onboarding-sitegen-theme-marker-title">${ homepage.title }</span>`;
		}
	} );
};
