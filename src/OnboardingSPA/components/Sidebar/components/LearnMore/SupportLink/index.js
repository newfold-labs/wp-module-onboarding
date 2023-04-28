const SupportLink = ( {
	baseClassName = 'nfd-onboarding-sidebar-learn-more--support-link',
	link = '#',
	text,
} ) => {
	return (
		link !== '' && (
			<a
				href={ link }
				className={ baseClassName }
				target={ '_blank' }
				rel="noreferrer"
			>
				{ text }
			</a>
		)
	);
};

export default SupportLink;
