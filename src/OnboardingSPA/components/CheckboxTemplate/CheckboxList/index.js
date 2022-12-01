import { CheckboxItem } from '../index';

/**
 * Checkbox List Component
 * This returns a List of Checkbox Items to be placed dynamically on screen
 *
 * @param          customPluginsList.callback
 * @param {Object} customPluginsList                   - The List to be shown with a Title, Subtitle and a Description
 *
 * @param          customPluginsList.selectedPlugins
 * @param          customPluginsList.customPluginsList
 * @return CheckboxList
 */
const CheckboxList = ( { callback, selectedPlugins, customPluginsList } ) => {
	const buildCheckboxItems = () => {
		return customPluginsList.map( ( item, idx ) => {
			const isSelectedDefault = selectedPlugins[ item.slug ];
			return (
				<CheckboxItem
					slug={ item.slug }
					icon={ item.icon }
					title={ item.title }
					subtitle={ item.subtitle }
					desc={ item.desc }
					callback={ callback }
					isSelectedDefault={ isSelectedDefault ?? false }
				/>
			);
		} );
	};

	return (
		<div className="checkbox-list">
			<div className="checkbox-list-col">
				{ buildCheckboxItems().slice(
					0,
					Math.floor( customPluginsList.length / 2 )
				) }
			</div>
			<div className="checkbox-list-col">
				{ buildCheckboxItems().slice(
					Math.floor( customPluginsList.length / 2 ),
					customPluginsList.length
				) }
			</div>
		</div>
	);
};

export default CheckboxList;
