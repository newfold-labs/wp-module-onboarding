const ActionButton = ( { onClick, children, primary } ) => (
	<button
		type="button"
		className={ `nfd-text-sm nfd-font-medium nfd-px-4 nfd-py-1.5 nfd-rounded-lg nfd-border nfd-border-solid nfd-cursor-pointer ${
			primary
				? 'nfd-bg-primary nfd-border-primary nfd-text-white'
				: 'nfd-bg-white nfd-border-[rgba(0,0,0,0.15)] nfd-text-[#333]'
		}` }
		onClick={ onClick }
	>
		{ children }
	</button>
);

export default ActionButton;
