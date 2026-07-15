<?php
/**
 * Wishlist header Gutenberg block registration.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Blocks
 */

namespace NewfoldLabs\WP\Module\Onboarding\Blocks;

use NewfoldLabs\WP\Module\Onboarding\Services\YithWishlistHeaderService;
use WP_Block;

/**
 * Registers the storefront wishlist header block for the Site Editor.
 */
class WishlistHeaderBlock {

	/**
	 * Block name.
	 */
	public const BLOCK_NAME = 'nfd-onboarding/wishlist-header';

	/**
	 * Hook block registration.
	 *
	 * @return void
	 */
	public static function register(): void {
		add_action( 'init', array( self::class, 'register_block' ) );
	}

	/**
	 * Register the PHP-only wishlist header block.
	 *
	 * @return void
	 */
	public static function register_block(): void {
		register_block_type(
			self::BLOCK_NAME,
			array(
				'api_version'     => 3,
				'title'           => __( 'Wishlist', 'wp-module-onboarding' ),
				'description'     => __( 'Header wishlist icon with live item count.', 'wp-module-onboarding' ),
				'category'        => 'woocommerce',
				'icon'            => 'heart',
				'keywords'        => array( 'wishlist', 'yith', 'header', 'ecommerce' ),
				'render_callback' => array( self::class, 'render' ),
				'supports'        => array(
					'autoRegister' => true,
					'html'         => false,
					'multiple'     => false,
					'reusable'     => false,
				),
			)
		);
	}

	/**
	 * Render the wishlist header block.
	 *
	 * @param array<string, mixed> $attributes Block attributes.
	 * @param string               $content    Block content.
	 * @param WP_Block             $block      Block instance.
	 * @return string
	 */
	public static function render( array $attributes, string $content, WP_Block $block ): string {
		unset( $attributes, $content, $block );

		$markup = YithWishlistHeaderService::render_markup();

		if ( '' === $markup ) {
			return '';
		}

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => 'nfd-wishlist-header-block',
			)
		);

		return sprintf(
			'<div %1$s>%2$s</div>',
			$wrapper_attributes,
			$markup
		);
	}
}
