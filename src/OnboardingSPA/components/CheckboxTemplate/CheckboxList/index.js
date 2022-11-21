import { CheckboxItem } from "../index";


/**
 * Checkbox List Component
 * This returns a List of Checkbox Items to be placed dynamically on screen
 *
 * @returns CheckboxList
 */
const CheckboxList = ({ data }) => {

    const buildCheckboxItems = () => {
        return data.map((item, idx) => {
            return <CheckboxItem 
                title={item.title} 
                subtitle={item.subtitle} 
                desc={item.desc} />
        });
    }

    return (
        <div>
            HEy
            { buildCheckboxItems() }
        </div>
    );
};

export default CheckboxList;
