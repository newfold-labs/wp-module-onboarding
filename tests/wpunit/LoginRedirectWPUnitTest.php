<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

/**
 * LoginRedirect wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\LoginRedirect
 */
class LoginRedirectWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	private $original_redirect = 'https://example.com/wp-admin/';

	/**
	 * tearDown lifecycle hook.
	 *
	 * @return void
	 */
	public function tearDown(): void {
		\delete_option( Options::get_option_name( 'redirect' ) );
		parent::tearDown();
	}

	/**
	 * Enable and disable redirect update option.
	 *
	 * @return void
	 */
	public function test_enable_and_disable_redirect_update_option() {
		LoginRedirect::enable_redirect();
		$this->assertSame( '1', \get_option( Options::get_option_name( 'redirect' ) ) );

		LoginRedirect::disable_redirect();
		$this->assertSame( '0', \get_option( Options::get_option_name( 'redirect' ) ) );
	}

	/**
	 * Filter redirect returns original for non admin user.
	 *
	 * @return void
	 */
	public function test_filter_redirect_returns_original_for_non_admin_user() {
		$user_id = self::factory()->user->create( array( 'role' => 'subscriber' ) );
		$user    = \get_user_by( 'id', $user_id );
		$this->assertSame( $this->original_redirect, LoginRedirect::filter_redirect( $this->original_redirect, $user ) );
	}

	/**
	 * Filter redirect returns original when redirect option disabled.
	 *
	 * @return void
	 */
	public function test_filter_redirect_returns_original_when_redirect_option_disabled() {
		LoginRedirect::disable_redirect();
		$user_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		$user    = \get_user_by( 'id', $user_id );
		$this->assertSame( $this->original_redirect, LoginRedirect::filter_redirect( $this->original_redirect, $user ) );
	}

	/**
	 * Filter redirect returns onboarding url when redirect option enabled.
	 *
	 * @return void
	 */
	public function test_filter_redirect_returns_onboarding_url_when_redirect_option_enabled() {
		LoginRedirect::enable_redirect();
		$user_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		$user    = \get_user_by( 'id', $user_id );
		$result  = LoginRedirect::filter_redirect( $this->original_redirect, $user );
		$this->assertStringContainsString( 'page=' . WP_Admin::$slug, $result );
	}

	/**
	 * Filter redirect returns original when not fresh install.
	 *
	 * @return void
	 */
	public function test_filter_redirect_returns_original_when_not_fresh_install() {
		$user_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		$user    = \get_user_by( 'id', $user_id );
		// No redirect option set and the container has no isFreshInstallation binding -> returns original.
		$this->assertSame( $this->original_redirect, LoginRedirect::filter_redirect( $this->original_redirect, $user ) );
	}

	/**
	 * Wplogin returns original when user is not wp user.
	 *
	 * @return void
	 */
	public function test_wplogin_returns_original_when_user_is_not_wp_user() {
		$result = LoginRedirect::wplogin( $this->original_redirect, $this->original_redirect, new \WP_Error( 'fail' ) );
		$this->assertSame( $this->original_redirect, $result );
	}

	/**
	 * Remove handle redirect action is callable.
	 *
	 * @return void
	 */
	public function test_remove_handle_redirect_action_is_callable() {
		// Just ensure it does not throw. With no action registered the return is false.
		$result = LoginRedirect::remove_handle_redirect_action();
		$this->assertIsBool( $result );
	}
}
