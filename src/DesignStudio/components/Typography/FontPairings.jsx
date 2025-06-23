/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import { Spinner, __experimentalVStack as VStack } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useFontPairings } from '../../hooks/useFontPairings';
import { ucwords } from '../../utils/text';
import TypographyPreviewItem from './PreviewItem';

export default function FontPairings( { selectedStyle, onSelectStyle } ) {
	const { fontPairings, isLoading, error } = useFontPairings();

	if ( isLoading ) {
		return <Spinner />;
	}

	if ( error ) {
		return <div>Error loading font pairings: { error }</div>;
	}

	return (
		<VStack spacing={ 4 }>
			{ fontPairings.map( ( style ) => (
				<TypographyPreviewItem
					key={ style.id }
					headingFontFamily={ style.headingFontFamily }
					bodyFontFamily={ style.bodyFontFamily }
					tooltipText={ `${ ucwords( style.aesthetics ) } • ${ style.title }` }
					onClick={ () => onSelectStyle( style ) }
					isSelected={ selectedStyle === style.id }
				/>
			) ) }
		</VStack>
	);
}
