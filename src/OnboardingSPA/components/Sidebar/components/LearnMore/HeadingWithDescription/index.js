const HeadingWithDescription = ( {
	headingWithDescription,
	baseClassName = 'nfd-onboarding-sidebar-learn-more',
} ) => {
	return (
		<>
			<p className={ `${ baseClassName }__heading` }>
				{ headingWithDescription.heading }
			</p>
			<p className={ `${ baseClassName }__description` }>
				{ headingWithDescription.description }
			</p>
		</>
	);
};

export default HeadingWithDescription;
