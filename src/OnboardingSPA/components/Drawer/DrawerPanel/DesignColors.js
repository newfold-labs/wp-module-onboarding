import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
const DesignColors = () => {

	const colorPalettes = {
		'calm': [
			'#C7DBFF',
			'#E6EBEE',
			'#1A4733',
		],
		'cool': [
			'#C7DBFF',
			'#EDF7FE',
			'#21447B',
		],
		'warm': [
			'#FFEDED',
			'#FEF7E8',
			'#7A3921',
		],
		'radiant': [
			'#C7F0FF',
			'#FEF4FB',
			'#63156A',
		],
		'bold': [
			'#F2A3D6',
			'#FFFBF5',
			'#09857C',
		],
		'retro': [
			'#F2E6A2',
			'#F5FFFF',
			'#096385',
		],
		'professional': [
			'#A2C1F2',
			'#F5FAFF',
			'#669933',
		],
	}

	return (
		<div style={{ padding: '0 16px' }}>
			<h2>{__('Color Palettes', 'wp-module-onboarding')}</h2>
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
