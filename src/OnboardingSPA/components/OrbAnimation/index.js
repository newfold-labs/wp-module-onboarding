const OrbAnimation = ( { height = '80px' } ) => {
	// Inline style to handle custom properties
	const logoStyle = {
		'--wnd-ai-logo-size': height,
		height: `var(--wnd-ai-logo-size, ${ height })`,
	};

	return (
		<span className="wnd-ai-logo" style={ logoStyle }>
			<span className="wnd-ai-logo__circle wnd-ai-logo__circle--bg"></span>
			<span className="wnd-ai-logo__circle wnd-ai-logo__circle--1"></span>
			<span className="wnd-ai-logo__circle wnd-ai-logo__circle--2"></span>
			<span className="wnd-ai-logo__circle wnd-ai-logo__circle--3"></span>
			<span className="wnd-ai-logo__circle wnd-ai-logo__circle--4"></span>
			<span className="wnd-ai-logo__circle wnd-ai-logo__circle--5"></span>
			<span className="wnd-ai-logo__circle wnd-ai-logo__circle--6"></span>
			<span className="wnd-ai-logo__spinner"></span>
		</span>
	);
};

export default OrbAnimation;
