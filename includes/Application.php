<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Compatibility\Status;
use NewfoldLabs\WP\Module\Onboarding\RestApi\RestApi;
use NewfoldLabs\WP\Module\Onboarding\Services\PluginService;
use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Services\StatusService;
use NewfoldLabs\WP\Module\Onboarding\Services\EventService;

use function NewfoldLabs\WP\ModuleLoader\container;

/**
 * Primary instantiation of Onboarding Application.
 */
final class Application {

	/**
	 * The Plugin container.
	 *
	 * @var Container
	 */
	protected $container;

	/**
	 * Arguments for Onboarding.
	 *
	 * @var array
	 */
	protected $args;

	/**
	 * Setup module container and register functionality using WordPress Action Hooks.
	 *
	 * @param Container $container - Newfold Labs Module Container
	 */
	public function __construct( Container $container ) {
		$this->container = $container;

		$defaults = array(
			'option_name'     => 'nfd_onboarding',
			'admin_screen_id' => container()->plugin()->id,
			'admin_app_url'   => \admin_url( 'admin.php?page=nfd-onboarding' ),
		);

		$this->args = \wp_parse_args(
			$container->has( 'onboarding' ) ? $container['onboarding'] : array(),
			$defaults
		);

		if ( is_readable( NFD_ONBOARDING_DIR . '/vendor/autoload.php' ) ) {
			require_once NFD_ONBOARDING_DIR . '/vendor/autoload.php';
		}

		\do_action( 'nfd_module_onboarding_pre_init' );

		// Reset the stored Compatibility Status every time WP Core is updated.
		\add_action( '_core_updated_successfully', array( Status::class, 'reset' ) );

		\add_filter( 'login_redirect', array( LoginRedirect::class, 'wplogin' ), 10, 3 );
		\add_filter( 'newfold_sso_success_url', array( LoginRedirect::class, 'sso' ), 10 );
		\add_filter(
			Options::get_option_name( 'redirect' ) . '_disable',
			array( LoginRedirect::class, 'remove_handle_redirect_action' )
		);

		if ( defined( '\\WP_CLI' ) && \WP_CLI ) {
			new WP_CLI();
		}

		if ( Permissions::is_authorized_admin() || Permissions::rest_is_authorized_admin() ) {
			new RestApi();
			new WP_Admin();
			new ExternalRedirectInterceptor();
		}

		if ( Permissions::is_authorized_admin() ) {
			StatusService::track();
			// Initialize event tracking for database option changes
			EventService::init();
		}

		\do_action( 'nfd_module_onboarding_post_init' );
	}
}
