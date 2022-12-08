const SupportLink = ( {
	baseClassName = 'nfd-onboarding-sidebar-learn-more--support-link',
	link = '#',
	text,
} ) => {
	return (
		<a href={ link } className={ baseClassName } target={ '_blank' }>
			{ text }
		</a>
	);
};

export default SupportLink;
