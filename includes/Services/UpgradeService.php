<?php
/**
 * Upgrade service.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Services
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use WP_Forge\UpgradeHandler\UpgradeHandler;

/**
 * Runs versioned upgrade routines from the module's `upgrades/` directory.
 *
 * Routines are named after the module version that introduced them (e.g. `4.0.11.php`)
 * and run once when the stored module version is older than the routine.
 */
class UpgradeService {

	/**
	 * Run any pending upgrade routines and record the current module version.
	 *
	 * Runs on every request type (not just admin) because routines may gate
	 * front-end behavior. When the stored version matches, this is a single
	 * autoloaded option read.
	 *
	 * @return bool Whether an upgrade ran.
	 */
	public static function maybe_upgrade(): bool {
		if ( ! defined( 'NFD_ONBOARDING_VERSION' ) || ! defined( 'NFD_ONBOARDING_DIR' ) ) {
			return false;
		}

		$option_name = Options::get_option_name( 'module_version' );

		$upgrade_handler = new UpgradeHandler(
			NFD_ONBOARDING_DIR . '/upgrades',
			get_option( $option_name, '0' ),
			NFD_ONBOARDING_VERSION
		);

		$did_upgrade = $upgrade_handler->maybe_upgrade();
		if ( $did_upgrade ) {
			update_option( $option_name, NFD_ONBOARDING_VERSION, true );
		}

		return $did_upgrade;
	}
}
