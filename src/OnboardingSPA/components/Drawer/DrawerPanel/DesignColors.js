import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
const DesignColors = () => {
	return (
		<div style={{ padding: '0 16px' }}>
			<h2>{__('Pick Color Palette', 'wp-module-onboarding')}</h2>
			<p>
				{__(
					'If user has opted for custom design, panel will show color palettes to affect preview pane.',
					'wp-module-onboarding'
				)}
			</p>
		</div>
	);
};

export default DesignColors;
