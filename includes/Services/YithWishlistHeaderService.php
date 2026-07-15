<?php
/**
 * YITH Wishlist header shortcode for ecommerce sitekit headers.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Services
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\EcommerceSiteTypeService;

/**
 * Registers a header wishlist icon shortcode with live count updates.
 */
class YithWishlistHeaderService {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'ensure_wc_create_page_available' ), 1 );
		add_action( 'init', array( $this, 'register' ) );
		add_action( 'activated_plugin', array( $this, 'maybe_setup_wishlist_page' ), 10, 1 );
	}

	/**
	 * Load wc_create_page() before YITH Wishlist install runs on init.
	 *
	 * @return void
	 */
	public function ensure_wc_create_page_available(): void {
		EcommerceSiteTypeService::load_wc_create_page_function();
	}

	/**
	 * Create the wishlist page when the plugin is activated.
	 *
	 * @param string $plugin Plugin basename.
	 * @return void
	 */
	public function maybe_setup_wishlist_page( string $plugin ): void {
		if ( false === strpos( $plugin, 'yith-woocommerce-wishlist' ) ) {
			return;
		}

		EcommerceSiteTypeService::ensure_wishlist_page();
	}

	/**
	 * Register shortcode and AJAX handlers when YITH Wishlist is available.
	 *
	 * @return void
	 */
	public function register(): void {
		if ( ! defined( 'YITH_WCWL' ) || ! function_exists( 'yith_wcwl_count_all_products' ) ) {
			return;
		}

		add_shortcode( 'yith_wcwl_items_count', array( $this, 'render_items_count' ) );
		add_action( 'wp_ajax_nfd_yith_wcwl_update_wishlist_count', array( $this, 'ajax_update_count' ) );
		add_action( 'wp_ajax_nopriv_nfd_yith_wcwl_update_wishlist_count', array( $this, 'ajax_update_count' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 20 );
	}

	/**
	 * Render the header wishlist link and item count.
	 *
	 * @return string
	 */
	public function render_items_count(): string {
		EcommerceSiteTypeService::ensure_wishlist_page();

		$count        = (int) yith_wcwl_count_all_products();
		$wishlist_url = YITH_WCWL()->get_wishlist_url();

		if ( empty( $wishlist_url ) ) {
			return '';
		}

		ob_start();
		?>
		<div class="nfd-wishlist-header">
			<a
				class="nfd-wishlist-header__link"
				href="<?php echo esc_url( $wishlist_url ); ?>"
				aria-label="<?php echo esc_attr__( 'Wishlist', 'wp-module-onboarding' ); ?>"
			>
				<svg class="nfd-wishlist-header__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
					<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
				</svg>
				<span
					class="nfd-wishlist-header__count"
					data-count="<?php echo esc_attr( (string) $count ); ?>"
					<?php echo $count > 0 ? '' : ' hidden'; ?>
				><?php echo esc_html( (string) $count ); ?></span>
			</a>
		</div>
		<?php
		return (string) ob_get_clean();
	}

	/**
	 * Return the current wishlist count for AJAX refresh.
	 *
	 * @return void
	 */
	public function ajax_update_count(): void {
		wp_send_json(
			array(
				'count' => (int) yith_wcwl_count_all_products(),
			)
		);
	}

	/**
	 * Keep the header counter in sync after wishlist changes.
	 *
	 * @return void
	 */
	public function enqueue_scripts(): void {
		if ( ! wp_script_is( 'jquery-yith-wcwl', 'registered' ) ) {
			return;
		}

		$inline = sprintf(
			'jQuery(function($){$(document).on("added_to_wishlist removed_from_wishlist",function(){$.get(%1$s,{action:%2$s},function(data){if(!data||typeof data.count==="undefined"){return;}$(".nfd-wishlist-header__count").text(data.count).attr("data-count",data.count).prop("hidden",parseInt(data.count,10)<=0);});});});',
			wp_json_encode( admin_url( 'admin-ajax.php' ) ),
			wp_json_encode( 'nfd_yith_wcwl_update_wishlist_count' )
		);

		wp_add_inline_script( 'jquery-yith-wcwl', $inline );
	}
}
