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

	function buildPalettes () {
		let paletteRenderedList = [];
		for (const colorName in colorPalettes) {
			paletteRenderedList.push(
				<div className='color-palette'>
					<div className='color-palette-colors'>
						<div className='color-palette-colors-tert'
							style={{ backgroundColor: `${colorPalettes[colorName][0]}` }}/>
						<div className='color-palette-colors-scnd'
							style={{ backgroundColor: `${colorPalettes[colorName][1]}` }}/>
						<div className='color-palette-colors-prim'
							style={{ backgroundColor: `${colorPalettes[colorName][2]}` }} />
					</div>
					<div className='color-palette-name'>
						{colorName?.charAt(0).toUpperCase() + colorName?.slice(1) }
					</div>
				</div>
			);
		}

		return paletteRenderedList;
	}

	return (
		<div style={{ padding: '0 4px' }}>
			<h2>{__('Color Palettes', 'wp-module-onboarding')}</h2>
			{buildPalettes()}
		</div>
	);
};

export default DesignColors;
