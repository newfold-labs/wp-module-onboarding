<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Brand configuration accessor for multi-brand host plugins.
 */
final class BrandConfig {

	/**
	 * Current onboarding brand slug (e.g. bluehost, hostgator-us).
	 *
	 * @return string
	 */
	public static function get_brand_slug(): string {
		if ( defined( 'NFD_ONBOARDING_PLUGIN_BRAND' ) ) {
			return NFD_ONBOARDING_PLUGIN_BRAND;
		}

		return 'bluehost';
	}

	/**
	 * Whether the slug is defined in Brands::get_brands().
	 *
	 * @param string $brand Brand slug.
	 * @return bool
	 */
	public static function is_known_brand( string $brand ): bool {
		return array_key_exists( $brand, Brands::get_brands() );
	}

	/**
	 * Brand plugin dashboard admin URL for the current brand.
	 *
	 * @return string
	 */
	public static function get_plugin_dashboard_page(): string {
		$current = Runtime::current_brand();

		return isset( $current['pluginDashboardPage'] ) ? $current['pluginDashboardPage'] : \admin_url( 'admin.php' );
	}

	/**
	 * Query args appended when redirecting to the brand plugin dashboard.
	 *
	 * @return array<string, string>
	 */
	public static function get_dashboard_redirect_params(): array {
		$current = Runtime::current_brand();

		if ( isset( $current['dashboardRedirectParams'] ) && is_array( $current['dashboardRedirectParams'] ) ) {
			return $current['dashboardRedirectParams'];
		}

		return array(
			'referrer' => 'nfd-onboarding',
		);
	}

	/**
	 * Human-readable brand name for the current host (editor chat, admin bar, etc.).
	 *
	 * @return string
	 */
	public static function get_current_brand_name(): string {
		$current = Runtime::current_brand();
		$name    = isset( $current['name'] ) ? (string) $current['name'] : '';

		return '' !== $name ? $name : 'WordPress';
	}

	/**
	 * Brand id sent to the editor-chat worker handshake (plugin id, not onboarding slug).
	 *
	 * @return string
	 */
	public static function get_editor_chat_brand_id(): string {
		$current = Runtime::current_brand();

		if ( ! empty( $current['editorChatBrandId'] ) ) {
			return (string) $current['editorChatBrandId'];
		}

		return self::infer_editor_chat_brand_id( $current );
	}

	/**
	 * Account, email, and billing URLs for the editor-chat header menu.
	 *
	 * @return array<string, string>
	 */
	public static function get_editor_portal_links(): array {
		$current = Runtime::current_brand();
		$links   = array(
			'accountUrl' => isset( $current['accountUrl'] ) ? (string) $current['accountUrl'] : '',
			'emailUrl'   => isset( $current['emailUrl'] ) ? (string) $current['emailUrl'] : '',
			'billingUrl' => isset( $current['billingUrl'] ) ? (string) $current['billingUrl'] : '',
		);

		foreach ( $links as $key => $url ) {
			if ( '' !== $url ) {
				$links[ $key ] = (string) apply_filters( 'nfd_build_url', $url );
			}
		}

		/**
		 * Filter portal URLs exposed to the editor chat UI.
		 *
		 * @param array<string, string> $links    accountUrl, emailUrl, billingUrl.
		 * @param string                $brand_id Editor-chat brand id (see get_editor_chat_brand_id()).
		 */
		return (array) apply_filters(
			'nfd_editor_chat_brand_links',
			$links,
			self::get_editor_chat_brand_id()
		);
	}

	/**
	 * Brand payload localized to `window.nfdEditorChat.brand`.
	 *
	 * @return array<string, string>
	 */
	public static function get_brand_for_editor_chat_js(): array {
		$links = self::get_editor_portal_links();

		return array(
			'id'         => self::get_editor_chat_brand_id(),
			'name'       => self::get_current_brand_name(),
			'accountUrl' => \esc_url( $links['accountUrl'] ?? '' ),
			'emailUrl'   => \esc_url( $links['emailUrl'] ?? '' ),
			'billingUrl' => \esc_url( $links['billingUrl'] ?? '' ),
			'adminUrl'   => \admin_url(),
		);
	}

	/**
	 * Infer worker brand id when editorChatBrandId is not set on the registry entry.
	 *
	 * @param array<string, mixed> $current Current brand configuration.
	 * @return string
	 */
	private static function infer_editor_chat_brand_id( array $current ): string {
		$brand = isset( $current['brand'] ) ? (string) $current['brand'] : '';

		if ( false !== stripos( $brand, 'hostgator' ) ) {
			return 'hostgator';
		}
		if ( false !== stripos( $brand, 'bluehost' ) ) {
			return 'bluehost';
		}
		if ( 'webcom' === $brand ) {
			return 'web';
		}
		if ( 'crazy-domains' === $brand ) {
			return 'crazydomains';
		}

		$slug = \sanitize_title( $brand );

		return '' !== $slug ? $slug : 'bluehost';
	}
}
