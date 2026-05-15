const Spinner = ( { className = '' } ) => (
	<span
		className={ `nfd-inline-flex nfd-items-center nfd-justify-center nfd-w-3.5 nfd-h-3.5 nfd-shrink-0 ${ className }` }
	>
		<span className="nfd-spinner nfd-w-2.5 nfd-h-2.5 nfd-rounded-full nfd-animate-spin" />
	</span>
);

export default Spinner;
