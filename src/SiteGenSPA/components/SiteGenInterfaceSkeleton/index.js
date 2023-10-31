/**
 * External dependencies
 */
import classnames from 'classnames';
import { forwardRef, useEffect, useContext } from '@wordpress/element';
// eslint-disable-next-line  @wordpress/no-unsafe-wp-apis
import { __unstableUseNavigateRegions as useNavigateRegions } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useMergeRefs } from '@wordpress/compose';
import { ThemeContext } from '../ThemeContextProvider';

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
		header,
		footer,
		adminbar,
		progressbar,
		content,
		drawer,
		labels,
		className,
		shortcuts,
	},
	ref
) {
	const navigateRegionsProps = useNavigateRegions( shortcuts );
	const { theme } = useContext( ThemeContext );

	useHTMLClass( 'nfd-sg-interface-skeleton__html-container' );

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
				theme,
				'nfd-sg-interface-skeleton',
				'nfd-sitegen-interface-skeleton',
				navigateRegionsProps.className,
				!! footer && 'has-footer'
			) }
		>
			{ !! drawer && (
				<div
					className="nfd-sg-interface-skeleton__drawer"
					role="region"
					aria-label={ mergedLabels.drawer }
					tabIndex="-1"
				>
					{ drawer }
				</div>
			) }
			<div className="nfd-sg-interface-skeleton__editor">
				{ !! adminbar && (
					<div
						className="nfd-sg-interface-skeleton__adminbar"
						role="region"
						aria-label={ mergedLabels.adminbar }
						tabIndex="-1"
					>
						{ adminbar }
					</div>
				) }
				{ !! progressbar && (
					<div
						className="nfd-sg-interface-skeleton__progressbar"
						role="region"
						aria-label={ mergedLabels.progressbar }
						tabIndex="-1"
					>
						{ progressbar }
					</div>
				) }
				<div className="nfd-sg-interface-skeleton__body">
					{ !! header && (
						<div
							className="nfd-sg-interface-skeleton__header"
							role="region"
							aria-label={ mergedLabels.header }
							tabIndex="-1"
						>
							{ header }
						</div>
					) }
					<div
						className="nfd-sg-interface-skeleton__content"
						role="region"
						aria-label={ mergedLabels.body }
						tabIndex="-1"
					>
						{ content }
					</div>
				</div>
			</div>
			{ !! footer && (
				<div
					className="nfd-sg-interface-skeleton__footer"
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
