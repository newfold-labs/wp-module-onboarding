import { __ } from '@wordpress/i18n';

const DesignThemeStylesMenu = () => {
	return (
		<div style={ { padding: '0 16px' } }>
			<h2>{ __( 'Pick a Theme Style', 'wp-module-onboarding' ) }</h2>
			<h4>{ __( 'No Style Selected', 'wp-module-onboarding' ) }</h4>
			<p>
				{ __(
					'Panel will show Theme details',
					'wp-module-onboarding'
				) }
			</p>
			<h4>{ __( 'With Style Selected', 'wp-module-onboarding' ) }</h4>
			<p>
				{ __(
					'Panel will show single-column of other Styles.',
					'wp-module-onboarding'
				) }
			</p>
		</div>
	);
};

export default DesignThemeStylesMenu;
