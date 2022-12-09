
/**
 * Checkbox List Skeleton Component
 * This returns a List of Checkbox Items Skeletons to imitate loading
 *
 * @param          customItemsList.count
 * @return CheckboxList
 */
const CheckboxListSkeleton = ({ count }) => {

    const buildCheckboxSkeletonItems = () => {
        var customItems = [];

        for (let idx = 0; idx < count; idx++) 
            customItems.push(  <div className="checkbox-skeleton-item shimmer"/>);
        
        return customItems;
    };

    return (
        <div className="checkbox-list">
            <div className="checkbox-list-col">
                {buildCheckboxSkeletonItems().slice(
                    0,
                    Math.floor(count / 2)
                )}
            </div>
            <div className="checkbox-list-col">
                {buildCheckboxSkeletonItems().slice(
                    Math.floor(count / 2),
                    count
                )}
            </div>
        </div>
    );
};

export default CheckboxListSkeleton;
