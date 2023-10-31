import Animate from '../../../../Shared/Animate';

/**
 * Checkbox List Skeleton Component
 * This returns a List of Checkbox Items Skeletons to imitate loading
 *
 * @param {Object} customItemsList             - Object containing the count properties.
 * @param {number} customItemsList.count       - Some description for this count.
 * @param {number} customItemsList.count.count - Some description for this nested count.
 * @return {Object} CheckboxList - A React component.
 */

const CheckboxListSkeleton = ( { count } ) => {
	const buildCheckboxSkeletonItems = () => {
		const customItems = [];

		for ( let idx = 0; idx < count; idx++ )
			customItems.push(
				<Animate
					type={ 'shine-placeholder' }
					className="checkbox-skeleton-item"
				/>
			);

		return customItems;
	};

	return (
		<div className="checkbox-list">
			<div className="checkbox-list-col">
				{ buildCheckboxSkeletonItems().slice(
					0,
					Math.floor( count / 2 )
				) }
			</div>
			<div className="checkbox-list-col">
				{ buildCheckboxSkeletonItems().slice(
					Math.floor( count / 2 ),
					count
				) }
			</div>
		</div>
	);
};

export default CheckboxListSkeleton;
