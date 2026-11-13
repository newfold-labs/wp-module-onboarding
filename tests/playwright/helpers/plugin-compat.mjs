/**
 * Newfold helper compatibility layer for brand plugins whose Playwright helpers
 * predate the shared WooCommerce / installer-queue helpers (e.g. wp-plugin-web).
 *
 * Other modules' tests (ecommerce, coming-soon, deactivation, performance) call
 * `newfold.installWooCommerce`, `newfold.uninstallWooCommerce`,
 * `newfold.isWooCommerceActive` and `newfold.clearInstallerQueues`. These are ported
 * from wp-plugin-bluehost `main` (tests/playwright/helpers/newfold.js) and are only
 * used when the brand plugin does not provide its own implementation.
 * `newfold.setCapability` is wrapped to add the canAccessAI marker that
 * wp-module-data requires (used by performance tests), matching Bluehost main.
 *
 * Works with both wpCli() styles:
 * - Bluehost: wpCli(command, { failOnNonZeroExit }) may throw.
 * - wp-plugin-web: wpCli(command) never throws; returns 0, output, a non-zero
 *   exit code, or an "Error: ..." string.
 */

/**
 * Companion plugins known to call WooCommerce classes unconditionally on bootstrap;
 * deactivated alongside WooCommerce so they cannot fatal later tests.
 */
const WOOCOMMERCE_DEPENDENT_PLUGINS = ['wp-plugin-payments-shipping'];

const WP_CLI_SKIP_STACK = '--skip-plugins --skip-themes';

/** wp_options cleared before later Playwright projects (wp-module-installer queues). */
const INSTALLER_QUEUE_OPTIONS = [
  'nfd_module_installer_plugin_install_queue',
  'nfd_module_installer_plugin_activation_queue',
  'nfd_module_installer_plugin_deactivation_queue',
  'nfd_module_installer_plugin_uninstall_queue',
  'nfd_module_installer_plugins_init_status',
];

/** Cron hook names unscheduled by clearInstallerQueues. */
const INSTALLER_CRON_HOOKS = [
  'nfd_module_installer_plugin_install_cron',
  'nfd_module_installer_plugin_activation_event',
  'nfd_module_installer_plugin_deactivation_event',
  'nfd_module_installer_plugin_uninstall_cron',
  'nfd_module_installer_theme_install_cron',
];

const WP_CLI_IDENTIFIER = /^[a-z0-9_]+$/;

/**
 * @param {string[]} identifiers Option or hook names embedded in wp eval PHP.
 * @returns {string} PHP array elements as double-quoted literals.
 */
function phpQuotedIdentifierList(identifiers) {
  return identifiers
    .map((name) => {
      if (!WP_CLI_IDENTIFIER.test(name)) {
        throw new Error(`Invalid WP-CLI identifier: ${name}`);
      }
      return `"${name}",`;
    })
    .join(' ');
}

/**
 * One wp eval for installer cleanup. The PHP must not contain single quotes
 * because it is wrapped in a shell single-quoted segment.
 *
 * @returns {string}
 */
function buildClearInstallerQueuesCommand() {
  const queueList = phpQuotedIdentifierList(INSTALLER_QUEUE_OPTIONS);
  const hookList = phpQuotedIdentifierList(INSTALLER_CRON_HOOKS);

  const php = `
$options = array( ${queueList} );
foreach ( $options as $option ) { delete_option( $option ); }
$remaining = array();
foreach ( $options as $option ) {
if ( false !== get_option( $option, false ) ) { $remaining[] = $option; }
}
if ( $remaining ) { WP_CLI::error( "Failed to clear installer options: " . implode( ", ", $remaining ) ); }
$hooks = array( ${hookList} );
foreach ( $hooks as $hook ) { wp_clear_scheduled_hook( $hook ); }
`
    .replace(/\s+/g, ' ')
    .trim();

  return `eval '${php}' ${WP_CLI_SKIP_STACK}`;
}

/**
 * Whether a non-throwing wpCli() result represents a failure.
 *
 * @param {unknown} result
 * @returns {boolean}
 */
function isWpCliFailure(result) {
  if (typeof result === 'number') {
    return result !== 0;
  }
  return typeof result === 'string' && result.startsWith('Error:');
}

/**
 * Return `newfold` with any missing shared helpers filled in. The plugin's own
 * implementations always win; the original object is not mutated.
 *
 * @param {object} newfold   Brand plugin `newfold` helpers.
 * @param {object} wordpress Brand plugin `wordpress` helpers (must provide wpCli).
 * @param {object} [utils]   Brand plugin `utils` helpers (fancyLog optional).
 * @returns {object}
 */
