<?php
/**
 * Ecommerce site type service.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes;

use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginActivationTaskManager;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginInstallTaskManager;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginActivationTask;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginInstallTask;
use NewfoldLabs\WP\Module\Onboarding\Data\Plugins as LegacyPlugins;

/**
 * Ecommerce site type service.
 */
class EcommerceSiteTypeService {

	/**
	 * Publishes a WooCommerce product.
	 *
	 * @param array $product The product.
	 * @return int|WP_Error The product ID.
	 */
	public static function publish_woo_product( string $name, string $description, mixed $price, string $image_url = '', array $categories = array()) {
		// Remove hooks that can slow down the operation.
		remove_all_actions('woocommerce_new_product');
		remove_all_actions('woocommerce_update_product');
		remove_all_actions('wp_insert_post');
		remove_all_actions('save_post');

		$product_data = array(
			'post_title'   => $name,
			'post_content' => '',
			'post_excerpt' => $description,
			'post_status'  => 'publish',
			'post_type'    => 'product',
			'post_author'  => get_current_user_id() ?: 1,
		);
		// Insert product.
		$product_id = wp_insert_post( $product_data );
		// Validate product was created successfully.
		if ( is_wp_error( $product_id ) || !$product_id ) {
			return new \WP_Error( 'error_publishing_woo_product', 'Failed to create product' );
		}
		// Product meta.
		update_post_meta( $product_id, '_regular_price', $price );
		update_post_meta( $product_id, '_price', $price );
		update_post_meta( $product_id, '_stock_status', 'instock' );
		update_post_meta( $product_id, '_manage_stock', 'no' );
		// Product categories.
		if ( ! empty( $categories ) ) {
			$category_ids = array();
			foreach ( $categories as $category ) {
				$category_ids[] = self::create_or_get_woo_category( $category );
			}
			wp_set_post_terms( $product_id, $category_ids, 'product_cat' );
		}
		// Featured image.
		if ( ! empty( $image_url ) ) {
			self::set_woo_product_featured_image_from_url( $image_url, $product_id );
		}

		return $product_id;
	}

	/**
	 * Sets the featured image for a WooCommerce product.
	 *
	 * @param string $image_url The URL of the image.
	 * @param int $product_id The ID of the product.
	 * @return void
	 */
	private static function set_woo_product_featured_image_from_url( string $image_url, int $product_id ): void {
		$image_id = self::import_image_from_url( $image_url, $product_id );
		if ( $image_id ) {
			update_post_meta( $product_id, '_thumbnail_id', $image_id );
		}
	}

	/**
	 * Imports an image from a URL.
	 *
	 * @param string $image_url The URL of the image.
	 * @param int $product_id The ID of the product.
	 * @return int The ID of the attachment.
	 */
	private static function import_image_from_url( string $image_url, int $product_id ): int {
		if ( ! function_exists( 'media_handle_sideload' ) ) {
			require_once( ABSPATH . 'wp-admin/includes/media.php' );
			require_once( ABSPATH . 'wp-admin/includes/file.php' );
			require_once( ABSPATH . 'wp-admin/includes/image.php' );
		}

		// Add an arbitrary extension to the image URL to trick media_sideload_image to download the image.
		$image_url     = $image_url . '?ext=.jpeg';
		$attachment_id = media_sideload_image( $image_url, $product_id, null, 'id' );
		if ( is_wp_error( $attachment_id ) ) {
			return 0;
		}

		return $attachment_id;
	}

	/**
	 * Creates or gets a WooCommerce category.
	 *
	 * @param string $name The name of the category.
	 * @return int The ID of the category.
	 */
	public static function create_or_get_woo_category( string $name ): int {
		$category_slug = sanitize_title( $name );
		$category      = get_term_by( 'slug', $category_slug, 'product_cat' );
		if ( $category ) {
			return $category->term_id;
		}
		$category = wp_insert_term( $name, 'product_cat' );
		if ( is_wp_error( $category ) ) {
			return 0;
		}
		return $category['term_id'];
	}

	/**
	 * Sets up the WooCommerce pages.
	 *
	 * @return bool
	 */
	public static function setup_woo_pages(): bool {
		if ( class_exists( '\WC_Install' ) ) {
			\WC_Install::create_pages();
			return true;
		}

		return false;
	}

	/**
	 * Gets the WooCommerce shop page info.
	 *
	 * @return array The shop page info or an empty array if the shop page is not found.
	 */
	public static function get_woo_shop_page_info(): array {
		if ( ! function_exists( '\wc_get_page_id' ) || ! function_exists( '\wc_get_page_permalink' ) ) {
			return array();
		}

		$shop_page_id = \wc_get_page_id( 'shop' );
		if ( $shop_page_id ) {
			return array(
				'id'        => $shop_page_id,
				'title'     => \get_the_title( $shop_page_id ),
				'permalink' => \get_permalink( $shop_page_id ),
			);
		}

		return array();
	}

	/**
	 * Gets the ecommerce plugins.
	 *
	 * @return array
	 */
	public static function get_ecommerce_plugins(): array {
		return LegacyPlugins::get_ecommerce_plugins();
	}

	/**
	 * Installs the ecommerce plugins (background task).
	 *
	 * @return void
	 */
	public static function install_ecommerce_plugins(): void {
		$ecommerce_plugins = self::get_ecommerce_plugins();

		foreach ( $ecommerce_plugins as $plugin ) {
			$plugin_type = PluginInstaller::get_plugin_type( $plugin['slug'] );
			$plugin_path = PluginInstaller::get_plugin_path( $plugin['slug'], $plugin_type );
			if ( ! $plugin_path ) {
				continue;
			}

			// Checks if a plugin with the given slug and activation criteria already installed.
			if ( PluginInstaller::is_plugin_installed( $plugin_path ) ) {
				// If the plugin is installed, we'll add it to the activation queue.
				PluginActivationTaskManager::add_to_queue(
					new PluginActivationTask(
						$plugin['slug']
					)
				);
				continue;
			}

			// If the plugin is not installed, we'll add it to the install/activation queue.
			PluginInstallTaskManager::add_to_queue(
				new PluginInstallTask(
					$plugin['slug'],
					true,
					isset( $plugin['priority'] ) ? $plugin['priority'] : 0
				)
			);
		}

		return;
	}
}
