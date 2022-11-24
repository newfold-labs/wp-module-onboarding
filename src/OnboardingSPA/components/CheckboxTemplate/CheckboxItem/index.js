import { useState } from '@wordpress/element';
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

const CheckboxItem = ({ key, icon, title, subtitle, desc, callback }) => {
   
    const [isSelected, setIsSelected] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    const handleCheck = () => {
        setIsSelected(!isSelected);
    };

    const handleShowDesc = () => {
        setShowDescription(!showDescription);
    };

    return (
        <div className={`checkbox-item ${showDescription && 'checkbox-item--active'}`}>
            <div className="checkbox-item-container" >
                <CheckboxControl
                    checked={isSelected}
                    onChange={handleCheck}
                    className="checkbox-item-checkbox" />
                <div className='checkbox-item__contents'>
                    <div className={`checkbox-item__contents-icon ${showDescription && 'checkbox-item__contents-icon--active'}`}>
                        <Icon
                            icon={search}
                            style={{
                                width: '35px',
                                height: '35px',
                                fill: `${showDescription ? '#000000' : '#FFFFFF'}`,
                            }}
                        />
                    </div>
                    <div className="checkbox-item__contents-text">
                        <div className="checkbox-item__contents-text-title">{title}</div>
                        <div className="checkbox-item__contents-text-subtitle">{subtitle}</div>
                    </div>
                    <div className='checkbox-item__contents-help'
                        onClick={handleShowDesc}>
                        <Icon
                            icon={help}
                            style={{
                                width: '33px',
                                height: '33px',
                                fill: `${showDescription ? '#1C5CBA' : '#666666'}`,
                            }}
                        />
                    </div>
                </div>
            </div>
            {showDescription && <div className="checkbox-item__desc">{desc}</div>}
        </div>
    );
};

export default CheckboxItem;
