/**
 * NFD Onboarding — Pending Featured Image preview in the block editor.
 *
 * The block editor renders `core/post-featured-image` (and `woocommerce/product-image`)
 * client-side and only looks at the post's `featured_media` field; PHP filters such
 * as `post_thumbnail_html` or `render_block_core/post-featured-image` never run for
 * the editor canvas, so a post whose image is still "pending" (stored in the
 * `nfd_image_url` meta) shows nothing in the editor even though it renders correctly
 * on the frontend.
 *
 * This script wraps the target blocks' edit component with a small HOC: when the
 * current post (or the contextual Query Loop / WooCommerce product) has
 * `nfd_image_url` set and no real `featured_media`, we render an <img> with that
 * URL on the fly. Nothing is saved to the post — it's purely a visual preview that
 * mirrors the frontend output.
 *
 * Plain-JS on purpose: no build step, no React imports. Uses only the WP globals
 * (wp.hooks, wp.data, wp.element, wp.compose) provided by the editor enqueue
 * dependencies.
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

( function ( wp ) {
	'use strict';

	if (
		! wp ||
		! wp.hooks ||
		! wp.data ||
		! wp.element ||
		! wp.compose
	) {
		return;
	}

	var addFilter                  = wp.hooks.addFilter;
	var createHigherOrderComponent = wp.compose.createHigherOrderComponent;
	var createElement              = wp.element.createElement;
	var useSelect                  = wp.data.useSelect;

	var META_KEY  = 'nfd_image_url';
	var FILTER_ID = 'nfd-onboarding/with-pending-featured-image';

	// Blocks we wrap. Each maps to the outer figure className we emit so the
	// preview matches the block's frontend wrapper (and inherits its styling).
	var TARGET_BLOCKS = {
		'core/post-featured-image': 'wp-block-post-featured-image',
		'woocommerce/product-image': 'wc-block-components-product-image wp-block-woocommerce-product-image',
	};

	/**
	 * Build inline border-radius value from block `style.border.radius` attributes.
	 *
	 * @param {object} attrs Block attributes.
	 * @return {string|null} CSS border-radius value or null.
	 */
	function getBorderRadiusValue( attrs ) {
		var border = attrs && attrs.style && attrs.style.border;
		if ( ! border || ! border.radius ) {
			return null;
		}

		var radius = border.radius;

		if ( 'string' === typeof radius ) {
			return radius;
		}

		if ( 'object' === typeof radius ) {
			return ( radius.topLeft || '0' ) + ' '
				+ ( radius.topRight || '0' ) + ' '
				+ ( radius.bottomRight || '0' ) + ' '
				+ ( radius.bottomLeft || '0' );
		}

		return null;
	}

	/**
	 * Merge layout and border styles so the editor preview matches frontend output.
	 *
	 * @param {object} attrs Block attributes.
	 * @return {object} Style object for the pending `<img>`.
	 */
	function getPendingImageStyle( attrs ) {
		attrs = attrs || {};

		var style = {
			width: '100%',
			height: attrs.height || 'auto',
			aspectRatio: attrs.aspectRatio || 'auto',
			objectFit: attrs.scale || 'cover',
			display: 'block',
		};

		var borderRadius = getBorderRadiusValue( attrs );
		if ( borderRadius ) {
			style.borderRadius = borderRadius;
		}

		return style;
	}

	/**
	 * Resolve { url, hasFeatured } for the post this block instance refers to.
	 *
	 * - Inside a Query Loop the block receives a `context.postId` / `context.postType`
	 *   and we read that record from the `core` entity store.
	 * - WooCommerce variants may expose the product id under `productId` or
	 *   inside a `query`/`singleProduct` object — we probe those too.
	 * - Otherwise we fall back to the currently edited post via `core/editor`.
	 *
	 * @param {object} props BlockEdit props (with optional `context`).
	 * @return {{url: string, hasFeatured: boolean}} pending-image data
	 */
	function useNfdPendingImageData( props ) {
		var ctx = props && props.context ? props.context : null;

		// Try a handful of context shapes used by core Query Loop and various
		// WooCommerce block variants.
		var postId =
			( ctx && ctx.postId ) ||
			( ctx && ctx.productId ) ||
			( ctx && ctx.singleProduct && ctx.singleProduct.id ) ||
			( ctx && ctx.query && ctx.query.postId ) ||
			0;

		var postType =
			( ctx && ctx.postType ) ||
			( ctx && ctx.productId ? 'product' : '' ) ||
			( ctx && ctx.singleProduct ? 'product' : '' ) ||
			'';

		// `woocommerce/product-image` is always about a product; if we have any
		// id from context but missed the type, default to 'product'.
		if ( postId && ! postType && props.name === 'woocommerce/product-image' ) {
			postType = 'product';
		}

		return useSelect(
			function ( select ) {
				// Query Loop / template / WC context: resolve from the entity store.
				if ( postId && postType ) {
					var record = select( 'core' ).getEntityRecord(
						'postType',
						postType,
						postId
					);
					if ( ! record ) {
						return { url: '', hasFeatured: false };
					}
					var ctxMeta = record.meta || {};
					return {
						url: ctxMeta[ META_KEY ] || '',
						hasFeatured: !! record.featured_media,
					};
				}

				// Default: currently edited post.
				var editor = select( 'core/editor' );
				if ( ! editor ) {
					return { url: '', hasFeatured: false };
				}
				var meta = editor.getEditedPostAttribute( 'meta' ) || {};
				return {
					url: meta[ META_KEY ] || '',
					hasFeatured: !! editor.getEditedPostAttribute( 'featured_media' ),
				};
			},
			[ postId, postType ]
		);
	}

	/**
	 * Higher-order component wrapping the target blocks. Returns the original
	 * BlockEdit unless we have a pending image URL and no real featured attachment,
	 * in which case we render an <img> with the meta URL.
	 *
	 * The block toolbar is rendered by Gutenberg's BlockListBlock wrapper (outside
	 * of BlockEdit), so replacing the inner output does not remove block controls.
	 */
	var withNfdPendingImage = createHigherOrderComponent(
		function ( BlockEdit ) {
			return function ( props ) {
				var baseClass = TARGET_BLOCKS[ props.name ];
				if ( ! baseClass ) {
					return createElement( BlockEdit, props );
				}

				var data = useNfdPendingImageData( props );

				if ( ! data.url || data.hasFeatured ) {
					return createElement( BlockEdit, props );
				}

				// Mirror the block's most common visual attributes so the preview
				// matches what the frontend will render once the real image lands.
				var attrs       = props.attributes || {};
				var figureClass = [ baseClass, 'nfd-pending-featured-image', props.className ]
					.filter( Boolean )
					.join( ' ' );

				return createElement(
					'figure',
					{
						className: figureClass,
						style: { margin: 0 },
					},
					createElement( 'img', {
						src: data.url,
						alt: '',
						'data-nfd-pending-image': 'true',
						style: getPendingImageStyle( attrs ),
					} )
				);
			};
		},
		'withNfdPendingImage'
	);

	addFilter( 'editor.BlockEdit', FILTER_ID, withNfdPendingImage );
} )( window.wp );
