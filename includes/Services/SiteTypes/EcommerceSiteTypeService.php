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
use NewfoldLabs\WP\Module\Installer\Data\Options as InstallerOptions;
use NewfoldLabs\WP\Module\Onboarding\Data\Plugins;
use NewfoldLabs\WP\Module\Onboarding\Services\PostTypeService;
/**
 * Ecommerce site type service.
 */
class EcommerceSiteTypeService {

	/**
	 * WooCommerce plugin slug in the installer whitelist.
	 *
	 * @var string
	 */
	private const WOOCOMMERCE_SLUG = 'woocommerce';

	/**
	 * YITH Wishlist plugin slug in the installer whitelist.
	 *
	 * @var string
	 */
	private const WISHLIST_SLUG = 'nfd_slug_yith_woocommerce_wishlist';

	/**
	 * Publishes a list of WooCommerce products.
	 *
	 * @param array $products The products.
	 * @return int[] List of successfully created product IDs.
	 */
	public static function publish_products( array $products ): array {
		$category_map = self::build_category_map_from_products( $products );
		$created_ids  = array();

		foreach ( $products as $product ) {
			$category_ids = array();
			foreach ( ( $product['categories'] ?? array() ) as $category ) {
				if ( ! empty( $category_map[ $category ] ) ) {
					$category_ids[] = $category_map[ $category ];
				}
			}

			$product_id = self::publish_woo_product(
				$product['name'] ?? '',
				$product['short_description'] ?? '',
				$product['price'] ?? 0,
				$product['featured_image'] ?? '',
				$category_ids
			);

			if ( is_wp_error( $product_id ) ) {
				continue;
			}

			$created_ids[] = $product_id;
		}

		return $created_ids;
	}

	/**
	 * Builds a deduplicated category map: name → term_id.
	 *
	 * @param array $products The products.
	 * @return array<string,int> The map of category name to term ID.
	 */
	private static function build_category_map_from_products( array $products ): array {
		$category_map = array();
		foreach ( $products as $product ) {
			foreach ( ( $product['categories'] ?? array() ) as $category ) {
				if ( ! isset( $category_map[ $category ] ) ) {
					$category_map[ $category ] = self::create_or_get_woo_category( $category );
				}
			}
		}

		return $category_map;
	}

	/**
	 * Publishes a WooCommerce product.
	 *
	 * @param string           $name Product title.
	 * @param string           $description Product short description (excerpt).
	 * @param string|int|float $price Regular and sale price value for meta.
	 * @param string           $image_url Optional featured image URL (sideloaded later).
	 * @param array            $categories Term IDs for product_cat.
	 * @return int|\WP_Error The product ID or error.
	 */
	public static function publish_woo_product( string $name, string $description, $price, string $image_url = '', array $categories = array() ) {
		// Remove hooks that can slow down the operation.
		remove_all_actions( 'woocommerce_new_product' );
		remove_all_actions( 'woocommerce_update_product' );
		remove_all_actions( 'wp_insert_post' );
		remove_all_actions( 'save_post' );

		$post_author = get_current_user_id();
		if ( ! $post_author ) {
			$post_author = 1;
		}

		$product_data = array(
			'post_title'   => $name,
			'post_content' => '',
			'post_excerpt' => $description,
			'post_status'  => 'publish',
			'post_type'    => 'product',
			'post_author'  => $post_author,
		);
		// Insert product.
		$product_id = wp_insert_post( $product_data );
		// Validate product was created successfully.
		if ( is_wp_error( $product_id ) || ! $product_id ) {
			return new \WP_Error( 'error_publishing_woo_product', 'Failed to create product' );
		}
		// Product categories.
		if ( ! empty( $categories ) ) {
			wp_set_post_terms( $product_id, $categories, 'product_cat' );
		}

		// Register as a simple product and sync WC lookup tables so Shop / product
		// blocks (WC_Product_Query) can find these products — not just category archives.
		wp_set_object_terms( $product_id, 'simple', 'product_type', false );

		if ( function_exists( 'wc_get_product' ) ) {
			$product = wc_get_product( $product_id );
			if ( $product ) {
				$product->set_regular_price( (string) $price );
				$product->set_price( (string) $price );
				$product->set_stock_status( 'instock' );
				$product->set_manage_stock( false );
				$product->save();
			}
		} else {
			update_post_meta( $product_id, '_regular_price', $price );
			update_post_meta( $product_id, '_price', $price );
			update_post_meta( $product_id, '_stock_status', 'instock' );
			update_post_meta( $product_id, '_manage_stock', 'no' );
		}

		// Store the image URL as meta for async sideloading after onboarding completes.
		// MediaService::sideload_pending_images() will process it via WP-Cron.
		if ( ! empty( $image_url ) ) {
			update_post_meta( $product_id, 'nfd_image_url', esc_url_raw( $image_url ) );
		}

		// Mark as generated by onboarding.
		update_post_meta( $product_id, PostTypeService::META_ONBOARDING_GENERATED, '1' );

		return $product_id;
	}

