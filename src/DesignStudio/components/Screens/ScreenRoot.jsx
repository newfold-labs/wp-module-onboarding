/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import {
	Card,
	CardBody,
	__experimentalVStack as VStack,
	__experimentalItemGroup as ItemGroup,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { color, typography, image } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { NavigationButton } from '../ScreenHeader/NavigationButton';

/**
 * Root screen for the Design Studio sidebar
 */
export default function ScreenRoot() {
	return (
		<Card size="small" isBorderless className="nfd-design-studio-screen-root" isRounded={ false }>
			<CardBody>
				<VStack spacing={ 4 }>
					{ /* <Card className="edit-site-global-styles-screen-root__active-style-tile">
						<CardMedia className="edit-site-global-styles-screen-root__active-style-tile-preview">
							<PreviewStyles />
						</CardMedia>
					</Card> */ }

					<ItemGroup>
						<NavigationButton icon={ image } path="/logo">
							{ __( 'Logo', 'wp-plugin-bluehost' ) }
						</NavigationButton>

						<NavigationButton icon={ color } path="/colors">
							{ __( 'Colors', 'wp-plugin-bluehost' ) }
						</NavigationButton>

						<NavigationButton icon={ typography } path="/typography">
							{ __( 'Typography', 'wp-plugin-bluehost' ) }
						</NavigationButton>
					</ItemGroup>
				</VStack>
			</CardBody>
		</Card>
	);
}