export function withNewfoldCompat(newfold = {}, wordpress, utils) {
  if (!wordpress || typeof wordpress.wpCli !== 'function') {
    return newfold;
  }

  const log = (message) => {
    if (utils && typeof utils.fancyLog === 'function') {
      utils.fancyLog(message, 100, 'yellow');
    } else {
      console.warn(message);
    }
  };

  /**
   * --skip-plugins: `is-active` only needs active_plugins, and a plugin that is
   * currently fataling on load would otherwise look "inactive".
   */
  async function isPluginActive(slug) {
    try {
      return (await wordpress.wpCli(`plugin is-active ${slug} --skip-plugins`)) === 0;
    } catch {
      return false;
    }
  }

  /**
   * Match wp-plugin-bluehost's .wp-env.json (WP_MEMORY_LIMIT / WP_MAX_MEMORY_LIMIT
   * = 512M). Brand plugins without it run at PHP's 128M default, and with
   * WooCommerce active every request fatals with "Allowed memory size ... exhausted",
   * which cascades into every later test. wp-env's cli container shares
   * wp-config.php, and WordPress raises memory_limit to WP_MEMORY_LIMIT per request.
   * Runs once per process; failures are logged, not thrown.
   */
  let memoryLimitPromise;
  function ensureWooMemoryLimit() {
    if (!memoryLimitPromise) {
      memoryLimitPromise = (async () => {
        for (const constant of ['WP_MEMORY_LIMIT', 'WP_MAX_MEMORY_LIMIT']) {
          try {
            const result = await wordpress.wpCli(
              `config set ${constant} 512M --type=constant ${WP_CLI_SKIP_STACK}`
            );
            if (isWpCliFailure(result)) {
              log(`Could not set ${constant}: ${result}`);
            }
          } catch (error) {
            log(`Could not set ${constant}: ${error.message}`);
          }
        }
      })();
    }
    return memoryLimitPromise;
  }

  async function installWooCommerce() {
    await ensureWooMemoryLimit();
    try {
      const result = await wordpress.wpCli('plugin install woocommerce --activate');
      if (isWpCliFailure(result)) {
        log(`Failed to install WooCommerce: ${result}`);
      }
    } catch (error) {
      log(`Failed to install WooCommerce: ${error.message}`);
    }
  }

  async function isWooCommerceActive() {
    return isPluginActive('woocommerce');
  }

  async function uninstallWooCommerce() {
    const maxAttempts = 3;
    for (let i = 0; i < maxAttempts; i++) {
      if (!(await isWooCommerceActive())) {
        break;
      }
      await wordpress.wpCli('plugin deactivate woocommerce --uninstall');
      if (!(await isWooCommerceActive())) {
        break;
      }
      await wordpress.wpCli('plugin deactivate woocommerce');
    }
    if (await isWooCommerceActive()) {
      log('WooCommerce is still active after multiple deactivate attempts; later tests may fail.');
    }

    for (const slug of WOOCOMMERCE_DEPENDENT_PLUGINS) {
      if (await isPluginActive(slug)) {
        await wordpress.wpCli(`plugin deactivate ${slug} --skip-plugins`);
      }
    }
  }

  async function clearInstallerQueues() {
    const result = await wordpress.wpCli(buildClearInstallerQueuesCommand(), {
      failOnNonZeroExit: true,
    });
    if (isWpCliFailure(result)) {
      throw new Error(`clearInstallerQueues failed: ${result}`);
    }
  }

  const compat = {
    installWooCommerce,
    isWooCommerceActive,
    uninstallWooCommerce,
    removeWooCommerce: uninstallWooCommerce,
    clearInstallerQueues,
    ...newfold,
  };

  if (typeof newfold.setCapability === 'function') {
    const pluginSetCapability = newfold.setCapability;
    /**
     * Default canAccessAI only when omitted (callers can pass false to simulate no
     * AI access). Without this key wp-module-data discards the capabilities
     * (newfold-labs/wp-module-data#285), so e.g. performance tests restricting
     * Link Prefetch see defaults instead. Bluehost main already does this; older
     * brand plugin helpers (e.g. wp-plugin-web) do not. Idempotent either way.
     */
    compat.setCapability = (capabilities, ...rest) => {
      const withMarker = { ...capabilities };
      if (withMarker.canAccessAI === undefined) {
        withMarker.canAccessAI = true;
      }
      return pluginSetCapability.call(newfold, withMarker, ...rest);
    };
  }

  return compat;
}
