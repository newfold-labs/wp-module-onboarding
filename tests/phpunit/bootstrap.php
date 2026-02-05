<?php
/**
 * Bootstrap for PHPUnit tests that do not require WordPress.
 *
 * Used by the PHPUnit test suite only. For WordPress-dependent tests use
 * Codeception wpunit (codecept run wpunit) instead.
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

$module_root = dirname( dirname( __DIR__ ) );

require_once $module_root . '/vendor/autoload.php';
