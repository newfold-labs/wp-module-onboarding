<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

/**
 * Thumbnail Service Class
 *
 * Responsible for filtering the thumbnail HTML for all post types and WooCommerce product images.
 */
class ThumbnailService {

	/**
	 * While a `woocommerce/product-image` block is rendering, holds its `postId`
	 * so `woocommerce_placeholder_img` can resolve `nfd_image_url` (global $product is often unset in block SSR).
	 *
	 * @var int[]
	 */
	private static $product_image_placeholder_stack = array();

	/**
	 * Constructor.
	 */
	public function __construct() {

		// for all post types
		add_filter( 'post_thumbnail_html', array( $this, 'use_pending_image_url' ), 10, 5 );

		// for product images
		add_filter( 'render_block_context', array( $this, 'push_post_id_for_product_image_placeholder' ), 9, 3 );
		add_filter( 'woocommerce_placeholder_img', array( $this, 'maybe_replace_wc_placeholder_img' ), 10, 3 );

		add_filter(
			'woocommerce_single_product_image_thumbnail_html',
			array( $this, 'use_pending_image_url_for_single_product_gallery' ),
			10,
			2
		);
		add_filter( 'render_block_woocommerce/product-image', array( $this, 'use_pending_image_url_for_product_image_block' ), 10, 3 );
		add_filter( 'render_block_woocommerce/product-image', array( $this, 'pop_post_id_after_product_image_block' ), 999, 3 );
		add_filter( 'render_block_core/post-featured-image', array( $this, 'use_pending_image_url_for_core_post_featured_block' ), 10, 3 );
		add_filter( 'woocommerce_store_api_cart_item_images', array( $this, 'use_pending_image_url_for_cart_store_api' ), 10, 3 );
		add_filter( 'rest_post_dispatch', array( $this, 'maybe_inject_images_wc_store_api_products' ), 10, 3 );
	}

	/**
	 * Raw meta value for NFD pending image for product.
	 *
	 * @param \WC_Product $product Product object.
	 * @return string Non-empty string or empty string.
	 */
	private function get_nfd_image_meta_raw_for_product( \WC_Product $product ): string {
		if ( ! ( $product instanceof \WC_Product ) ) {
			return '';
		}

		$post_id = (int) $product->get_id();
		$raw     = get_post_meta( $post_id, PostTypeService::META_IMAGE_URL, true );
		if ( is_string( $raw ) && '' !== trim( $raw ) ) {
			return $raw;
		}

		return '';
	}

	/**
	 * Whether the product has NFD pending image meta.
	 *
	 * @param \WC_Product $product Product.
	 * @return bool
	 */
	private function product_has_nfd_image_meta( \WC_Product $product ): bool {
		return '' !== $this->get_nfd_image_meta_raw_for_product( $product );
	}


	/**
	 * Pending image URL from meta (only when no featured attachment; requires meta set).
	 *
	 * @param mixed $product Product or other value; must pass instanceof \WC_Product checks before use.
	 * @return string Non-empty esc_url_raw() value, or empty string.
	 */
	private function get_nfd_pending_image_url_for_wc_product( mixed $product ): string {
		if ( ! ( $product instanceof \WC_Product ) || ! $this->product_has_nfd_image_meta( $product ) ) {
			return '';
		}
		if ( $product->get_image_id() ) {
			return '';
		}

		$url = esc_url_raw( trim( $this->get_nfd_image_meta_raw_for_product( $product ) ) );

		return $url ? $url : '';
	}

	/**
	 * Remote URLs can fail PHP's FILTER_VALIDATE_URL; WordPress has a more permissive check.
	 *
	 * @param mixed $url Raw URL or other value (validated with is_string before use).
	 * @return bool
	 */
	private function is_usable_remote_image_url( mixed $url ): bool {
		if ( '' === $url || ! is_string( $url ) ) {
			return false;
		}
		if ( function_exists( 'wp_http_validate_url' ) && wp_http_validate_url( $url ) ) {
			return true;
		}
		return (bool) preg_match( '#^https?://#i', $url );
	}

