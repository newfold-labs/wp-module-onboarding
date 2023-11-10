/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
/**
 * WordPress dependencies
 */
import { forwardRef, useEffect } from '@wordpress/element';
// eslint-disable-next-line  @wordpress/no-unsafe-wp-apis
import { __unstableUseNavigateRegions as useNavigateRegions } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useMergeRefs } from '@wordpress/compose';

function useHTMLClass( className ) {
	useEffect( () => {
		const element =
			document && document.querySelector( `html:not(.${ className })` );
		if ( ! element ) {
			return;
		}
		element.classList.toggle( className );
		return () => {
			element.classList.toggle( className );
		};
	}, [ className ] );
}

function NewfoldInterfaceSkeleton(
	{
		footer,
		header,
		sidebar,
		secondarySidebar,
		notices,
		content,
		drawer,
		actions,
		labels,
		className,
		shortcuts,
	},
	ref
) {
	const navigateRegionsProps = useNavigateRegions( shortcuts );

	useHTMLClass( 'nfd-interface-interface-skeleton__html-container' );

	const defaultLabels = {
		/* translators: accessibility text for the nav bar landmark region. */
		drawer: __( 'Drawer', 'wp-module-onboarding' ),
		/* translators: accessibility text for the top bar landmark region. */
		header: __( 'Header', 'wp-module-onboarding' ),
		/* translators: accessibility text for the content landmark region. */
		body: __( 'Content', 'wp-module-onboarding' ),
		/* translators: accessibility text for the secondary sidebar landmark region. */
		secondarySidebar: __( 'Block Library', 'wp-module-onboarding' ),
		/* translators: accessibility text for the settings landmark region. */
		sidebar: __( 'Settings', 'wp-module-onboarding' ),
		/* translators: accessibility text for the publish landmark region. */
		actions: __( 'Publish', 'wp-module-onboarding' ),
		/* translators: accessibility text for the footer landmark region. */
		footer: __( 'Footer', 'wp-module-onboarding' ),
	};

	const mergedLabels = { ...defaultLabels, ...labels };

	return (
		<div
			{ ...navigateRegionsProps }
			ref={ useMergeRefs( [ ref, navigateRegionsProps.ref ] ) }
			className={ classnames(
				className,
				'nfd-interface-interface-skeleton',
				navigateRegionsProps.className,
				!! footer && 'has-footer'
			) }
		>
			{ !! drawer && (
				<div
					className="nfd-interface-interface-skeleton__drawer"
					role="region"
					aria-label={ mergedLabels.drawer }
					tabIndex="-1"
				>
					{ drawer }
				</div>
			) }
			<div className="nfd-interface-interface-skeleton__editor">
				{ !! header && (
					<div
						className="nfd-interface-interface-skeleton__header"
						role="region"
						aria-label={ mergedLabels.header }
						tabIndex="-1"
					>
						{ header }
					</div>
				) }
				<div className="nfd-interface-interface-skeleton__body">
					{ !! secondarySidebar && (
						<div
							className="nfd-interface-interface-skeleton__secondary-sidebar"
							role="region"
							aria-label={ mergedLabels.secondarySidebar }
							tabIndex="-1"
						>
							{ secondarySidebar }
						</div>
					) }
					{ !! notices && (
						<div className="nfd-interface-interface-skeleton__notices">
							{ notices }
						</div>
					) }
					<div
						className="nfd-interface-interface-skeleton__content"
						role="region"
						aria-label={ mergedLabels.body }
						tabIndex="-1"
					>
						{ content }
					</div>
					{ !! sidebar && (
						<div
							className="nfd-interface-interface-skeleton__sidebar"
							role="region"
							aria-label={ mergedLabels.sidebar }
							tabIndex="-1"
						>
							{ sidebar }
						</div>
					) }
					{ !! actions && (
						<div
							className="nfd-interface-interface-skeleton__actions"
							role="region"
							aria-label={ mergedLabels.actions }
							tabIndex="-1"
						>
							{ actions }
						</div>
					) }
				</div>
			</div>
			{ !! footer && (
				<div
					className="nfd-interface-interface-skeleton__footer"
					role="region"
					aria-label={ mergedLabels.footer }
					tabIndex="-1"
				>
					{ footer }
				</div>
			) }
		</div>
	);
}

export default forwardRef( NewfoldInterfaceSkeleton );
