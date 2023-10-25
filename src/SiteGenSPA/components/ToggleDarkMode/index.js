import { ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import getContents from './contents';

const ToggleDarkMode = () => {
	const [ isChecked, setChecked ] = useState( false );
	const content = getContents();
	const onChange = ( value ) => {
		setChecked( value );
		// Handle the toggle action here
	};

	return (
		<div className="nfd-sitegen-darkmode-wrapper">
			<ToggleControl
				label={ content.label }
				checked={ isChecked }
				onChange={ onChange }
			/>
		</div>
	);
};

export default ToggleDarkMode;
