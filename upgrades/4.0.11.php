<?php
/**
 * Upgrade routine for 4.0.11.
 *
 * The `nfd_service` post type used to be registered on every site, which hijacked
 * `/services/<child>/` URLs on sites with a "Services" page. It is now only
 * registered when the services option is true. Seed that option once: enable it
 * for sites that already have services, disable it everywhere else.
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

use NewfoldLabs\WP\Module\Onboarding\Services\PostTypeService;

if ( null === get_option( PostTypeService::get_services_option_name(), null ) ) {
	PostTypeService::set_services_enabled( PostTypeService::has_service_posts() );
}
