/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack, Tooltip } from '@wordpress/components';

export default function ColorPaletteItem( { palette, isActive, onSelect } ) {
	const handleKeyDown = ( event ) => {
		if ( event.key === 'Enter' || event.key === ' ' ) {
			event.preventDefault();
			onSelect( palette.name );
		}
	};

	// Extract colors from the palette structure
	const colorSwatches = palette.displayColors.map( ( item ) => item.color );

	return (
		<Tooltip text={ palette.title }>
			<div
				className={ `edit-site-global-styles-variations_item ${ isActive ? 'is-active' : '' }` }
				role="button"
				onClick={ () => onSelect( palette.name ) }
				onKeyDown={ handleKeyDown }
				tabIndex="0"
				aria-label={ palette.title }
				aria-current={ isActive }
			>
				<div className="edit-site-global-styles-variations_item-preview is-pill">
					<HStack spacing={ 0 } justify="flex-start" style={ { height: '100%', width: '100%' } }>
						{ colorSwatches.map( ( color, index ) => (
							<div
								key={ `${ palette.name }-color-${ index }` }
								style={ {
									flexGrow: 1,
									height: '100%',
									background: color,
								} }
							/>
						) ) }
					</HStack>
				</div>
			</div>
		</Tooltip>
	);
}
