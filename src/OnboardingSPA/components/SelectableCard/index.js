import { __ } from '@wordpress/i18n';
import { check, Icon } from '@wordpress/icons';
import { Card as WordPressCard } from '@wordpress/components';

/**
 * Interface a Card with standard design.
 *
 * @returns
 */
const SelectableCard = ({ id, path, title, desc, isSelected, onSelectedChange }) => {
	return (
		<WordPressCard className={`nfd-card ${ isSelected && 'nfd-selected-card-box' }`}
			onClick={e => onSelectedChange(id)} >
			<div className="nfd-card__top_row">
				<div className="nfd-card__icon">
					<div className={`${ isSelected ? 'nfd-card__icon_box nfd-card__icon_box-selected' : 'nfd-card__icon_box'}`} style={{ backgroundImage: `var(${path})`}}></div>
				</div>
				<div className={`${ isSelected ? 'nfd-card__icon_selected' : 'nfd-card__icon_unselected'}`}>
					<Icon
						className="nfd-card__icon_selected_path"
						icon={check}
						size={64}
					/>
				</div>
			</div>
			<div className={`nfd-card__body ${ isSelected && 'nfd-selected-card'}`}>
				<h2 className="nfd-card__body_title">{__(
					title,
					"wp-module-onboarding"
				)}</h2>
				<p className="nfd-card__body_description">{__(
					desc,
					"wp-module-onboarding"
				)}</p>
			</div>
		</WordPressCard>
	);
};

export default SelectableCard;
