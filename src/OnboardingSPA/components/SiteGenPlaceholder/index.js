import NextButtonSiteGen from '../Button/NextButtonSiteGen';

const SiteGenPlaceholder = ( { heading } ) => {
	return (
		<div className="nfd-onboarding-placeholder--site-gen">
			<h1 className="nfd-onboarding-placeholder--site-gen__heading">
				{ heading }
			</h1>
			<NextButtonSiteGen text={ 'Go Next' } />
		</div>
	);
};

export default SiteGenPlaceholder;
