import { __ } from '@wordpress/i18n';

const DesignThemes = () => {
	return (
		<div style={{ padding: '0 16px' }}>
			<h2>{__('Pick a Theme', 'wp-module-onboarding')}</h2>
			<h4>{__('No Theme Selected', 'wp-module-onboarding')}</h4>
			<p>
				{__('Panel will show contextual help', 'wp-module-onboarding')}
			</p>
			<h4>{__('With Theme Selected', 'wp-module-onboarding')}</h4>
			<p>
				{__(
					'Panel will show single-column of other Themes.',
					'wp-module-onboarding'
				)}
			</p>
		</div>
	);
};

export default DesignThemes;
