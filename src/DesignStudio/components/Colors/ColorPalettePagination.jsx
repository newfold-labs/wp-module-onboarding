/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import { Button, __experimentalHStack as HStack } from '@wordpress/components';
import { chevronLeft, chevronRight } from '@wordpress/icons';

export default function ColorPalettePagination( {
	currentPage,
	totalPages,
	onPageChange,
	isLoading,
} ) {
	if ( totalPages <= 1 ) {
		return null;
	}

	return (
		<div className="nfd-design-studio-color-palette-pagination">
			<HStack spacing={ 2 } justify="center">
				<Button
					icon={ chevronLeft }
					onClick={ () => onPageChange( currentPage - 1 ) }
					disabled={ currentPage === 1 || isLoading }
					className="nfd-design-studio-color-palette-nav-button"
				/>
				<span className="nfd-design-studio-color-palette-page-info">
					{ currentPage } / { totalPages }
				</span>
				<Button
					icon={ chevronRight }
					onClick={ () => onPageChange( currentPage + 1 ) }
					disabled={ currentPage === totalPages || isLoading }
					className="nfd-design-studio-color-palette-nav-button"
				/>
			</HStack>
		</div>
	);
}
