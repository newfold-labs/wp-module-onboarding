
const StartOptions = ( { questionnaire, options } ) => {
	return (
		<div className="">
			<p className="nfd-sitegen-heading__questionnaire">{ questionnaire }</p>
			<div className="nfd-sitegen-options-container">
				{ options.map( ( tab ) => {
					// eslint-disable-next-line react/jsx-key
					return ( <div className="nfd-sitegen-options">
						<h3 className="nfd-sitegen-heading__subtitle">
							{ tab.span && ( <span className="nfd-sitegen-options__span">{ tab.span }</span> ) }
							{ tab.title }
						</h3>
						<p>{ tab.subtitle }</p>
					</div> );
				} ) }

			</div>
		</div>

	);
};

export default StartOptions;
