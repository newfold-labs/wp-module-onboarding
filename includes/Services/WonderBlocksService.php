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
	 * Fetches the pattern from WonderBlocks given the pattern slug.
	 *
	 * @param string $pattern_slug The pattern slug.
	 * @return array|false
	 */
	public static function get_pattern( $pattern_slug ) {
		$primary_type = PrimaryType::instantiate_from_option();
		if ( ! $primary_type ) {
			return false;
		}
		$secondary_type = SecondaryType::instantiate_from_option();
		if ( ! $secondary_type ) {
			return false;
		}

		$wonder_blocks_slug = self::strip_prefix_from_slug( $pattern_slug );
		$request            = new WonderBlocksFetchRequest(
			array(
				'endpoint'       => 'templates',
				'slug'           => $wonder_blocks_slug,
				'primary_type'   => $primary_type->value,
				'secondary_type' => $secondary_type->value,
			)
		);
		$pattern            = WonderBlocks::fetch( $request );

		if ( ! empty( $pattern ) ) {
			$pattern['categories'] = array( $pattern['categories'], 'yith-wonder-pages' );
			$pattern['name']       = $pattern['slug'];
			return array(
				'slug'       => $pattern_slug,
				'title'      => $pattern['title'],
				'content'    => $pattern['content'],
				'name'       => $pattern['name'],
				'meta'       => Patterns::get_meta_from_pattern_slug( $pattern_slug ),
				'categories' => $pattern['categories'],
			);
		}

		return false;
	}

	/**
	 * Clear the cache for a pattern slug fetched via get_pattern.
	 *
	 * @param string $pattern_slug Slug of the pattern previously fetched via get_pattern.
	 * @return boolean
	 */
	public static function delete_get_pattern_cache( $pattern_slug ) {
		$wonder_blocks_slug = self::strip_prefix_from_slug( $pattern_slug );

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
