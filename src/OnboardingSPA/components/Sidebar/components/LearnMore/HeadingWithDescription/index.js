import { Fragment } from '@wordpress/element';

const HeadingWithDescription = ( {
	heading,
	description,
	baseClassName = 'nfd-onboarding-sidebar-learn-more--heading-with-description',
} ) => {
	return (
		<Fragment>
			<h3 className={ `${ baseClassName }__heading` }>{ heading }</h3>
			<p className={ `${ baseClassName }__description` }>
				{ description }
			</p>
		</Fragment>
	);
};

export default HeadingWithDescription;
