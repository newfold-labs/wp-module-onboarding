<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Types\Logo;

/**
 * Types Logo wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Types\Logo
 */
class LogoWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Constructor and getters.
	 *
	 * @return void
	 */
	public function test_constructor_and_getters() {
		$logo = new Logo( '3FNjUdY', 'Text-only', 'https://example.com/logo.png' );
		$this->assertSame( '3FNjUdY', $logo->get_reference_id() );
		$this->assertSame( 'Text-only', $logo->get_style() );
		$this->assertSame( 'https://example.com/logo.png', $logo->get_url() );
	}

	/**
	 * Constructor trims whitespace.
	 *
	 * @return void
	 */
	public function test_constructor_trims_whitespace() {
		$logo = new Logo( '  3FNjUdY  ', '  Text-only  ', '  https://example.com/logo.png  ' );
		$this->assertSame( '3FNjUdY', $logo->get_reference_id() );
		$this->assertSame( 'Text-only', $logo->get_style() );
		$this->assertSame( 'https://example.com/logo.png', $logo->get_url() );
	}

	/**
	 * Constructor throws when reference id empty.
	 *
	 * @return void
	 */
	public function test_constructor_throws_when_reference_id_empty() {
		$this->expectException( \InvalidArgumentException::class );
		new Logo( '  ', 'Text-only', 'https://example.com/logo.png' );
	}

	/**
	 * Constructor throws when style empty.
	 *
	 * @return void
	 */
	public function test_constructor_throws_when_style_empty() {
		$this->expectException( \InvalidArgumentException::class );
		new Logo( '3FNjUdY', '   ', 'https://example.com/logo.png' );
	}

	/**
	 * Constructor throws when url empty.
	 *
	 * @return void
	 */
	public function test_constructor_throws_when_url_empty() {
		$this->expectException( \InvalidArgumentException::class );
		new Logo( '3FNjUdY', 'Text-only', '   ' );
	}

	/**
	 * Constructor throws when url invalid.
	 *
	 * @return void
	 */
	public function test_constructor_throws_when_url_invalid() {
		$this->expectException( \InvalidArgumentException::class );
		new Logo( '3FNjUdY', 'Text-only', 'not-a-url' );
	}

	/**
	 * To array.
	 *
	 * @return void
	 */
	public function test_to_array() {
		$logo = new Logo( '3FNjUdY', 'Text-only', 'https://example.com/logo.png' );
		$this->assertSame(
			array(
				'reference_id' => '3FNjUdY',
				'style'        => 'Text-only',
				'url'          => 'https://example.com/logo.png',
			),
			$logo->to_array()
		);
	}

	/**
	 * From array round trip.
	 *
	 * @return void
	 */
	public function test_from_array_round_trip() {
		$data = array(
			'reference_id' => '3FNjUdY',
			'style'        => 'Text-only',
			'url'          => 'https://example.com/logo.png',
		);
		$logo = Logo::from_array( $data );
		$this->assertInstanceOf( Logo::class, $logo );
		$this->assertSame( $data, $logo->to_array() );
	}

	/**
	 * From array throws when keys missing.
	 *
	 * @return void
	 */
	public function test_from_array_throws_when_keys_missing() {
		$this->expectException( \InvalidArgumentException::class );
		Logo::from_array(
			array(
				'reference_id' => '3FNjUdY',
				'style'        => 'Text-only',
			)
		);
	}
}