	/**
	 * Push the post ID for the product image placeholder.
	 *
	 * @param array $context      Block context.
	 * @param array $parsed_block Parsed block.
	 * @param mixed $outer_block  Parent block instance (unused; required by filter signature).
	 * @return array
	 */
	public function push_post_id_for_product_image_placeholder( array $context, array $parsed_block, mixed $outer_block ): array { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed
		if ( empty( $parsed_block['blockName'] ) || 'woocommerce/product-image' !== $parsed_block['blockName'] ) {
			return $context;
		}
		if ( empty( $context['postId'] ) ) {
			return $context;
		}
		$post_id = (int) $context['postId'];
		if ( '' === get_post_meta( $post_id, PostTypeService::META_IMAGE_URL, true ) ) {
			return $context;
		}
		self::$product_image_placeholder_stack[] = $post_id;

		return $context;
	}

	/**
	 * Pop the post ID for the product image placeholder.
	 *
	 * @param string $block_content   Content.
	 * @param array  $parsed_block    Parsed block.
	 * @param mixed  $block_instance  Block instance; checked with instanceof \WP_Block.
	 * @return string
	 */
	public function pop_post_id_after_product_image_block( string $block_content, array $parsed_block, mixed $block_instance ): string {
		if ( ! $block_instance instanceof \WP_Block || empty( $block_instance->context['postId'] ) ) {
			return $block_content;
		}
		$expected = (int) $block_instance->context['postId'];
		if ( empty( self::$product_image_placeholder_stack ) ) {
			return $block_content;
		}
		$top = (int) self::$product_image_placeholder_stack[ count( self::$product_image_placeholder_stack ) - 1 ];
		if ( $top === $expected ) {
			array_pop( self::$product_image_placeholder_stack );
		}

		return $block_content;
	}

	/**
	 * Replace WC placeholder markup when the real context is a product with `nfd_image_url`
	 * (covers shop grids: `woocommerce/product-image` uses this instead of `get_image()`).
	 *
	 * @param string $html        Placeholder HTML.
	 * @param string $size        Image size name.
	 * @param array  $dimensions  Width/height.
	 * @return string
	 */
	public function maybe_replace_wc_placeholder_img( string $html, string $size, array $dimensions ): string {
		$product = null;
		if ( ! empty( self::$product_image_placeholder_stack ) ) {
			$post_id = (int) self::$product_image_placeholder_stack[ count( self::$product_image_placeholder_stack ) - 1 ];
			if ( $post_id > 0 && function_exists( 'wc_get_product' ) ) {
				$product = wc_get_product( $post_id );
			}
		}
		if ( ! ( $product instanceof \WC_Product ) ) {
			global $product;
		}
		if ( ! ( $product instanceof \WC_Product ) || ! $this->product_has_nfd_image_meta( $product ) ) {
			return $html;
		}

		$url = $this->get_nfd_pending_image_url_for_wc_product( $product );
		if ( '' === $url ) {
			return $html;
		}

		$width  = isset( $dimensions['width'] ) ? (int) $dimensions['width'] : 0;
		$height = isset( $dimensions['height'] ) ? (int) $dimensions['height'] : 0;
		$hw     = ( $width && $height ) ? image_hwstring( $width, $height ) : '';

		return sprintf(
			'<img src="%1$s" %2$sclass="woocommerce-placeholder wp-post-image" alt="%3$s" loading="lazy" decoding="async" />',
			esc_url( $url ),
			$hw,
			esc_attr( $product->get_name() )
		);
	}

	/**
	 * Returns distinct placeholder image URLs for common WooCommerce image sizes.
	 *
	 * @return string[] Distinct placeholder image URLs for common WC sizes.
	 */
	private function get_wc_placeholder_src_urls(): array {
		static $urls = null;

		if ( null !== $urls ) {
			return $urls;
		}

		$urls = array();
		if ( function_exists( 'wc_placeholder_img_src' ) ) {
			$urls = array_filter(
				array_unique(
					array(
						esc_url_raw( wc_placeholder_img_src( 'woocommerce_thumbnail' ) ),
						esc_url_raw( wc_placeholder_img_src( 'woocommerce_single' ) ),
					)
				)
			);
		}

		return $urls;
	}

