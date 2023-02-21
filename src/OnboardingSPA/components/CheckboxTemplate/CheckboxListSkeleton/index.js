import Animate from '../../Animate';

/**
 * Checkbox List Skeleton Component
 * This returns a List of Checkbox Items Skeletons to imitate loading
 *
 * @param  customItemsList.count
 * @param  customItemsList.count.count
 * @return CheckboxList
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
