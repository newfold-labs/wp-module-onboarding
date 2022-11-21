/**
 * Checkbox Item Component
 * This returns a Single Element with a toggable description
 *
 * @returns CheckboxItem
 */

const CheckboxItem = ({ title, subtitle, desc }) => {
   
    return (
        <div>
            {title}
            {subtitle}
        </div>
    );
};

export default CheckboxItem;
