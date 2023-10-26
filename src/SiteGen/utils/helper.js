export const addThemeSuffix = ( className ) => {
	const themeState = false;
	return themeState ? className : `${ className } ${ className }--dark`;
};
