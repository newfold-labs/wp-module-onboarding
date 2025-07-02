/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import {
	FlexItem,
	__experimentalHStack as HStack,
	Icon,
	__experimentalItem as Item,
	Navigator,
} from '@wordpress/components';

function GenericNavigationButton( { icon, children, ...props } ) {
	return (
		<Item { ...props }>
			{ icon && (
				<HStack justify="flex-start">
					<Icon icon={ icon } size={ 24 } />
					<FlexItem>{ children }</FlexItem>
				</HStack>
			) }
			{ ! icon && children }
		</Item>
	);
}

function NavigationButton( props ) {
	return <Navigator.Button as={ GenericNavigationButton } { ...props } />;
}

function NavigationBackButton( props ) {
	return <Navigator.BackButton as={ GenericNavigationButton } { ...props } />;
}

export { NavigationBackButton, NavigationButton };
