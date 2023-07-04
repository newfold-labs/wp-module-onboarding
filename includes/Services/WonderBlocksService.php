<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Data\WonderBlocks\WonderBlocks;
use NewfoldLabs\WP\Module\Data\SiteClassification\PrimaryType;
use NewfoldLabs\WP\Module\Data\SiteClassification\SecondaryType;
use NewfoldLabs\WP\Module\Data\WonderBlocks\Requests\Fetch as WonderBlocksFetchRequest;
use NewfoldLabs\WP\Module\Onboarding\Data\Patterns;

/**
 * Class WonderBlocksService
 *
 * Class for handling WonderBlock interactions.
 */
class WonderBlocksService {

	/**
	 * Get the slug for a given pattern name.
	 *
	 * Valid slugs have `wonder-blocks/` prefixed to the actual name.
	 *
	 * @param string $name The name of the pattern/template.
	 * @return string
	 */
	public static function add_prefix_to_name( $name ) {
		return "wonder-blocks/{$name}";
	}

	/**
	 * Given a full slug of WonderBlocks, strip the wonder-blocks prefix.
	 *
	 * @param string $slug A valid WonderBlock slug.
	 * @return string
	 */
	public static function strip_prefix_from_slug( $slug ) {
		return explode( '/', $slug )[1];
	}

	/**
	 * Checks whether a given slug is a valid WonderBlock slug.
	 *
	 * @param string $slug The slug of the pattern/template.
	 * @return boolean
	 */
	public static function is_valid_slug( $slug ) {
		$wonder_blocks_slug = explode( '/', $slug );
		if ( isset( $wonder_blocks_slug[0] ) && 'wonder-blocks' === $wonder_blocks_slug[0] && isset( $wonder_blocks_slug[1] ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Checks if the site is eligible for WonderBlocks.
	 *
	 * @return boolean
	 */
	public static function is_enabled() {
		if ( ! ( class_exists( 'NewfoldLabs\WP\Module\Data\WonderBlocks\Requests\Fetch' )
		&& class_exists( 'NewfoldLabs\WP\Module\Data\WonderBlocks\WonderBlocks' ) )
		&& class_exists( 'NewfoldLabs\WP\Module\Data\SiteClassification\PrimaryType' )
		&& class_exists( 'NewfoldLabs\WP\Module\Data\SiteClassification\SecondaryType' ) ) {
			return false;
		}
		return isset( Data::current_brand()['config']['wonder_blocks'] )
		&& true === Data::current_brand()['config']['wonder_blocks'];
	}

	/**
	 * Fetches the template from WonderBlocks given the template slug.
	 *
	 * @param string $template_slug The template slug.
	 * @return array|false
	 */
	public static function get_template_from_slug( $template_slug ) {
		$primary_type = PrimaryType::instantiate_from_option();
		if ( ! $primary_type ) {
			return false;
		}
		$secondary_type = SecondaryType::instantiate_from_option();
		if ( ! $secondary_type ) {
			return false;
		}

		$wonder_blocks_slug = self::strip_prefix_from_slug( $template_slug );
		$request            = new WonderBlocksFetchRequest(
			array(
				'endpoint'       => 'templates',
				'slug'           => $wonder_blocks_slug,
				'primary_type'   => $primary_type->value,
				'secondary_type' => $secondary_type->value,
			)
		);
		$template           = WonderBlocks::fetch( $request );

		if ( ! empty( $template ) ) {
			$template['categories'] = array( $template['categories'], 'yith-wonder-pages' );
			$template['name']       = $template['slug'];
			return array(
				'slug'       => $template_slug,
				'title'      => $template['title'],
				'content'    => $template['content'],
				'name'       => $template['name'],
				'meta'       => Patterns::get_meta_from_slug( $template_slug ),
				'categories' => $template['categories'],
			);
		}

		return false;
	}

	/**
	 * Clear the cache for a template slug fetched via get_template_from_slug.
	 *
	 * @param string $template_slug Slug of the template previously fetched via get_template_from_slug.
	 * @return boolean
	 */
	public static function delete_templates_cache_from_slug( $template_slug ) {
		$wonder_blocks_slug = self::strip_prefix_from_slug( $template_slug );

		$primary_type = PrimaryType::instantiate_from_option();
		if ( ! $primary_type ) {
			return false;
		}
		$secondary_type = SecondaryType::instantiate_from_option();
		if ( ! $secondary_type ) {
			return false;
		}

		$request = new WonderBlocksFetchRequest(
			array(
				'endpoint'       => 'templates',
				'slug'           => $wonder_blocks_slug,
				'primary_type'   => $primary_type->value,
				'secondary_type' => $secondary_type->value,
			)
		);

		return WonderBlocks::clear_cache( $request );
	}
}
