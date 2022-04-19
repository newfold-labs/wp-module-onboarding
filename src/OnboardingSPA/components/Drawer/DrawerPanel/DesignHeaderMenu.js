import { __ } from '@wordpress/i18n';

const DesignHeaderMenu = () => {
	return (
		<div style={{ padding: '0 16px' }}>
			<h2>{__('Pick a Header & Menu Style', 'wp-module-onboarding')}</h2>
			<p>
				{__(
					'Panel will show a few Header Patterns to affect preview pane.',
					'wp-module-onboarding'
				)}
			</p>
		</div>
	);
};

export default DesignHeaderMenu;
