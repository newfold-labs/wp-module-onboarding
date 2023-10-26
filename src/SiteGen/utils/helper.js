export const addThemeSuffix = ( className ) => {
	const themeState = true;
	return themeState ? className : `${ className } ${ className }--dark`;
};
