/**
 * External dependencies
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { find } from 'lodash';

/**
 * WordPress dependencies
 */
import { useState, useEffect, useCallback } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { NavigableMenu } from './navigableContainer';
import { Button } from '@wordpress/components';

const noop = () => {};

const TabButton = ( {
	tabId,
	onClick,
	children,
	selected,
	triggerEvent,
	handleEvent,
	tabName,
	...rest
} ) => {
	const eventProps = useEventTrigger( triggerEvent, handleEvent, tabName );

	return (
		<Button
			role="tab"
			tabIndex={ selected ? null : -1 }
			aria-selected={ selected }
			id={ tabId }
			{ ...eventProps }
			{ ...rest }
		>
			{ children }
		</Button>
	);
};

/* the default will be mouseover and will be click event if triggerEvent="click" is specifically passed */
const useEventTrigger = ( triggerEvent, handleEvent, tabName ) => {
	const eventHandler = useCallback(
		() => handleEvent( tabName ),
		[ handleEvent, tabName ]
	);

	return triggerEvent === 'click'
		? { onClick: eventHandler }
		: { onMouseOver: eventHandler };
};

export default function TabPanelHover( {
	className,
	children,
	tabs,
	initialTabName,
	orientation = 'horizontal',
	activeClass = 'is-active',
	notActiveClass = 'is-not-active',
	callback,
	onSelect = noop,
	triggerEvent,
} ) {
	const instanceId = useInstanceId( TabPanelHover, 'tab-panel' );
	const [ selected, setSelected ] = useState( null );

	const handleEvent = ( tabKey ) => {
		setSelected( tabKey );
		onSelect( tabKey );
		const selectedTab = find( tabs, { name: tabKey } );
		if ( typeof callback === 'function' ) {
			callback( selectedTab );
		}
	};

	const onNavigate = ( childIndex, child ) => {
		child.click();
	};
	const selectedTab = find( tabs, { name: selected } );
	const selectedId = `${ instanceId }-${ selectedTab?.name ?? 'none' }`;

	useEffect( () => {
		const newSelectedTab = find( tabs, { name: selected } );
		if ( ! newSelectedTab ) {
			setSelected(
				initialTabName || ( tabs.length > 0 ? tabs[ 0 ].name : null )
			);
		}
	}, [ tabs ] );

	return (
		<div className={ className }>
			<NavigableMenu
				role="tablist"
				orientation={ orientation }
				onNavigate={ onNavigate }
				className="components-tab-panel__tabs"
			>
				{ tabs.map( ( tab ) => (
					<TabButton
						className={ `components-tab-panel__tabs-item ${
							tab.name === selected && activeClass
						} ${ tab.name !== selected && notActiveClass }` }
						tabId={ `${ instanceId }-${ tab.name }` }
						aria-controls={ `${ instanceId }-${ tab.name }-view` }
						selected={ tab.name === selected }
						key={ tab.name }
						triggerEvent={ triggerEvent }
						handleEvent={ handleEvent }
						tabName={ tab.name }
					>
						{ tab.title }
					</TabButton>
				) ) }
			</NavigableMenu>
			{ selectedTab && (
				<div
					key={ selectedId }
					aria-labelledby={ selectedId }
					role="tabpanel"
					id={ `${ selectedId }-view` }
					className="components-tab-panel__tab-content"
				>
					{ children && children( selectedTab ) }
				</div>
			) }
		</div>
	);
}
