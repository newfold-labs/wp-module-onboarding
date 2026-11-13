<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Services\GlobalStylesService;

/**
 * GlobalStylesService font families wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\GlobalStylesService
 */
class GlobalStylesServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Build a font family preset fixture.
	 *
	 * @param string $slug Font slug.
	 * @return array
	 */
	private function font( string $slug ): array {
		return array(
			'name'       => ucfirst( $slug ),
			'slug'       => $slug,
			'fontFamily' => "'" . ucfirst( $slug ) . "', sans-serif",
			'fontFace'   => array(),
		);
	}

	/**
	 * Slugs of a font list.
	 *
	 * @param array $fonts Font presets.
	 * @return string[]
	 */
	private function slugs( array $fonts ): array {
		return array_column( $fonts, 'slug' );
	}

	/**
	 * A flat incoming list is merged into `custom`, never as numeric keys next to it.
	 *
	 * @covers ::merge_font_families
	 *
	 * @return void
	 */
	public function test_merge_flat_list_goes_into_custom() {
		$existing = array( 'custom' => array( $this->font( 'figtree' ) ) );
		$incoming = array( $this->font( 'familjen' ), $this->font( 'hanken' ) );

		$merged = GlobalStylesService::merge_font_families( $existing, $incoming );

		$this->assertSame( array( 'custom' ), array_keys( $merged ) );
		$this->assertSame( array( 'figtree', 'familjen', 'hanken' ), $this->slugs( $merged['custom'] ) );
	}

	/**
	 * An origin-keyed incoming list does not overwrite existing fonts by index.
	 *
	 * @covers ::merge_font_families
	 *
	 * @return void
	 */
	public function test_merge_keeps_existing_fonts_and_replaces_by_slug() {
		$existing = array( 'custom' => array( $this->font( 'figtree' ), $this->font( 'bricolage' ) ) );
		$updated  = $this->font( 'figtree' );
		$updated['fontFamily'] = 'Updated';
		$incoming = array( 'custom' => array( $updated, $this->font( 'hanken' ) ) );

		$merged = GlobalStylesService::merge_font_families( $existing, $incoming );

		$this->assertSame( array( 'figtree', 'bricolage', 'hanken' ), $this->slugs( $merged['custom'] ) );
		$this->assertSame( 'Updated', $merged['custom'][0]['fontFamily'] );
	}

	/**
	 * Merging into a missing value works and other origins are preserved.
	 *
	 * @covers ::merge_font_families
	 *
	 * @return void
	 */
	public function test_merge_into_empty_and_preserves_other_origins() {
		$this->assertSame(
			array( 'custom' => array( $this->font( 'a' ) ) ),
			GlobalStylesService::merge_font_families( null, array( 'custom' => array( $this->font( 'a' ) ) ) )
		);

		$existing = array( 'theme' => array( $this->font( 't' ) ) );
		$merged   = GlobalStylesService::merge_font_families( $existing, array( 'custom' => array( $this->font( 'c' ) ) ) );
		$this->assertSame( array( 't' ), $this->slugs( $merged['theme'] ) );
		$this->assertSame( array( 'c' ), $this->slugs( $merged['custom'] ) );
	}

	/**
	 * Numeric keys next to an origin (the corrupted shape) are healed into `custom`.
	 *
	 * @covers ::normalize_font_families
	 *
	 * @return void
	 */
	public function test_normalize_heals_numeric_keys() {
		$corrupted = array(
			'custom' => array( $this->font( 'bricolage' ), $this->font( 'figtree' ) ),
			'0'      => $this->font( 'familjen' ),
			'1'      => $this->font( 'hanken' ),
		);

		$normalized = GlobalStylesService::normalize_font_families( $corrupted );

		$this->assertSame( array( 'custom' ), array_keys( $normalized ) );
		$this->assertSame(
			array( 'bricolage', 'figtree', 'familjen', 'hanken' ),
			$this->slugs( $normalized['custom'] )
		);
	}

	/**
	 * Non-array input normalizes to an empty array.
	 *
	 * @covers ::normalize_font_families
	 *
	 * @return void
	 */
	public function test_normalize_non_array_is_empty() {
		$this->assertSame( array(), GlobalStylesService::normalize_font_families( null ) );
		$this->assertSame( array(), GlobalStylesService::normalize_font_families( 'nope' ) );
	}

	/**
	 * set_global_styles stores fonts under `custom` and heals a corrupted record,
	 * the JSON must contain no numeric keys under fontFamilies.
	 *
	 * @covers ::set_global_styles
	 *
	 * @return void
	 */
	public function test_set_global_styles_writes_valid_font_families_and_heals_record() {
		$post_id = \WP_Theme_JSON_Resolver::get_user_global_styles_post_id();
		$this->assertNotEmpty( $post_id );

		wp_update_post(
			array(
				'ID'           => $post_id,
				'post_content' => wp_slash(
					wp_json_encode(
						array(
							'settings' => array(
								'typography' => array(
									'fontFamilies' => array(
										'custom' => array( $this->font( 'figtree' ) ),
										'0'      => $this->font( 'familjen' ),
									),
								),
							),
						)
					)
				),
			)
		);

		$result = ( new GlobalStylesService() )->set_global_styles(
			array(
				'settings' => array(
					'typography' => array(
						'fontFamilies' => array( $this->font( 'hanken' ) ),
					),
				),
			)
		);
		$this->assertTrue( $result );

		$stored = json_decode( get_post( $post_id )->post_content, true );
		$fonts  = $stored['settings']['typography']['fontFamilies'];

		$this->assertSame( array( 'custom' ), array_keys( $fonts ) );
		$this->assertSame( array( 'figtree', 'familjen', 'hanken' ), $this->slugs( $fonts['custom'] ) );
	}

	/**
	 * Updates that do not touch fontFamilies still heal a corrupted record.
	 *
	 * @covers ::set_global_styles
	 *
	 * @return void
	 */
	public function test_set_global_styles_without_fonts_heals_existing_record() {
		$post_id = \WP_Theme_JSON_Resolver::get_user_global_styles_post_id();

		wp_update_post(
			array(
				'ID'           => $post_id,
				'post_content' => wp_slash(
					wp_json_encode(
						array(
							'settings' => array(
								'typography' => array(
									'fontFamilies' => array(
										'custom' => array( $this->font( 'figtree' ) ),
										'0'      => $this->font( 'familjen' ),
									),
								),
							),
						)
					)
				),
			)
		);

		( new GlobalStylesService() )->set_global_styles(
			array( 'styles' => array( 'typography' => array( 'lineHeight' => '1.6' ) ) )
		);

		$stored = json_decode( get_post( $post_id )->post_content, true );
		$fonts  = $stored['settings']['typography']['fontFamilies'];

		$this->assertSame( array( 'custom' ), array_keys( $fonts ) );
		$this->assertSame( array( 'figtree', 'familjen' ), $this->slugs( $fonts['custom'] ) );
		$this->assertSame( '1.6', $stored['styles']['typography']['lineHeight'] );
	}
}