	/**
	 * Single product gallery (classic template) uses placeholder src without woocommerce-placeholder class.
	 *
	 * @param string $html              Gallery image HTML.
	 * @param int    $post_thumbnail_id Featured attachment id (0 when missing).
	 * @return string
	 */
	public function use_pending_image_url_for_single_product_gallery( string $html, int $post_thumbnail_id ): string {
		if ( $post_thumbnail_id ) {
			return $html;
		}

		global $product;
		if ( ! ( $product instanceof \WC_Product ) || $product->get_image_id() ) {
			return $html;
		}
		if ( ! $this->product_has_nfd_image_meta( $product ) ) {
			return $html;
		}

		$url = $this->get_nfd_pending_image_url_for_wc_product( $product );
		if ( '' === $url ) {
			return $html;
		}

		foreach ( $this->get_wc_placeholder_src_urls() as $ph ) {
			if ( $ph && false !== strpos( $html, $ph ) ) {
				return str_replace( $ph, esc_url( $url ), $html );
			}
		}

		return $html;
	}

	/**
	 * WooCommerce Blocks: replace placeholder in server-rendered product image block.
	 *
	 * @param string $block_content  Rendered block HTML.
	 * @param array  $parsed_block   Parsed block (not a WP_Block instance).
	 * @param mixed  $block_instance Block instance (has context e.g. postId); checked with instanceof \WP_Block.
	 * @return string
	 */
	public function use_pending_image_url_for_product_image_block( string $block_content, array $parsed_block, mixed $block_instance = null ): string {
		if ( empty( $block_content ) || ! is_string( $block_content ) ) {
			return $block_content;
		}
		if ( ! function_exists( 'wc_get_product' ) ) {
			return $block_content;
		}
		if ( ! $block_instance instanceof \WP_Block ) {
			return $block_content;
		}

		$post_id = isset( $block_instance->context['postId'] ) ? (int) $block_instance->context['postId'] : 0;
		if ( $post_id <= 0 || '' === get_post_meta( $post_id, PostTypeService::META_IMAGE_URL, true ) ) {
			return $block_content;
		}

		$product = wc_get_product( $post_id );
		if ( ! ( $product instanceof \WC_Product ) ) {
			return $block_content;
		}

		$url = $this->get_nfd_pending_image_url_for_wc_product( $product );
		if ( '' === $url ) {
			return $block_content;
		}

		// Block output from wc_placeholder_img: class includes woocommerce-placeholder.
		if ( false !== strpos( $block_content, 'woocommerce-placeholder' ) ) {
			$pattern = '/<img\b(?=[^>]*\bclass=("|\')[^"\']*\bwoocommerce-placeholder\b)[^>]*>/i';
			if ( preg_match( $pattern, $block_content, $m ) ) {
				$img_tag = $m[0];
				$style   = '';
				if ( preg_match( '/\sstyle=("|\')(.*?)\1/i', $img_tag, $sm ) ) {
					$style = $sm[2];
				}

				$new_img = '<img src="' . esc_url( $url ) . '"'
					. ( '' !== $style ? ' style="' . esc_attr( $style ) . '"' : '' )
					. ' class="wp-post-image"'
					. ' alt="' . esc_attr( $product->get_name() ) . '"'
					. ' decoding="async"'
					. ' loading="lazy"'
					. ' />';

				return str_replace( $img_tag, $new_img, $block_content );
			}
		}

		// Fallback: replace first <img> whose src is the WC placeholder URL.
		foreach ( $this->get_wc_placeholder_src_urls() as $ph ) {
			if ( ! $ph || false === strpos( $block_content, $ph ) ) {
				continue;
			}
			$escaped = preg_quote( $ph, '#' );
			$pattern = '#<img\b([^>]*)\ssrc=(["\'])' . $escaped . '\2#i';
			if ( preg_match( $pattern, $block_content ) ) {
				return preg_replace(
					$pattern,
					'<img$1 src=$2' . esc_url( $url ) . '$2',
					$block_content,
					1
				);
			}
		}

		return $block_content;
	}

