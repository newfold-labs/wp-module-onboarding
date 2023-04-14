import { PanelBody } from '@wordpress/components';

const IllustrationPanel = ( {
	cssIcon = 'nfd-onboarding-sidebar-learn-more-get-started-welcome-illustration',
	baseClassName = 'nfd-onboarding-sidebar-learn-more--illustration-panel',
	backgroundPosition = 'center',
} ) => {
	const iconExists =
		window
			.getComputedStyle( document.body )
			.getPropertyValue( `--${ cssIcon }` ) !== '';

	return (
		iconExists && (
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
						backgroundPosition,
					} }
				></div>
			</PanelBody>
		)
	);
};

export default IllustrationPanel;
