import { Disabled } from '@wordpress/components';
import { useResizeObserver, pure, useRefEffect } from '@wordpress/compose';
import { BlockList } from '@wordpress/block-editor';
import { __unstableIframe as Iframe } from '@wordpress/block-editor';
import { __unstableEditorStyles as EditorStyles } from '@wordpress/block-editor';
import { __unstablePresetDuotoneFilter as PresetDuotoneFilter } from '@wordpress/block-editor';

// This is used to avoid rendering the block list if the sizes change.
let MemoizedBlockList;

const MAX_HEIGHT = 6000;

function AutoBlockPreview( {
	viewportWidth,
	__experimentalPadding,
	__experimentalMinHeight,
	settings,
} ) {
	const [ containerResizeListener, { width: containerWidth } ] =
		useResizeObserver();
	const [ contentResizeListener, { height: contentHeight } ] =
		useResizeObserver();
	const { styles, assets, duotone } = {
		styles: settings.styles,
		assets: settings.__unstableResolvedAssets,
		duotone: settings.__experimentalFeatures?.color?.duotone,
	};

	// Avoid scrollbars for pattern previews.
	let editorStyles;
	if ( styles ) {
		editorStyles = [
			...styles,
			{
				css: 'body{height:auto;overflow:hidden;}',
				__unstableType: 'presets',
			},
		];
	} else {
		editorStyles = styles;
	}

	const svgFilters = [
		...( duotone?.default ?? [] ),
		...( duotone?.theme ?? [] ),
	];

	// Initialize on render instead of module top level, to avoid circular dependency issues.
	MemoizedBlockList = MemoizedBlockList || pure( BlockList );

	const scale = containerWidth / viewportWidth;
	return (
		<div className="block-editor-block-preview__container">
			{ containerResizeListener }
			<Disabled
				className="block-editor-block-preview__content"
				style={ {
					transform: `scale(${ scale })`,
					height: contentHeight * scale,
					maxHeight:
						contentHeight > MAX_HEIGHT
							? MAX_HEIGHT * scale
							: undefined,
					minHeight: __experimentalMinHeight,
				} }
			>
				<Iframe
					head={ <EditorStyles styles={ editorStyles } /> }
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
						bodyElement.style.padding =
							__experimentalPadding + 'px';

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
							scale !== 0 && scale < 1 && __experimentalMinHeight
								? __experimentalMinHeight / scale
								: __experimentalMinHeight,
					} }
				>
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
		</div>
	);
}

export default AutoBlockPreview;
