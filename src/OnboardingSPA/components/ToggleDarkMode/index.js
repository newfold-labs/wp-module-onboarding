import { ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const ToggleDarkMode = () => {
    const [ isChecked, setChecked ] = useState( false );

    const onChange = ( value ) => {
        setChecked( value );
        // Handle the toggle action here
    };

    return (
        <div className='nfd-sitegen-darkmode-wrapper'>
            <ToggleControl
                label="Dark Mode"
                checked={ isChecked }
                onChange={ onChange }
                />
        </div>
    );
};

export default ToggleDarkMode;
