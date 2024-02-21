import classNames from 'classnames';
import { memo } from '@wordpress/element';
import { Icon, chevronRight } from '@wordpress/icons';

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
				<Icon
					className={ 'nfd__option_heading_subheading__right' }
					icon={ chevronRight }
				/>
			</div>
		</div>
	);
};

export default memo( OptionWithHeadingSubHeading );