	/**
	 * Shop/archive grids often use `core/post-featured-image` in a Query Loop.
	 * Core returns no markup when there is no featured attachment; inject `nfd_image_url`.
	 *
	 * @param string $block_content   Rendered block HTML (often empty).
	 * @param array  $parsed_block    Parsed block.
	 * @param mixed  $block_instance Block instance (context includes postId); checked with instanceof \WP_Block.
	 * @return string
	 */
	public function use_pending_image_url_for_core_post_featured_block( string $block_content, array $parsed_block, mixed $block_instance ): string {
		if ( ! $block_instance instanceof \WP_Block || ! isset( $block_instance->context['postId'] ) ) {
			return $block_content;
		}

		$post_id = (int) $block_instance->context['postId'];
		if ( $post_id <= 0 || '' === get_post_meta( $post_id, PostTypeService::META_IMAGE_URL, true ) ) {
			return $block_content;
		}

		$post_type = get_post_type( $post_id );
		if ( 'product' !== $post_type ) {
			return $block_content;
		}

		if ( has_post_thumbnail( $post_id ) ) {
			return $block_content;
		}

		if ( null !== $block_content && '' !== $block_content ) {
			return $block_content;
		}

		$product = function_exists( 'wc_get_product' ) ? wc_get_product( $post_id ) : null;
		if ( ! ( $product instanceof \WC_Product ) ) {
			return $block_content;
		}

		$url = $this->get_nfd_pending_image_url_for_wc_product( $product );
		if ( '' === $url ) {
			return $block_content;
		}

		$title = get_the_title( $post_id );
		$img   = '<img src="' . esc_url( $url ) . '" alt="' . esc_attr( $title ) . '" class="wp-post-image" style="width:100%;height:100%;object-fit:cover;" loading="lazy" decoding="async" />';

		$wrapper = get_block_wrapper_attributes( array( 'class' => 'wp-block-post-featured-image' ) );

		return sprintf( '<figure %s>%s</figure>', $wrapper, $img );
	}

	/**
	 * Whether this REST request targets WC Store API products (any path shape).
	 *
	 * @param string $route Request route from WP_REST_Request::get_route().
	 * @return bool
	 */
	private function is_wc_store_products_rest_route( string $route ): bool {
		if ( ! is_string( $route ) || '' === $route ) {
			return false;
		}

		return (bool) preg_match( '#wc/store/v\d+/products#', $route );
	}

	/**
	 * Cart / checkout blocks: inject image when Store API returns no attachments.
	 *
	 * @param array  $product_images      Image list from schema.
	 * @param array  $cart_item           Cart row.
	 * @param string $unused_cart_item_key Cart item key (unused; required by filter signature).
	 * @return array
	 */
	public function use_pending_image_url_for_cart_store_api( array $product_images, array $cart_item, string $unused_cart_item_key ): array { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed
		if ( ! empty( $product_images ) ) {
			return $product_images;
		}

		$product = isset( $cart_item['data'] ) ? $cart_item['data'] : null;
		if ( ! ( $product instanceof \WC_Product ) || ! $this->product_has_nfd_image_meta( $product ) ) {
			return $product_images;
		}

		$url = $this->get_nfd_pending_image_url_for_wc_product( $product );
		if ( '' === $url || ! $this->is_usable_remote_image_url( $url ) ) {
			return $product_images;
		}

		return array(
			(object) array(
				'id'        => (int) $product->get_id(),
				'src'       => $url,
				'thumbnail' => $url,
				'srcset'    => '',
				'sizes'     => '',
				'name'      => $product->get_name(),
				'alt'       => $product->get_name(),
			),
		);
	}

