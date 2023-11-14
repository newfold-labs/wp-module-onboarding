const ImportSite = ( { importtext, importlink } ) => {
	return (
		<div className="">
			<br />
			<br />
			<a
				className="nfd-onboarding-step--site-gen__fork__importsite"
				href={ importlink }
			>
				{ importtext }
			</a>
		</div>
	);
};

export default ImportSite;
