<?php
/**
 * A class to interact (get/set) with Onboarding Redux State.
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

/**
 * Redux State Service Class
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */
class ReduxStateService {

	/**
	 * Slices/States — database option names
	 *
	 * @var array
	 */
	private static $states = array(
		'input'      => 'state_input',
		'steps'      => 'state_steps',
		'sitegen'    => 'state_sitegen',
		'logogen'    => 'state_logogen',
		'blueprints' => 'state_blueprints',
	);

	/**
	 * Get the state data
	 *
	 * @param string $state The slice name to get
	 * @return array The state data
	 */
	public static function get( string $state ): array {
		$data = array();
		if ( ! self::validate( $state ) ) {
			return $data;
		}

		$getter = 'get_' . self::$states[ $state ];

		if ( is_callable( array( self::class, $getter ) ) ) {
			$data = call_user_func( array( self::class, $getter ) );
		} else {
			$data = \get_option( Options::get_option_name( self::$states[ $state ] ), false );
		}

		if ( ! $data ) {
			$data = array();
		}

		return $data;
	}

	/**
	 * Get the sitegen slice reconstructed from individual dedicated options.
	 *
	 * @return array The sitegen slice data.
	 */
	public static function get_state_sitegen(): array {
		return array(
			'siteId'              => \get_option( Options::get_option_name( 'sitegen_site_id' ), '' ),
			'siteGenId'           => \get_option( Options::get_option_name( 'sitegen_current_id' ), '' ),
			'siteType'            => \get_option( Options::get_option_name( 'sitegen_site_type' ), '' ),
			'enhancedPrompt'      => \get_option( Options::get_option_name( 'sitegen_enhanced_prompt' ), '' ),
			'discoveryData'       => \get_option( Options::get_option_name( 'sitegen_discovery_data' ), array() ),
			'sitegenSliceVersion' => 0,
		);
	}

	/**
	 * Update the input slice state
	 *
	 * @param string $state The slice name to update
	 * @param array  $data The update slice state
	 * @return bool True if the update was successful, false otherwise
	 */
	public static function update( string $state, array $data ): bool {
		if ( ! self::validate( $state, $data ) ) {
			return false;
		}

		// Update the last updated time
		$data['last_updated'] = time();

		return \update_option( Options::get_option_name( self::$states[ $state ] ), $data );
	}

	/**
	 * Validate the state and data
	 *
	 * @param string     $state The slice name to update
	 * @param array|null $data The update slice state
	 * @return bool True if the update was successful, false otherwise
	 */
	private static function validate( string $state, ?array $data = null ): bool {
		// Validate the state
		$slices = array_keys( self::$states );
		if ( ! in_array( $state, $slices, true ) ) {
			return false;
		}

		// Validate the data if it is provided
		if ( null !== $data && empty( $data ) ) {
			return false;
		}

		return true;
	}
}
