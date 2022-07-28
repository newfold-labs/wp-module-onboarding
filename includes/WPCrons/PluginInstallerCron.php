<?php
namespace NewfoldLabs\WP\Module\Onboarding\WPCrons;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Services\PluginInstaller;

class PluginInstallerCron {
	function __construct() {
		 // Ensure there is a minutely option in the cron schedules
		add_filter( 'cron_schedules', array( $this, 'add_thirty_seconds_schedule' ) );

		// Minutely cron hook
		add_action( 'nfd_module_onboarding_plugin_install_cron', array( $this, 'install' ) );

		// Register the cron task
		if ( ! wp_next_scheduled( 'nfd_module_onboarding_plugin_install_cron' ) ) {
			wp_schedule_event( time(), 'thirty_seconds', 'nfd_module_onboarding_plugin_install_cron' );
		}
	}

	public function add_thirty_seconds_schedule( $schedules ) {
		if ( ! array_key_exists( 'thirty_seconds', $schedules ) || 30 !== $schedules['thirty_seconds']['interval'] ) {
			$schedules['thirty_seconds'] = array(
				'interval' => 30,
				'display'  => __( 'Once Every Thirty Seconds' ),
			);
		}

		 return $schedules;
	}

	public function install() {
		 $plugins           = \get_option( Options::get_option_name( 'plugin_install_queue' ), array() );
		 $plugin_to_install = array_shift( $plugins );
		 \update_option( Options::get_option_name( 'plugins_init_status' ), $plugin_to_install['slug'] );
		 $status = PluginInstaller::install( $plugin_to_install['slug'], $plugin_to_install['activate'] );
		if ( \is_wp_error( $status ) ) {
			 array_push( $plugins, $plugin_to_install );
		}
		if ( empty( $plugins ) ) {
			 \update_option( Options::get_option_name( 'plugins_init_status' ), 'completed' );
		}
		 return \update_option( Options::get_option_name( 'plugin_install_queue' ), $plugins );
	}
}
