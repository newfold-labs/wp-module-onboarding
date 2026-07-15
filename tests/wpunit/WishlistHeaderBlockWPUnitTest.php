<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Blocks\WishlistHeaderBlock;

/**
 * Wishlist header block wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Blocks\WishlistHeaderBlock
 */
class WishlistHeaderBlockWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Verify the PHP-only wishlist header block is registered.
	 *
	 * @return void
	 */
	public function test_wishlist_header_block_is_registered() {
		WishlistHeaderBlock::register_block();

		$registry = WP_Block_Type_Registry::get_instance();

		$this->assertTrue( $registry->is_registered( WishlistHeaderBlock::BLOCK_NAME ) );

		$block = $registry->get_registered( WishlistHeaderBlock::BLOCK_NAME );

		$this->assertNotEmpty( $block->supports['autoRegister'] );
		$this->assertTrue( is_callable( $block->render_callback ) );
		$this->assertSame( array(), $block->editor_script_handles );
	}
}