	/**
	 * Sets the featured image for a WooCommerce product.
	 *
	 * @param string $image_url The URL of the image.
	 * @param int    $product_id The ID of the product.
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
	 * @param int    $product_id The ID of the product.
	 * @return int The ID of the attachment.
	 */
	private static function import_image_from_url( string $image_url, int $product_id ): int {
		if ( ! function_exists( 'media_handle_sideload' ) ) {
			require_once ABSPATH . 'wp-admin/includes/media.php';
			require_once ABSPATH . 'wp-admin/includes/file.php';
			require_once ABSPATH . 'wp-admin/includes/image.php';
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
		update_term_meta( $category['term_id'], PostTypeService::META_ONBOARDING_GENERATED, '1' );
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
	 * Publish WooCommerce's draft Refund and Returns Policy page and normalize its slug.
	 *
	 * WooCommerce creates this page as a draft during install. Sitegen policy pages
	 * link to it instead of duplicating the full returns policy content.
	 *
	 * @return bool
	 */
	public static function ensure_refund_returns_page_published(): bool {
		self::setup_woo_pages();

		$page_id = (int) \get_option( 'woocommerce_refund_returns_page_id', 0 );
		if ( $page_id <= 0 ) {
			return false;
		}

		$page = \get_post( $page_id );
		if ( ! $page instanceof \WP_Post || 'page' !== $page->post_type ) {
			return false;
		}

		$updates = array(
			'ID' => $page_id,
		);

		if ( 'publish' !== $page->post_status ) {
			$updates['post_status'] = 'publish';
		}

		if ( 'refund-and-returns-policy' !== $page->post_name ) {
			$updates['post_name'] = 'refund-and-returns-policy';
		}

		if ( count( $updates ) > 1 ) {
			$result = \wp_update_post( $updates, true );
			if ( \is_wp_error( $result ) ) {
				return false;
			}

			$page = \get_post( $page_id );
			if ( ! $page instanceof \WP_Post ) {
				return false;
			}
		}

		if ( ! self::normalize_refund_returns_page_layout( $page_id, $page ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Apply the same constrained policy-page layout used by Sitegen legal pages.
	 *
	 * @param int      $page_id Refund and returns page ID.
	 * @param \WP_Post $page    Refund and returns page object.
	 * @return bool
	 */
	private static function normalize_refund_returns_page_layout( int $page_id, \WP_Post $page ): bool {
		$content    = is_string( $page->post_content ) ? $page->post_content : '';
		$normalized = self::build_refund_returns_page_content( $content );

		if ( $normalized !== $content ) {
			$result = \wp_update_post(
				array(
					'ID'           => $page_id,
					'post_content' => $normalized,
				),
				true
			);

			if ( \is_wp_error( $result ) ) {
				return false;
			}
		}

		\update_post_meta( $page_id, '_wp_page_template', 'page-no-title' );

		return true;
	}

	/**
	 * Build canonical refund page markup: legal disclaimer + 840px policy container.
	 *
	 * @param string $content Existing page block markup.
	 * @return string
	 */
	private static function build_refund_returns_page_content( string $content ): string {
		$body = self::strip_refund_returns_sample_intro(
			self::extract_refund_returns_policy_body( $content )
		);

		return self::legal_policy_disclaimer_block_markup() . "\n\n" . self::wrap_refund_returns_policy_content( $body );
	}

	/**
	 * Extract refund policy body blocks from previously normalized markup.
	 *
	 * @param string $content Page block markup.
	 * @return string
	 */
	private static function extract_refund_returns_policy_body( string $content ): string {
		$content = preg_replace(
			'/<!-- wp:group \{"metadata":\{"name":"Legal Disclaimer"\}[\s\S]*?<!-- \/wp:group -->\s*/',
			'',
			$content
		);

		if ( ! is_string( $content ) ) {
			return '';
		}

		$content = trim( $content );

		if ( ! self::refund_returns_page_uses_policy_layout( $content ) ) {
			return $content;
		}

		if ( preg_match(
			'/<!-- wp:group \{"align":"full"[\s\S]*?"metadata":\{"name":"Refund Returns Policy"\}\} -->\s*<div[^>]*>\s*([\s\S]*?)\s*<\/div>\s*<!-- \/wp:group -->\s*$/',
			$content,
			$matches
		) ) {
			return trim( $matches[1] );
		}

		return $content;
	}

	/**
	 * Standard legal disclaimer prepended to auto-generated policy pages.
	 *
	 * @return string
	 */
	private static function legal_policy_disclaimer_block_markup(): string {
		$locale = function_exists( '\get_locale' ) ? \get_locale() : 'en_US';
		$text   = \esc_html( self::legal_policy_disclaimer_text_for_locale( $locale ) );

		return <<<HTML
<!-- wp:group {"metadata":{"name":"Legal Disclaimer"},"style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|40"}}},"layout":{"type":"constrained","contentSize":"840px"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"textColor":"contrast-midtone","fontSize":"small","style":{"typography":{"lineHeight":"1.7"}}} -->
<p class="has-contrast-midtone-color has-text-color has-small-font-size" style="line-height:1.7">{$text}</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->
HTML;
	}

	/**
	 * Localized disclaimer copy for policy pages.
	 *
	 * @param string $locale WordPress locale.
	 * @return string
	 */
	private static function legal_policy_disclaimer_text_for_locale( string $locale ): string {
		$localized = array(
			'en_US' => 'This page was automatically generated as a starting template only. It does not constitute legal advice. Review and update all policies with a qualified professional before accepting orders.',
			'en_GB' => 'This page was automatically generated as a starting template only. It does not constitute legal advice. Review and update all policies with a qualified professional before accepting orders.',
			'es_ES' => 'Esta página se generó automáticamente solo como plantilla inicial. No constituye asesoramiento legal. Revise y actualice todas las políticas con un profesional cualificado antes de aceptar pedidos.',
			'fr_FR' => 'Cette page a été générée automatiquement comme modèle de départ uniquement. Elle ne constitue pas un conseil juridique. Examinez et mettez à jour toutes les politiques avec un professionnel qualifié avant d\'accepter des commandes.',
		);

		return $localized[ $locale ] ?? $localized['en_US'];
	}

	/**
	 * Whether refund page content is already wrapped in the shared policy container.
	 *
	 * @param string $content Page block markup.
	 * @return bool
	 */
	private static function refund_returns_page_uses_policy_layout( string $content ): bool {
		return str_contains( $content, '"metadata":{"name":"Refund Returns Policy"}' );
	}

	/**
	 * Remove WooCommerce's placeholder intro from the default refund page.
	 *
	 * @param string $content Page block markup.
	 * @return string
	 */
	private static function strip_refund_returns_sample_intro( string $content ): string {
		$patterns = array(
			'/<!-- wp:paragraph -->\s*<p><b>This is a sample page\.<\/b><\/p>\s*<!-- \/wp:paragraph -->\s*/i',
			'/<!-- wp:paragraph -->\s*<p><strong>This is a sample page\.<\/strong><\/p>\s*<!-- \/wp:paragraph -->\s*/i',
		);

		foreach ( $patterns as $pattern ) {
			$content = preg_replace( $pattern, '', $content );
		}

		return trim( $content );
	}

	/**
	 * Wrap refund policy blocks in the same 840px container as Sitegen policy pages.
	 *
	 * @param string $inner_content Refund policy block markup.
	 * @return string
	 */
	private static function wrap_refund_returns_policy_content( string $inner_content ): string {
		$inner_content = trim( $inner_content );

		return <<<HTML
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"},"margin":{"top":"0","bottom":"0"}}},"layout":{"type":"constrained","contentSize":"840px"},"metadata":{"name":"Refund Returns Policy"}} -->
<div class="wp-block-group alignfull" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">

{$inner_content}

</div>
<!-- /wp:group -->
HTML;
	}

	/**
	 * Ensure the YITH wishlist page exists and is linked in plugin settings.
	 *
	 * YITH only auto-creates this page on first install. Sitegen may activate the
	 * plugin after Woo pages are already in place, or the option can exist without
	 * a valid page — both cases leave the header icon with an empty URL.
	 *
	 * @return bool
	 */
	public static function ensure_wishlist_page(): bool {
		if ( ! defined( 'YITH_WCWL' ) ) {
			return false;
		}

		self::load_wc_create_page_function();

		if ( ! function_exists( 'wc_create_page' ) ) {
			return false;
		}

		$page_id = (int) \get_option( 'yith_wcwl_wishlist_page_id', 0 );
		if ( $page_id > 0 && 'publish' === \get_post_status( $page_id ) ) {
			return true;
		}

		$page_id = \wc_create_page(
			\sanitize_title_with_dashes( \_x( 'wishlist', 'page_slug', 'yith-woocommerce-wishlist' ) ),
			'yith_wcwl_wishlist_page_id',
			\__( 'Wishlist', 'yith-woocommerce-wishlist' ),
			'<!-- wp:shortcode -->[yith_wcwl_wishlist]<!-- /wp:shortcode -->'
		);

		return is_numeric( $page_id ) && (int) $page_id > 0;
	}

	/**
	 * wc_create_page() lives in an admin include and is not loaded on the frontend.
	 *
	 * YITH Wishlist calls it from its own init hook; load it early so that install
	 * does not fatal on frontend/cron requests during sitegen.
	 *
	 * @return void
	 */
	public static function load_wc_create_page_function(): void {
		if ( function_exists( 'wc_create_page' ) ) {
			return;
		}

		if ( defined( 'WC_ABSPATH' ) ) {
			require_once WC_ABSPATH . 'includes/admin/wc-admin-functions.php';
			return;
		}

		if ( function_exists( 'WC' ) && is_callable( array( WC(), 'plugin_path' ) ) ) {
			require_once WC()->plugin_path() . '/includes/admin/wc-admin-functions.php';
		}
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
		return Plugins::get_ecommerce_plugins();
	}

	/**
	 * Installs the ecommerce plugins (background task).
	 *
	 * @param array<string> $exclude_slugs Plugin slugs to skip (e.g. already installed synchronously).
	 * @return void
	 */
	public static function install_ecommerce_plugins( array $exclude_slugs = array() ): void {
		$ecommerce_plugins = self::get_ecommerce_plugins();

		foreach ( $ecommerce_plugins as $plugin ) {
			if ( in_array( $plugin['slug'], $exclude_slugs, true ) ) {
				continue;
			}

			$plugin_type = PluginInstaller::get_plugin_type( $plugin['slug'] );
			$plugin_path = PluginInstaller::get_plugin_path( $plugin['slug'], $plugin_type );
			if ( ! $plugin_path ) {
				continue;
			}

			// Checks if a plugin with the given slug and activation criteria already installed.
			if ( PluginInstaller::is_plugin_installed( $plugin_path ) ) {
				// Already active → nothing to do (e.g. WooCommerce after sync install).
				if ( PluginInstaller::is_active( $plugin_path ) ) {
					continue;
				}
				// Installed but inactive → queue activation.
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
	}

	/**
	 * Ensure WooCommerce and YITH Wishlist are active before ecommerce operations.
	 *
	 * WooCommerce and Wishlist are installed/activated synchronously (blocking calls).
	 * Any other ecommerce plugins (YITH shipping/payments, brand-specific) are queued
	 * for background install.
	 *
	 * @return \WP_REST_Response|null Null when the sync stack is ready, response when blocked.
	 */
	public static function ensure_woocommerce_active(): ?\WP_REST_Response {
		$woo_response = self::ensure_sync_plugin_active( self::WOOCOMMERCE_SLUG, 'WooCommerce' );
		if ( null !== $woo_response ) {
			return self::queue_ecommerce_stack_and_respond( $woo_response );
		}

		$wishlist_response = self::ensure_sync_plugin_active( self::WISHLIST_SLUG, 'YITH Wishlist' );
		if ( null !== $wishlist_response ) {
			return self::queue_ecommerce_stack_and_respond( $wishlist_response );
		}

		self::ensure_wishlist_page();

		return self::queue_ecommerce_stack_and_respond( null );
	}

	/**
	 * Synchronously install and activate a single ecommerce plugin.
	 *
	 * @param string $slug  Installer whitelist slug.
	 * @param string $label Human-readable label for error responses.
	 * @return \WP_REST_Response|null Null when the plugin is ready.
	 */
	private static function ensure_sync_plugin_active( string $slug, string $label ): ?\WP_REST_Response {
		$plugin_type = PluginInstaller::get_plugin_type( $slug );
		$plugin_path = PluginInstaller::get_plugin_path( $slug, $plugin_type );
		if ( ! $plugin_path ) {
			return new \WP_REST_Response( array( 'error' => $label . ' slug not whitelisted.' ), 500 );
		}

		if ( self::is_plugin_install_in_progress( $slug ) ) {
			return self::plugin_installing_response( $slug );
		}

		self::extend_install_time_limit();

		if ( ! PluginInstaller::is_plugin_installed( $plugin_path ) ) {
			$install_result = PluginInstaller::install( $slug, true );
			if ( is_wp_error( $install_result ) ) {
				return self::plugin_installing_response( $slug );
			}
		} elseif ( ! PluginInstaller::is_active( $plugin_path ) ) {
			$result = PluginInstaller::activate( $slug );
			if ( is_wp_error( $result ) || false === $result ) {
				return new \WP_REST_Response( array( 'error' => $label . ' could not be activated.' ), 500 );
			}
		}

		return null;
	}

	/**
	 * Whether the background installer cron is currently processing a plugin slug.
	 *
	 * @param string $slug Installer whitelist slug.
	 * @return bool
	 */
	private static function is_plugin_install_in_progress( string $slug ): bool {
		$cron_current = get_option( InstallerOptions::get_option_name( 'plugins_init_status' ) );
		return $slug === $cron_current;
	}

	/**
	 * Raise the PHP time limit for synchronous wp.org downloads.
	 *
	 * @return void
	 */
	private static function extend_install_time_limit(): void {
		if ( function_exists( 'set_time_limit' ) ) {
			@set_time_limit( 180 ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
		}
	}

	/**
	 * REST response while a sync ecommerce plugin is still being installed.
	 *
	 * @param string $slug Installer whitelist slug.
	 * @return \WP_REST_Response
	 */
	private static function plugin_installing_response( string $slug ): \WP_REST_Response {
		return new \WP_REST_Response(
			array(
				'status'  => 'installing',
				'pending' => array( $slug ),
			),
			202
		);
	}

	/**
	 * Queue remaining ecommerce plugins, then return the caller's response (null = ready).
	 *
	 * @param \WP_REST_Response|null $response Response to return after queueing.
	 * @return \WP_REST_Response|null
	 */
	private static function queue_ecommerce_stack_and_respond( ?\WP_REST_Response $response ): ?\WP_REST_Response {
		self::install_ecommerce_plugins(
			array(
				self::WOOCOMMERCE_SLUG,
				self::WISHLIST_SLUG,
			)
		);
		return $response;
	}
}
