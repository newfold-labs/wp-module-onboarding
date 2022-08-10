<?php
namespace NewfoldLabs\WP\Module\Onboarding\TaskManagers;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

final class TaskManager {
     function __construct() {
          if ( ! empty( get_option( Options::get_option_name( 'plugin_install_queue' ), array() ) ) ) {
               new PluginInstallTaskManager();
          }

          if ( ! empty( get_option( Options::get_option_name( 'theme_install_queue' ), array() ) ) ) {
               new ThemeInstallTaskManager();
          }
     }
}
