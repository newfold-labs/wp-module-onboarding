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

		$data = \get_option( Options::get_option_name( self::$states[ $state ] ), false );
		if ( ! $data ) {
			$data = array();
		}
		return $data;
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
		if ( ! in_array( $state, $slices ) ) {
			return false;
		}

		// Validate the data if it is provided
		if ( null !== $data && empty( $data ) ) {
			return false;
		}

		return true;
	}
}
