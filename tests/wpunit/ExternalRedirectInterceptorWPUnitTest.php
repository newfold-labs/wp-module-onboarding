<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Bluehost;

/**
 * ExternalRedirectInterceptor wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\ExternalRedirectInterceptor
 */
class ExternalRedirectInterceptorWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	public function tearDown(): void {
		unset( $_GET['page'] );
		parent::tearDown();
	}

	public function test_wp_redirect_allows_brand_plugin_url() {
		$interceptor = new ExternalRedirectInterceptor();
		$brand_url   = Bluehost::get_plugin_dashboard_page();
		$this->assertSame( $brand_url, $interceptor->wp_redirect( $brand_url ) );
	}

	public function test_wp_redirect_blocks_unrelated_url() {
		$interceptor = new ExternalRedirectInterceptor();
		$this->assertSame( '', $interceptor->wp_redirect( 'https://external.example.com/some-path' ) );
	}

	public function test_wp_redirect_allows_url_with_whitelisted_referrer() {
		$interceptor = new ExternalRedirectInterceptor();
		$url         = 'https://example.com/anywhere?referrer=' . WP_Admin::$slug;
		$this->assertSame( $url, $interceptor->wp_redirect( $url ) );
	}

	public function test_constructor_attaches_filter_only_on_onboarding_page() {
		$_GET['page'] = WP_Admin::$slug;
		new ExternalRedirectInterceptor();
		$this->assertTrue( \has_filter( 'wp_redirect' ) !== false );
	}
}
