<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Types\SiteClassification;

/**
 * Types SiteClassification wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Types\SiteClassification
 */
class SiteClassificationWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Constructor and getters.
	 *
	 * @return void
	 */
	public function test_constructor_and_getters() {
		$sc = new SiteClassification( 'business', 'restaurant' );
		$this->assertSame( 'business', $sc->get_primary_type() );
		$this->assertSame( 'restaurant', $sc->get_secondary_type() );
	}

	/**
	 * Empty primary defaults to other.
	 *
	 * @return void
	 */
	public function test_empty_primary_defaults_to_other() {
		$sc = new SiteClassification( '', 'restaurant' );
		$this->assertSame( 'other', $sc->get_primary_type() );
	}

	/**
	 * Empty secondary defaults to other.
	 *
	 * @return void
	 */
	public function test_empty_secondary_defaults_to_other() {
		$sc = new SiteClassification( 'business', '' );
		$this->assertSame( 'other', $sc->get_secondary_type() );
	}

	/**
	 * Setters update values.
	 *
	 * @return void
	 */
	public function test_setters_update_values() {
		$sc = new SiteClassification( 'business', 'restaurant' );
		$sc->set_primary_type( 'portfolio' );
		$sc->set_secondary_type( 'photographer' );
		$this->assertSame( 'portfolio', $sc->get_primary_type() );
		$this->assertSame( 'photographer', $sc->get_secondary_type() );
	}
}
