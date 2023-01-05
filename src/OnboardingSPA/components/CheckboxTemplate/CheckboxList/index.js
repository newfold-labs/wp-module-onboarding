import { CheckboxItem } from '../index';

/**
 * Checkbox List Component
 * This returns a List of Checkbox Items to be placed dynamically on screen
 *
 * @param          customItemsList.callback
 * @param {Object} customItemsList                   - The List to be shown with a Title, Subtitle and a Description
 *
 * @param          customItemsList.selectedItems
 * @param          customItemsList.customItemsList
 * @return CheckboxList
 */
const CheckboxList = ( { callback, selectedItems, customItemsList } ) => {

	const length = Object.keys(customItemsList).length;

	const buildCheckboxItems = () => {
		var customItems = [];

		for (const key in customItemsList) {
			var item = customItemsList[key];
			const isSelectedDefault = selectedItems[item.slug];
			customItems.push(
				<CheckboxItem
					name={item.slug}
					icon={item.icon}
					title={item.title}
					subtitle={item.subtitle}
					desc={item.desc}
					callback={callback}
					isSelectedDefault={isSelectedDefault ?? false}
				/>
			);
		}

		return customItems;
	};

	return (
		<div className="checkbox-list">
			<div className="checkbox-list-col">
				{ buildCheckboxItems().slice(
					0,
					Math.floor( length / 2 )
				) }
			</div>
			<div className="checkbox-list-col">
				{ buildCheckboxItems().slice(
					Math.floor( length / 2 ),
					length
				) }
			</div>
		</div>
	);
};

export default CheckboxList;
