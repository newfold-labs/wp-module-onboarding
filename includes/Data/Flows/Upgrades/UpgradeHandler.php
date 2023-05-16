<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data\Flows\Upgrades;

/**
 * Class UpgradeHandler
 */
class UpgradeHandler {

	/**
	 * Detect when an upgrade is necessary and run the updates.
	 *
	 * @param string $old_version The previous WP Options version.
	 * @param string $new_version The current Flow Data version.
	 *
	 * @return bool Whether or not an upgrade routine ran.
	 */
	public static function maybe_upgrade( $old_version, $new_version ) {
		$should_upgrade = $old_version !== $new_version;
		if ( $should_upgrade ) {
			$available_routines = self::get_available_upgrade_routines();
			$required_routines  = self::get_required_upgrade_routines( $available_routines, $old_version, $new_version );

			self::run_upgrade_routines( $required_routines );
		}
		return $should_upgrade;
	}

	/**
	 * Retrieve a collection of available upgrade routines.
	 *
	 * @return array A collection of filepaths indexed by versions.
	 */
	public static function get_available_upgrade_routines() {
		$routines  = array();
		$filepaths = glob( dirname( __FILE__ ) . '/UpgradeRoutine/*.php' );
		if ( $filepaths ) {
			$versions = str_replace( '.php', '', array_map( 'basename', $filepaths ) );
			$routines = array_combine( $versions, $filepaths );
		}
		return $routines;
	}

	/**
	 * Get a collection of the required upgrade routines.
	 *
	 * @param array $available_routines A collection of available upgrade routines.
	 * @param string $old_version The previous WP Options version.
	 * @param string $new_version The current Flow Data version.
	 *
	 * @return array A collection of filepaths indexed by versions.
	 */
	public static function get_required_upgrade_routines( array $available_routines, $old_version, $new_version ) {
		$routines = array();
		$required = array();
		foreach ( array_keys( $available_routines ) as $current_version ) {
			if ( version_compare( $old_version, $current_version, '<' ) && version_compare( $new_version, $current_version, '>=' ) ) {
				array_push( $required, $current_version );
			}
		}
		if ( $required ) {
			$routines = array_intersect_key( $available_routines, array_combine( $required, $required ) );
		}
		return $routines;
	}

	/**
	 * Run an ordered set of upgrade routines.
	 *
	 * @param array $routines A collection of filepaths indexed by versions.
	 */
	public static function run_upgrade_routines( array $routines ) {
		foreach ( $routines as $file ) {
			if ( file_exists( $file ) ) {
				include $file;
			}
		}
	}
}
