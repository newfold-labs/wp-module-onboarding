const ProgressBarSiteGen = ( { current, total } ) => {
	const percentage = ( current / total ) * 100;
	return (
		<div className="nfd-sitegen-progressbar">
			<div className="nfd-sitegen-progressbar-container">
				<div
					className="nfd-sitegen-progressbar-fill"
					style={ { width: `${ percentage }%` } }
				></div>
			</div>
		</div>
	);
};

export default ProgressBarSiteGen;
