
const ImportSite = ( { importtext, importlink } ) => {
	return (
		<div className="">
			<a className="nfd-sitegen-importsite" href={ importlink }>{ importtext }</a>
		</div>

	);
};

export default ImportSite;
