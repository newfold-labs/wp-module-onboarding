import { PanelBody } from '@wordpress/components';

const Illustration = ( {
	cssIcon = 'nfd-onboarding-sidebar-learn-more-get-started-welcome-illustration',
	baseClassName = 'nfd-onboarding-sidebar-learn-more',
} ) => {
	return (
		<PanelBody
			className={ `${ baseClassName }--illustration` }
			initialOpen={ true }
		>
			<div
				className={ `${ baseClassName }--illustration__image` }
				style={ {
					backgroundImage: `var(--${ cssIcon })`,
					width: '100%',
					height: '100%',
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
				} }
			></div>
		</PanelBody>
	);
};

export default Illustration;
