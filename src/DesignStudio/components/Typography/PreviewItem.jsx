/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { check, Icon } from '@wordpress/icons';

export default function TypographyPreviewItem( {
	headingFontFamily,
	bodyFontFamily,
	tooltipText,
	onClick,
	isSelected,
} ) {
	const [ isUpdating, setIsUpdating ] = useState( false );

	const handleClick = async () => {
		if ( onClick && ! isUpdating ) {
			setIsUpdating( true );
			onClick();
			setIsUpdating( false );
		}
	};

	const handleKeyDown = ( event ) => {
		if ( onClick && ( event.key === 'Enter' || event.key === ' ' ) ) {
			event.preventDefault();
			handleClick();
		}
	};

	return (
		<div
			className={ `nfd-typography-preview-item ${ isSelected ? 'is-selected' : '' } ${
				isUpdating ? 'is-updating' : ''
			}` }
			onClick={ handleClick }
			role="button"
			tabIndex="0"
			onKeyDown={ handleKeyDown }
		>
			<p className="nfd-typography-preview-heading" style={ { fontFamily: headingFontFamily } }>
				{ __( 'Heading', 'nfd-onboarding' ) }
			</p>

			<p className="nfd-typography-preview-body" style={ { fontFamily: bodyFontFamily } }>
				{ __( 'Paragraph text in your chosen font.', 'nfd-onboarding' ) }
			</p>

			<div className="nfd-typography-preview-label">{ tooltipText }</div>

			{ isSelected && (
				<span className="nfd-typography-selected-indicator">
					<Icon icon={ check } size={ 20 } />
				</span>
			) }
		</div>
	);
}
