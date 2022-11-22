import { Icon, help, search } from '@wordpress/icons'; 

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
                className="checkbox-item-checkbox"
                label={
                    <div className="checkbox-item__contents">
                        <div className="checkbox-item__contents-icon">
                            <Icon
                                icon={search}
                                style={{
                                    fill: 'var(--wp-admin-theme-color-darker-10)',
                                }}
                            />
                        </div>
                        <div className="checkbox-item__contents-text">
                            <p className="checkbox-item__contents-text-title">{title}</p>
                            <p className="checkbox-item__contents-text-subtitle">{subtitle}</p>
                        </div>
                        <div className="checkbox-item__contents-help">
                            <Icon
                                icon={help}
                                style={{
                                    fill: 'var(--wp-admin-theme-color-darker-10)',
                                }}
                            />
                        </div>
                    </div>
                }/>
        </div>
    );
};

export default CheckboxItem;
