import { PanelBody } from '@wordpress/components';

const Illustration = ( {
	cssIcon = 'nfd-onboarding-sidebar-learn-more-get-started-welcome-illustration',
	baseClassName = 'nfd-onboarding-sidebar-learn-more--illustration',
} ) => {
	return (
		<PanelBody
			className={ `${ baseClassName }__container` }
			initialOpen={ true }
		>
			<div
				className={ `${ baseClassName }__image` }
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
