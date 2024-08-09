<?php

namespace NewfoldLabs\WP\Module\Onboarding\Compatibility;

/**
 * Class Scan
 */
class Scan {

	/**
	 * Configuration defaults.
	 *
	 * @var array
	 */
	public $default_config = array(
		'min_wp' => '6.5',
	);

	/**
	 * Environment data.
	 *
	 * @var array
	 */
	public $data = array(
		'wp_version' => '',
	);

	/**
	 * Active Configuration.
	 *
	 * @var array
	 */
	public $config = array();

	/**
	 * Test statuses.
	 *
	 * @var array
	 */
	public $test_statuses = array(
		'compatible',
		'unsupported-wp',
	);

	/**
	 * Result of the compatibility scan.
	 *
	 * @var string
	 */
	public $result = '';

	/**
	 * Scan constructor.
	 *
	 * @param array $config Config data.
	 */
	public function __construct( $config = array() ) {
		$this->setup( $config );
		// Fetch Relevant Data
		$this->fetch();
		// Evaluate Using Configuration & Data
		$this->evaluate();

		return array(
			'status' => $this->result,
			'data'   => $this->data,
		);
	}

	/**
	 * Register configuration.
	 *
	 * @param array $config Config data.
	 */
	protected function setup( $config ) {
		$this->config = array_merge( $this->default_config, $config );
	}

	/**
	 * Set up environment data to be checked.
	 */
	protected function fetch() {
		global $wp_version;

		$this->data = array_merge(
			$this->data,
			array(
				'wp_version' => $wp_version,
			)
		);

		$previous = Status::get();
		if ( ! empty( $previous ) && is_array( $previous ) ) {
			$this->data['previous_result'] = $previous;
		}
	}

	/**
	 * Run the compatibility check.
	 */
	protected function evaluate() {

		$this->result = 'scan-initiated';

		if ( version_compare( $this->data['wp_version'], $this->config['min_wp'], '<' ) ) {
			$this->result = 'unsupported-wp';
		}

		if ( 'scan-initiated' === $this->result ) {
			$this->result = 'compatible';
		}
	}
}
