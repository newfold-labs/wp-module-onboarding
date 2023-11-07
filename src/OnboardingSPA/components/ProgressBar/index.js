const ProgressBar = ( { progress = 20 } ) => {
	return (
		<div className="nfd-onboarding-header__progress-bar">
			<div
				style={ { width: `${ progress }%` } }
				className="nfd-onboarding-header__progress-bar__progress"
			></div>
		</div>
	);
};

export default ProgressBar;
