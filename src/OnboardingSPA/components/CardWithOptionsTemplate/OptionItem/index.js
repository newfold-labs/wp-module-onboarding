import classNames from 'classnames';
import { memo } from '@wordpress/element';
import { Icon, chevronRight } from '@wordpress/icons';

const OptionItem = ( { idx, title, desc, isSelected, callback } ) => {
	return (
		<div
			key={ idx }
			role="button"
			tabIndex={ 0 }
			className={ 'nfd-sg-card__data__option' }
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
					'nfd-sg-card__data__option__wrapper',
					isSelected && 'nfd-sg-card__data__option__wrapper--selected'
				) }
			>
				<div className={ 'nfd-sg-card__data__option__left' }>
					<div className={ 'nfd-sg-card__data__option__left_top' }>
						{ title }
					</div>
					<div className={ 'nfd-sg-card__data__option__left_bottom' }>
						{ desc }
					</div>
				</div>
				<Icon
					className={ 'nfd-sg-card__data__option__right' }
					icon={ chevronRight }
				/>
			</div>
		</div>
	);
};

export default memo( OptionItem );
