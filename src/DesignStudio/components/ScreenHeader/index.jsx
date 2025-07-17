/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import {
	__experimentalHeading as Heading,
	__experimentalHStack as HStack,
	Navigator,
	__experimentalSpacer as Spacer,
	__experimentalView as View,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { __, isRTL } from '@wordpress/i18n';
import { chevronLeft, chevronRight } from '@wordpress/icons';

function ScreenHeader( { title, description, onBack } ) {
	return (
		<VStack spacing={ 0 }>
			<View>
				<Spacer marginBottom={ 0 } paddingX={ 4 } paddingY={ 3 }>
					<HStack spacing={ 2 }>
						<Navigator.BackButton
							icon={ isRTL() ? chevronRight : chevronLeft }
							size="small"
							label={ __( 'Back' ) }
							onClick={ onBack }
						/>
						<Spacer>
							<Heading className="edit-site-global-styles-header" level={ 2 } size={ 13 }>
								{ title }
							</Heading>
						</Spacer>
					</HStack>
				</Spacer>
			</View>
			{ description && <p className="nfd-design-studio-header-description">{ description }</p> }
		</VStack>
	);
}

export default ScreenHeader;
