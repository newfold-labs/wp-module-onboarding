<?php

namespace NewfoldLabs\WP\Module\Onboarding;

/**
 * Permissions wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Permissions
 */
class PermissionsWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Permissions constants are defined.
	 *
	 * @return void
	 */
	public function test_permission_constants() {
		$this->assertSame( 'manage_options', Permissions::ADMIN );
		$this->assertSame( 'install_themes', Permissions::INSTALL_THEMES );
		$this->assertSame( 'edit_themes', Permissions::EDIT_THEMES );
	}

	/**
	 * rest_is_authorized_admin returns false when not logged in.
	 *
	 * @return void
	 */
	public function test_rest_is_authorized_admin_when_logged_out() {
		wp_set_current_user( 0 );
		$this->assertFalse( Permissions::rest_is_authorized_admin() );
	}

	/**
	 * rest_is_authorized_admin returns true for admin user.
	 *
	 * @return void
	 */
	public function test_rest_is_authorized_admin_when_admin() {
		$user_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		wp_set_current_user( $user_id );
		$this->assertTrue( Permissions::rest_is_authorized_admin() );
	}

	/**
	 * custom_post_authorized_admin requires edit_posts and manage_options.
	 *
	 * @return void
	 */
	public function test_custom_post_authorized_admin_for_administrator() {
		$user_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		wp_set_current_user( $user_id );
		$this->assertTrue( Permissions::custom_post_authorized_admin() );
	}
}
