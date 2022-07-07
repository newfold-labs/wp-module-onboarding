import { __ } from '@wordpress/i18n';

const StartSetupExperience = () => {
	return (
		<div style={{ padding: '0 16px' }}>
			<h2>{__('WP Experience Level', 'wp-module-onboarding')}</h2>
			<p>
				{__(
					'Based on the user input, the onboarding steps would display accordingly.',
					'wp-module-onboarding'
				)}
			</p>
		</div>
	);
};

export default StartSetupExperience;
