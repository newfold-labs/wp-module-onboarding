import { CheckboxItem } from "../index";


/**
 * Checkbox List Component
 * This returns a List of Checkbox Items to be placed dynamically on screen
 * 
 * @param {Object} customPluginsList - The List to be shown with a Title, Subtitle and a Description
 * 
 * @returns CheckboxList
 */
const CheckboxList = ({ customPluginsList }) => {

    const buildCheckboxItems = () => {
        return customPluginsList.map((item, idx) => {
            return (
                <CheckboxItem
                    icon={item.icon}
                    title={item.title}
                    subtitle={item.subtitle}
                    desc={item.desc} />
                )
        });
    }

    return (
        <div className="checkbox-list">
            <div className="checkbox-list-col">
                {buildCheckboxItems().slice(0, Math.floor(customPluginsList.length/2))}
            </div>
            <div className="checkbox-list-col">
                {buildCheckboxItems().slice(Math.floor(customPluginsList.length / 2), customPluginsList.length)}
            </div>
        </div>
    );
};

export default CheckboxList;
