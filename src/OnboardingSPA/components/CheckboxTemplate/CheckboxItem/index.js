import { CheckboxControl } from '@wordpress/components';

/**
 * Checkbox Item Component
 * This returns a Single Element with a toggable description
 *
 * @param {string} icon - The icon name of the Item
 * @param {string} title - The Main Title of the Item
 * @param {string} subtitle - The Sub Title of the Item
 * @param {string} desc - The Description of the Item
 * 
 * @returns CheckboxItem
 */

const CheckboxItem = ({ icon, title, subtitle, desc }) => {
   
    return (
        <div className="checkbox-item">
            <CheckboxControl 
                label={
                    <div>
                        {title}
                        {subtitle}
                    </div>
                }/>
        </div>
    );
};

export default CheckboxItem;
