<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Runtime;

/**
 * Data Runtime wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Data\Runtime
 */
class RuntimeWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Wp current user details for logged out user returns empty strings.
	 *
	 * @return void
	 */
	public function test_wp_current_user_details_for_logged_out_user_returns_empty_strings() {
		\wp_set_current_user( 0 );
		$details = Runtime::wp_current_user_details();
		$this->assertSame(
			array(
				'displayName' => '',
				'avatarUrl'   => '',
			),
			$details
		);
	}

	/**
	 * Wp current user details for logged in user.
	 *
	 * @return void
	 */
	public function test_wp_current_user_details_for_logged_in_user() {
		$user_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		\wp_set_current_user( $user_id );
		$details = Runtime::wp_current_user_details();
		$this->assertArrayHasKey( 'displayName', $details );
		$this->assertArrayHasKey( 'avatarUrl', $details );
		$this->assertNotEmpty( $details['displayName'] );
		$this->assertNotEmpty( $details['avatarUrl'] );
	}

	/**
	 * Is fresh installation defaults to false.
	 *
	 * @return void
	 */
	public function test_is_fresh_installation_defaults_to_false() {
		$this->assertFalse( Runtime::is_fresh_installation() );
	}

	/**
	 * Coming soon defaults to false when service not bound.
	 *
	 * @return void
	 */
	public function test_coming_soon_defaults_to_false_when_service_not_bound() {
		$this->assertFalse( Runtime::coming_soon() );
	}

	/**
	 * Current brand returns array with brand key.
	 *
	 * @return void
	 */
	public function test_current_brand_returns_array_with_brand_key() {
		$brand = Runtime::current_brand();
		$this->assertIsArray( $brand );
		$this->assertArrayHasKey( 'brand', $brand );
	}
}
