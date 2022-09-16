import { findIndex } from 'lodash';

export const insertBeforeStep = (steps, path, newStep) => {};

export const insertAfterStep = (steps, path, newStep) => {};

export const insertStepAtIndex = (steps, index, newStep) => {};

export const findStepIndex = ( steps, path ) => {
	const index = findIndex( steps, { path } );

	return -1 !== index ? index : false;
};

export const getQueryParam = ( paramName ) => {
	const urlParams = new URLSearchParams( location.search );
	return urlParams.get( paramName );
};