	/**
	 * Product grids that hydrate from Store API need `images` populated for JS-rendered blocks.
	 *
	 * @param mixed $result  REST response; checked with instanceof \WP_REST_Response.
	 * @param mixed $server  REST server (unused; required by filter signature).
	 * @param mixed $request REST request; checked with instanceof \WP_REST_Request before use.
	 * @return mixed
	 */
	public function maybe_inject_images_wc_store_api_products( mixed $result, mixed $server, mixed $request ): mixed { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed
		if ( ! ( $result instanceof \WP_REST_Response ) || ! function_exists( 'wc_get_product' ) ) {
			return $result;
		}

		if ( ! ( $request instanceof \WP_REST_Request ) ) {
			return $result;
		}

		$route = $request->get_route();
		if ( ! $this->is_wc_store_products_rest_route( $route ) ) {
			return $result;
		}

		$data = $result->get_data();
		if ( ! is_array( $data ) ) {
			return $result;
		}

		if ( isset( $data['id'] ) ) {
			$result->set_data( $this->patch_wc_store_api_product_images( $data ) );

			return $result;
		}

		foreach ( $data as $key => $item ) {
			if ( is_array( $item ) && isset( $item['id'] ) ) {
				$data[ $key ] = $this->patch_wc_store_api_product_images( $item );
			}
		}

		$result->set_data( $data );

		return $result;
	}

	/**
	 * Patch WC Store API product images.
	 *
	 * @param array $item Product payload (associative).
	 * @return array
	 */
	private function patch_wc_store_api_product_images( array $item ): array {
		if ( ! empty( $item['images'] ) ) {
			return $item;
		}

		$product_id = isset( $item['id'] ) ? (int) $item['id'] : 0;
		if ( $product_id <= 0 ) {
			return $item;
		}

		$product = wc_get_product( $product_id );
		if ( ! ( $product instanceof \WC_Product ) || ! $this->product_has_nfd_image_meta( $product ) ) {
			return $item;
		}

		$url = $this->get_nfd_pending_image_url_for_wc_product( $product );
		if ( '' === $url || ! $this->is_usable_remote_image_url( $url ) ) {
			return $item;
		}

		$item['images'] = array(
			array(
				'id'        => (int) $product->get_id(),
				'src'       => $url,
				'thumbnail' => $url,
				'srcset'    => '',
				'sizes'     => '',
				'name'      => $product->get_name(),
				'alt'       => $product->get_name(),
			),
		);

		return $item;
	}


	/**
	 * Use pending image URL for all post types.
	 *
	 * @param string       $html                    Thumbnail HTML.
	 * @param int          $post_id                 Post ID.
	 * @param int          $unused_post_thumbnail_id Attachment ID (unused; required by filter signature).
	 * @param string|int[] $unused_size             Registered size name or [w, h] array (unused).
	 * @param string|array $unused_attr             Extra img attributes (unused).
	 * @return string
	 */
	public function use_pending_image_url( string $html, int $post_id, int $unused_post_thumbnail_id, string|array $unused_size, string|array $unused_attr ): string { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed
		if ( '' !== $html && null !== $html ) {
			return $html;
		}

		$post_id              = (int) $post_id;
		$supported_post_types = array( PostTypeService::SERVICE_POST_TYPE, 'post' );
		if ( $post_id <= 0 || ! in_array( get_post_type( $post_id ), $supported_post_types, true ) ) {
			return $html;
		}
		if ( '' === get_post_meta( $post_id, PostTypeService::META_IMAGE_URL, true ) ) {
			return $html;
		}

		$url = esc_url_raw( trim( (string) get_post_meta( $post_id, PostTypeService::META_IMAGE_URL, true ) ) );
		if ( '' === $url ) {
			return $html;
		}

		return '<img src="' . esc_url( $url ) . '"'
			. ' style="width:100%;height:100%;object-fit:cover;"'
			. ' class="wp-post-image"'
			. ' alt="' . esc_attr( get_the_title( $post_id ) ) . '"'
			. ' decoding="async"'
			. ' loading="lazy"'
			. ' />';
	}
}
