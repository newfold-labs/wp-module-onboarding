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
	 * Rest_is_authorized_admin returns false when not logged in.
	 *
	 * @return void
	 */
	public function test_rest_is_authorized_admin_when_logged_out() {
		wp_set_current_user( 0 );
		$this->assertFalse( Permissions::rest_is_authorized_admin() );
	}

	/**
	 * Rest_is_authorized_admin returns true for admin user.
	 *
	 * @return void
	 */
	public function test_rest_is_authorized_admin_when_admin() {
		$user_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		wp_set_current_user( $user_id );
		$this->assertTrue( Permissions::rest_is_authorized_admin() );
	}

	/**
	 * Custom_post_authorized_admin requires edit_posts and manage_options.
	 *
	 * @return void
	 */
	public function test_custom_post_authorized_admin_for_administrator() {
		$user_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		wp_set_current_user( $user_id );
		$this->assertTrue( Permissions::custom_post_authorized_admin() );
	}

	/**
	 * Rest_is_authorized_admin returns false for non-admin user.
	 *
	 * @return void
	 */
	public function test_rest_is_authorized_admin_for_subscriber() {
		$user_id = self::factory()->user->create( array( 'role' => 'subscriber' ) );
		wp_set_current_user( $user_id );
		$this->assertFalse( Permissions::rest_is_authorized_admin() );
	}

	/**
	 * Rest_can_manage_themes returns true when user has install + edit themes caps.
	 *
	 * @return void
	 */
	public function test_rest_can_manage_themes_for_administrator() {
		$user_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		wp_set_current_user( $user_id );
		$this->assertTrue( Permissions::rest_can_manage_themes() );
	}

	/**
	 * Rest_can_manage_themes returns false when user is logged out.
	 *
	 * @return void
	 */
	public function test_rest_can_manage_themes_when_logged_out() {
		wp_set_current_user( 0 );
		$this->assertFalse( Permissions::rest_can_manage_themes() );
	}

	/**
	 * Is_authorized_admin returns false outside wp-admin context.
	 *
	 * @return void
	 */
	public function test_is_authorized_admin_outside_admin_context() {
		$user_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		wp_set_current_user( $user_id );
		// is_admin() defaults to false in tests.
		$this->assertFalse( Permissions::is_authorized_admin() );
	}

	/**
	 * Custom_post_authorized_admin returns false for non-admin user.
	 *
	 * @return void
	 */
	public function test_custom_post_authorized_admin_for_subscriber() {
		$user_id = self::factory()->user->create( array( 'role' => 'subscriber' ) );
		wp_set_current_user( $user_id );
		$this->assertFalse( Permissions::custom_post_authorized_admin() );
	}
}
