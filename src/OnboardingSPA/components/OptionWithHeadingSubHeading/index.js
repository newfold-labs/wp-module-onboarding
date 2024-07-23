import classNames from 'classnames';
import { memo } from '@wordpress/element';

const OptionWithHeadingSubHeading = ( {
	idx,
	title,
	desc,
	isSelected,
	callback,
} ) => {
	return (
		<div
			key={ idx }
			role="button"
			tabIndex={ 0 }
			className={ 'nfd__option_heading_subheading' }
			onClick={ () => {
				if ( callback && typeof callback === 'function' ) {
					callback( idx + 1 );
				}
			} }
			onKeyDown={ () => {
				if ( callback && typeof callback === 'function' ) {
					callback( idx + 1 );
				}
			} }
		>
			<div
				className={ classNames(
					'nfd__option_heading_subheading__wrapper',
					isSelected &&
						'nfd__option_heading_subheading__wrapper--selected'
				) }
			>
				<div className={ 'nfd__option_heading_subheading__radio_button' }>
					<input
						type="radio"
						name="nfd__option_radio_button"
						checked={ isSelected }
					/>
				</div>
				<div className={ 'nfd__option_heading_subheading__left' }>
					<div
						className={ 'nfd__option_heading_subheading__left_top' }
					>
						{ title }
					</div>
					<div
						className={
							'nfd__option_heading_subheading__left_bottom'
						}
					>
						{ desc }
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo( OptionWithHeadingSubHeading );
