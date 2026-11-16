<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Services\MediaService;
use NewfoldLabs\WP\Module\Onboarding\Services\PostTypeService;
use NewfoldLabs\WP\Module\Onboarding\Services\ResetService;
use NewfoldLabs\WP\Module\Onboarding\Services\SiteGenImageService;

/**
 * ResetService wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\ResetService
 */
class ResetServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Create a post flagged as onboarding-generated.
	 *
	 * @param string $type Post type.
	 * @return int
	 */
	private function create_generated_post( string $type = 'page' ): int {
		$id = self::factory()->post->create( array( 'post_type' => $type ) );
		update_post_meta( $id, PostTypeService::META_ONBOARDING_GENERATED, '1' );

		return $id;
	}

	/**
	 * Reset removes only generated posts.
	 */
	public function test_reset_deletes_generated_posts_and_keeps_user_content() {
		$generated = $this->create_generated_post( 'page' );
		$generated_post = $this->create_generated_post( 'post' );
		$user_page = self::factory()->post->create( array( 'post_type' => 'page' ) );

		ResetService::reset();

		$this->assertNull( get_post( $generated ) );
		$this->assertNull( get_post( $generated_post ) );
		$this->assertNotNull( get_post( $user_page ) );
	}

	/**
	 * Clear removes all posts of the onboarding post types, generated or not.
	 */
	public function test_clear_deletes_all_onboarding_post_types() {
		$page = self::factory()->post->create( array( 'post_type' => 'page' ) );
		$post = self::factory()->post->create( array( 'post_type' => 'post' ) );

		ResetService::clear();

		$this->assertNull( get_post( $page ) );
		$this->assertNull( get_post( $post ) );
	}

	/**
	 * Attached media and featured images of deleted posts are deleted too.
	 */
	public function test_reset_deletes_post_attachments() {
		$post_id       = $this->create_generated_post( 'page' );
		$attachment_id = self::factory()->attachment->create( array( 'post_parent' => $post_id ) );

		ResetService::reset();

		$this->assertNull( get_post( $attachment_id ) );
	}

	/**
	 * Reset only removes generated terms; clear removes them all.
	 */
	public function test_reset_deletes_generated_terms_only() {
		$generated = self::factory()->category->create();
		add_term_meta( $generated, PostTypeService::META_ONBOARDING_GENERATED, '1' );
		$user_term = self::factory()->category->create();

		ResetService::reset();

		$this->assertNull( get_term( $generated, 'category' ) );
		$this->assertNotNull( get_term( $user_term, 'category' ) );
	}

	/**
	 * Clearing drops the default category option so Uncategorized can be deleted.
	 */
	public function test_clear_unsets_default_category_option() {
		update_option( 'default_category', 1 );

		ResetService::clear();

		$this->assertFalse( get_option( 'default_category' ) );
	}

	/**
	 * Site identity is wiped on reset.
	 */
	public function test_reset_clears_site_identity() {
		update_option( 'blogname', 'My Site' );
		update_option( 'blogdescription', 'Tagline' );
		update_option( 'site_icon', 123 );
		update_option( 'site_logo', 0 );

		ResetService::reset();

		$this->assertSame( '', get_option( 'blogname' ) );
		$this->assertSame( '', get_option( 'blogdescription' ) );
		$this->assertFalse( get_option( 'site_icon' ) );
		$this->assertFalse( get_option( 'site_logo' ) );
	}

	/**
	 * Onboarding options are deleted except the sitegen site id/previous ids.
	 */
	public function test_reset_deletes_onboarding_options_but_keeps_excluded() {
		update_option( 'nfd_module_onboarding_some_state', 'x' );
		update_option( 'nfd-ai-site-gen-something', 'y' );
		update_option( 'nfd_module_onboarding_sitegen_site_id', 'keep-me' );
		update_option( 'nfd_module_onboarding_sitegen_previous_ids', array( 'a' ) );
		update_option( 'unrelated_option', 'z' );

		ResetService::reset();

		$this->assertFalse( get_option( 'nfd_module_onboarding_some_state' ) );
		$this->assertFalse( get_option( 'nfd-ai-site-gen-something' ) );
		$this->assertSame( 'keep-me', get_option( 'nfd_module_onboarding_sitegen_site_id' ) );
		$this->assertSame( array( 'a' ), get_option( 'nfd_module_onboarding_sitegen_previous_ids' ) );
		$this->assertSame( 'z', get_option( 'unrelated_option' ) );
	}

	/**
	 * Pending onboarding cron jobs are unscheduled.
	 */
	public function test_reset_unschedules_cron_jobs() {
		wp_schedule_single_event( time() + 3600, MediaService::CRON_HOOK );
		wp_schedule_single_event( time() + 3600, SiteGenImageService::CRON_HOOK );

		ResetService::reset();

		$this->assertFalse( wp_next_scheduled( MediaService::CRON_HOOK ) );
		$this->assertFalse( wp_next_scheduled( SiteGenImageService::CRON_HOOK ) );
	}

	/**
	 * The origin prompt/chat history are archived as "completed" and the live copies removed.
	 */
	public function test_reset_archives_prompt_origin() {
		update_option( Options::get_origin_option_name( 'origin_prompt' ), 'make me a bakery site' );
		update_option( Options::get_origin_option_name( 'origin_chat_history' ), array( 'hi' ) );

		ResetService::reset();

		$this->assertSame( 'make me a bakery site', get_option( Options::get_origin_option_name( 'origin_prompt_completed' ) ) );
		$this->assertSame( array( 'hi' ), get_option( Options::get_origin_option_name( 'origin_chat_history_completed' ) ) );
		$this->assertFalse( get_option( Options::get_origin_option_name( 'origin_prompt' ) ) );
		$this->assertFalse( get_option( Options::get_origin_option_name( 'origin_chat_history' ) ) );
	}

	/**
	 * Color palette and font pair transients are purged.
	 */
	public function test_reset_deletes_hiive_transients() {
		set_transient( 'nfd_hiive_color_palettes', array( 'x' ), 3600 );
		set_transient( 'nfd_hiive_font_pairs', array( 'y' ), 3600 );

		ResetService::reset();

		$this->assertFalse( get_transient( 'nfd_hiive_color_palettes' ) );
		$this->assertFalse( get_transient( 'nfd_hiive_font_pairs' ) );
	}

	/**
	 * Custom header/footer template parts for the active theme are removed.
	 */
	public function test_reset_removes_custom_template_parts() {
		$part_id = self::factory()->post->create(
			array(
				'post_type'  => 'wp_template_part',
				'post_name'  => 'header',
				'post_title' => 'Header',
			)
		);
		wp_set_object_terms( $part_id, get_stylesheet(), 'wp_theme' );

		ResetService::reset();

		$this->assertNull( get_post( $part_id ) );
	}
}
