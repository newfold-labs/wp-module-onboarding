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

function SiteGenInterfaceSkeleton(
	{
		footer,
		adminbar,
		progressbar,
		navigationbar,
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
		body: __( 'Content', 'wp-module-onboarding' ),
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
				{ !! adminbar && (
					<div
						className="nfd-interface-interface-skeleton__adminbar"
						role="region"
						aria-label={ mergedLabels.adminbar }
						tabIndex="-1"
					>
						{ adminbar }
					</div>
				) }
				{ !! progressbar && (
					<div
						className="nfd-interface-interface-skeleton__progressbar"
						role="region"
						aria-label={ mergedLabels.progressbar }
						tabIndex="-1"
					>
						{ progressbar }
					</div>
				) }
				<div className="nfd-interface-interface-skeleton__body">
					{ !! navigationbar && (
						<div
							className="nfd-interface-interface-skeleton__navigationbar"
							role="region"
							aria-label={ mergedLabels.navigationbar }
							tabIndex="-1"
						>
							{ navigationbar }
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

export default forwardRef( SiteGenInterfaceSkeleton );
