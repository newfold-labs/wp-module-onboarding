const HelpPanel = ( {
	children,
	baseClassName = 'nfd-onboarding-sidebar-learn-more--help-panel',
} ) => {
	return <div className={ `${ baseClassName }__links` }>{ children }</div>;
};

export default HelpPanel;
