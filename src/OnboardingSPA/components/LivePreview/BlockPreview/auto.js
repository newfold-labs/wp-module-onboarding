import { Disabled } from '@wordpress/components';
import { useResizeObserver, pure, useRefEffect } from '@wordpress/compose';
import { useMemo } from '@wordpress/element';
import {
	BlockList,
	// eslint-disable-next-line  @wordpress/no-unsafe-wp-apis
	__unstableIframe as Iframe,
	// eslint-disable-next-line  @wordpress/no-unsafe-wp-apis
	__unstableEditorStyles as EditorStyles,
	// eslint-disable-next-line  @wordpress/no-unsafe-wp-apis
	__unstablePresetDuotoneFilter as PresetDuotoneFilter,
} from '@wordpress/block-editor';

// This is used to avoid rendering the block list if the sizes change.
let MemoizedBlockList;

const MAX_HEIGHT = 6000;

function ScaledBlockPreview( {
	viewportWidth,
	settings,
	containerWidth,
	minHeight,
	additionalStyles = [],
} ) {
	if ( ! viewportWidth ) {
		viewportWidth = containerWidth;
	}

	const [ contentResizeListener, { height: contentHeight } ] =
		useResizeObserver();
	const { styles, assets, duotone } = {
		styles: settings.styles,
		assets: settings.__unstableResolvedAssets,
		duotone: settings.__experimentalFeatures?.color?.duotone,
	};

	// Avoid scrollbars for pattern previews.
	const editorStyles = useMemo( () => {
		if ( styles ) {
			return [
				...styles,
				{
					css: 'body{height:auto;overflow:hidden;border:none;padding:0;}',
					__unstableType: 'presets',
				},
				...additionalStyles,
			];
		}

		return styles;
	}, [ styles, additionalStyles ] );

	const svgFilters = useMemo( () => {
		return [ ...( duotone?.default ?? [] ), ...( duotone?.theme ?? [] ) ];
	}, [ duotone ] );

	// Initialize on render instead of module top level, to avoid circular dependency issues.
	MemoizedBlockList = MemoizedBlockList || pure( BlockList );

	const scale = containerWidth / viewportWidth;
	return (
		<Disabled
			className="block-editor-block-preview__content"
			style={ {
				transform: `scale(${ scale })`,
				height: contentHeight * scale,
				maxHeight:
					contentHeight > MAX_HEIGHT ? MAX_HEIGHT * scale : undefined,
				minHeight,
			} }
		>
			<Iframe
				assets={ assets }
				contentRef={ useRefEffect( ( bodyElement ) => {
					const {
						ownerDocument: { documentElement },
					} = bodyElement;
					documentElement.classList.add(
						'block-editor-block-preview__content-iframe'
					);
					documentElement.style.position = 'absolute';
					documentElement.style.width = '100%';

					// necessary for contentResizeListener to work.
					bodyElement.style.boxSizing = 'border-box';
					bodyElement.style.position = 'absolute';
					bodyElement.style.width = '100%';
					bodyElement.spellcheck = 0;
				}, [] ) }
				aria-hidden
				tabIndex={ -1 }
				style={ {
					position: 'absolute',
					width: viewportWidth,
					height: contentHeight,
					pointerEvents: 'none',
					// This is a catch-all max-height for patterns.
					// See: https://github.com/WordPress/gutenberg/pull/38175.
					maxHeight: MAX_HEIGHT,
					minHeight:
						scale !== 0 && scale < 1 && minHeight
							? minHeight / scale
							: minHeight,
				} }
			>
				<EditorStyles styles={ editorStyles } />
				{ contentResizeListener }
				{
					/* Filters need to be rendered before children to avoid Safari rendering issues. */
					svgFilters.map( ( preset ) => (
						<PresetDuotoneFilter
							preset={ preset }
							key={ preset.slug }
						/>
					) )
				}
				<MemoizedBlockList renderAppender={ false } />
			</Iframe>
		</Disabled>
	);
}

export default function AutoBlockPreview( props ) {
	const [ containerResizeListener, { width: containerWidth } ] =
		useResizeObserver();

	return (
		<>
			<div style={ { position: 'relative', width: '100%', height: 0 } }>
				{ containerResizeListener }
			</div>
			<div className="block-editor-block-preview__container">
				{ containerWidth && (
					<ScaledBlockPreview
						{ ...props }
						containerWidth={ containerWidth }
					/>
				) }
			</div>
		</>
	);
}
