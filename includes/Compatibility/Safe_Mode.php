<?php

namespace NewfoldLabs\WP\Module\Onboarding\Compatibility;

use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\WP_Admin;

/**
 * Class Safe_Mode
 */
class Safe_Mode {

	/**
	 * Compatibility scan results.
	 *
	 * @var Scan
	 */
	public $scan;

	/**
	 * Safe_Mode constructor.
	 *
	 * @param Scan $scan Scan results.
	 */
	public function __construct( Scan $scan ) {
		$this->scan = $scan;
		\add_action( 'admin_menu', array( $this, 'core_update_page' ) );

		// Cleanup and Redirect to Onboarding once core has updated successfully. See wp-admin/includes/update-core.php
		\add_action( '_core_updated_successfully', array( self::class, 'handle_redirect' ) );

		// Cleanup and Redirect to Onboarding once core has updated successfully via manual DB upgrade. See wp-admin/upgrade.php
		\add_action( 'load-about.php', array( self::class, 'handle_redirect' ) );
	}

	/**
	 * Display WP core update page when in safe mode.
	 */
	public function core_update_page() {
		\add_submenu_page(
			null,
			\__( 'Onboarding', 'wp-module-onboarding' ),
			\__( 'Onboarding', 'wp-module-onboarding' ),
			Permissions::ADMIN,
			WP_Admin::$slug,
			array( $this, 'render' ),
			100
		);
	}

	/**
	 * Render WP core update page.
	 */
	public function render() {
		// Get the Onboarding request URL.
		$request_url = \remove_query_arg( '_wp_http_referer' );
		// Set the post core update redirect URL transient.
		\set_transient( Options::get_option_name( 'core_update_referrer' ), $request_url, 259200 );
		?>
		<style>
			body {
				background-color: #f9f9f9;
			}

			.safe-mode__error-img {
				min-width: 280px;
				max-width: calc(25vw + 40px);
				margin: 2rem auto 0 auto;
			}

			.safe-mode__warning-img {
				margin: 1rem auto 2rem auto;
				max-width: 64px;
			}

			.safe-mode__content {
				max-width: 480px;
				margin: 2rem auto 1rem auto;
				text-align: center;
			}

			.safe-mode__form--container {
				max-width: 480px;
				margin: 2rem auto 1rem auto;
			}

			.safe-mode__form--container__row {
				text-align: center;
			}

			.safe-mode__loader {
				border: 3px solid #f3f3f3;
				-webkit-animation: spin 1s linear infinite;
				animation: spin 1s linear infinite;
				border-top: 3px solid #2271b1;
				border-radius: 50%;
				width: 30px;
				height: 30px;
				margin: auto;
				display: flex;
				align-items: center;
				visibility: hidden;
			}

			.safe-mode__error {
				visibility: hidden;
			}

			/* Safari */
			@-webkit-keyframes spin {

				0% {
					-webkit-transform: rotate(0deg);
				}

				100% {
					-webkit-transform: rotate(360deg);
				}
			}

			@keyframes spin {

				0% {
					transform: rotate(0deg);
				}

				100% {
					transform: rotate(360deg);
				}
			}
		</style>
		<div class="safe-mode__error-img">
			<svg viewBox="0 0 1034.27 517.63" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<linearGradient id="a" gradientUnits="userSpaceOnUse" x1="519.75" x2="524.93" y1="434.97" y2="281.24">
					<stop offset="0" stop-color="#fff" />
					<stop offset="1" stop-color="#52c8eb" />
				</linearGradient>
				<linearGradient id="b" gradientTransform="matrix(-1 0 0 -1 -79 295.28)" x1="-334.69" x2="-475.47" xlink:href="#a" y1="-203.12" y2="-204.02" />
				<linearGradient id="c" gradientTransform="matrix(-1 0 0 -1 -79 295.28)" x1="-496.68" x2="-637.46" xlink:href="#a" y1="-203.12" y2="-204.02" />
				<path d="m1 510.84c-3.94 0 7.75-3.13 11.54-5.44 8.27-5 16.45-10.71 24.65-16.21 25.93-17.43 44.1-31.75 70.57-44.93 75.34-37.52 151.59-64.58 228.24-86.93 232-67.64 477-8.74 698.1 154.11" fill="url(#a)" opacity=".38" stroke="#fff" stroke-miterlimit="10" stroke-width=".46" />
				<path d="m505.39 66.62c-2-2-1.32-9.53-1.27-12 .26-12.18 5.7-27.38 14.67-36 3.37-3.25 7.81-5.35 11.7-7.92 39-25.8 83.63-2.29 87.9 44.37 2 22.14-11.58 41.67-29.4 53.7-5.17 3.49-12.52 9.52-19.26 8.69-18-2.21-32.91-17.43-45.39-29.37-6.27-6-17.42-12.89-20.35-21.48" fill="#004d77" opacity=".15" />
				<path d="m502.44 328.25c0-.26.93 1 1 1a36.9 36.9 0 0 1 2.07 3.81c1.58 3.35 3 6.78 4.34 10.21 3.86 9.69 7.95 19.37 11.24 29.28 7.89 23.76 11.8 56.32 12.8 81.42.19 4.69.3 9.4 0 14.09-.42 7.06-.1 8 6.72 10.3 1.08.37 4.28 2.15 5.44 1.83 2.15-.59 3.89-9.49 4.28-11 3-11.75 4.54-23.89 5.56-36 3.18-37.44-3.27-85.73-15.36-121.28a276.94 276.94 0 0 0 -11.06-26.39c-.89-1.93-2.4-7.13-4.83-7.92s-6.94 3.19-8.77 4.41a14.7 14.7 0 0 0 -5.62 5.9c-2.12 4.6-2 10.38-2.69 15.32a225.12 225.12 0 0 1 -4.65 23" fill="#4687c7" />
				<path d="m508 94.81c0-4.11-8.33-8.3-11.23-9.59-12.68-5.63-30-2.51-39.83 7.18-19.61 19.41-29.59 71.06-29.32 97.54 0 2.43.19 4.87 1.7 6.87 2.9 3.85 21.09 16.64 26.84 16 1.92-.2 3.39-2.2 4.42-3.63 18-24.84 20.86-56.07 32.85-83.68 2.85-6.56 13.76-22.92 14.09-29.35" fill="#4687c7" />
				<path d="m544.09 112.25c-.51 0 2-1 2.53-1a8.34 8.34 0 0 1 6.1 2c4.11 3.71 4.24 10.1 3.44 15.15-3.3 20.76-15.93 41.25-24 60.5-1 2.46-7.26 17.45-10.43 16.84-1.33-.26-.84-4.57-.82-5.4a175.12 175.12 0 0 1 1.28-18.17c2.93-23.27 9.84-48.95 21.83-69.33" fill="#68cce5" />
				<path d="m449.49 266.33c-1.77-1.78-.3-9.33-.16-11.42a348.46 348.46 0 0 1 4.75-36c6.95-39.62 15-78.54 37.85-112.56 8.45-12.6 24.52-29.49 41.7-21.7 11.45 5.2 14.63 21.44 12.37 32.35-2.67 13-8.79 25.58-12.27 38.47a279.61 279.61 0 0 0 -9.48 70.36c-.09 12.15-.15 24.24 1.12 36.33.13 1.28 1.71 12.37 1.26 12.85-5.4 5.89-19.4 5.09-26.48 6.2-12.27 1.92-24.72 4.07-37.16 2.39-2.83-.39-10-1-12-3.47-1.32-1.61-1.4-12.75-1.59-15.36" fill="#004d77" />
				<path d="m407.85 26.22a14.38 14.38 0 0 1 .81-2.43 36.52 36.52 0 0 1 4.87-9c.23-.28.73-1.06 1.19-.91 2.82.94.7 9.13 2.34 11.19 1.8 2.24 9.45 1.09 9.95 4.48.39 2.62-4.87 4-5.19 6.79-.22 1.82 1.71 9.51.42 10.52-1.58 1.24-7.17-5.73-9.44-5.88-2.94-.19-10.52 7.11-11.92 6.41-.82-.41 2-8.26 2.08-9.35.37-4.06-10.21-6.09-7.14-7.51 2.29-1.06 4.89-1.63 7.25-2.54" fill="#fbb11e" />
				<path d="m324.33 184.75c-.07.13 1-1.28 1.15-1.53.5-.67 4.72-6.71 5.36-5.84 1.31 1.77-1.53 5-.35 6.76.81 1.24 5.69 1.56 5.61 3.11s-4.27 1.33-4.81 2.77.8 6.48-.7 7.19c-.43.21-1.07-.6-1.31-.85-.72-.74-1.42-1.49-2.1-2.27-3.06-3.54-4.64 2.35-7.85 1.54-.7-.17 1.14-4.25 1.07-4.93-.26-2.6-8.6-3.3-2.18-5.7" fill="#fbb11e" />
				<path d="m658 228.57c-.09 0 6.06-8 6.81-6.65 1.07 2-1 4.8-.17 6.87.52 1.28 4.3 2.69 4.12 4s-3.66 1.06-4.28 2.3c-.92 1.84-.16 6-1.82 7.32-.78.6-3.23-4.74-4.66-4.89-3.71-.39-7.71 1.63-7.86 1.26-.44-1.12 2.37-3.84 2.41-5.22 0-2-4.26-3.48-3.79-5.08.29-1 4.26 0 4.91.15" fill="#fbb11e" />
				<path d="m761.45 189.13c-71.69-76.83 51-167.91 108.23-82 42 63-45.57 144.11-108.23 82" fill="#68cce5" />
				<path d="m537.4 98.87c0 .13.09 0 .17 0a39.57 39.57 0 0 0 3.07-3.27c2.2-2.3 8-4.67 10.44-1.93 15.59 17.58 12.2-4.1 21.95-.72 9.31 3.23 6.23-2.1 11.17-8.46 4.3-5.55 10.24-9.23 14.88-14.41 2.39-2.66 7.8-8.14 5.42-12.16-4.46-7.56-13.36-7.31-20.62-9.6-6.83-2.16-16.73-9.33-23.65-8.38-14.23 1.92-17.23 22.31-25.05 31.38-3.31 3.84-10.43 6.89-12.33 11.65-1.3 3.24 11.75 17.81 15 16.66" fill="#f4f4f4" stroke="#36444d" stroke-miterlimit="10" stroke-width="1.75" />
				<path d="m521.16 79.52c0-.11.54-.48.63-.55 3.63-3 6.37-5.75 7.64-10.48 1.78-6.64-.32-14 2.11-20.47 1.64-4.36 8.16-7.32 11.63-14.86s8.74-18.77 18.64-19.16c13.35-.57 11.89 14 21.62 18.87 11 5.49 26.44 6.36 30.79 20.33a14.36 14.36 0 0 1 .51 6.11 8.06 8.06 0 0 1 -4.53 6.25c-10.59 5.3-11.6-6.05-18.43-7.82-4-1-7.94 2.39-12.32.88-2.6-.89-3.38-5.28-5.91-5.6-4.8-.6-7.77 6.17-12.19 5.18-2.83-.63 2.08-12.8-5.45-10.7-4.81 1.34-8.84 14.81-6.31 18.75 2.29 3.57 14.79-1.78 8.09 8.27-3.37 5-8.91-.41-12.86-.71-2-.16-3.89.92-5.76 1.47-3.11.92-17.6 12.23-16.78 4.47" fill="#fbb11e" />
				<path d="m498.47 65c3.47 3.47 5.78 8.76 8.64 12.73a120.59 120.59 0 0 0 16.26 18 114.78 114.78 0 0 0 19.69 14.27c7.81 4.6 15.72 8.88 23.91 12.76 2.23 1.06 8.48-5.67 8.43-5.82-.23-.68-5.13-1.89-5.82-2.22-5.44-2.62-10.85-5.62-16.05-8.68-14.28-8.41-27-20.15-38.42-32.08a57.84 57.84 0 0 1 -9.22-12.23c-.09-.16-.78-1.75-1-1.72-1.47.21-3.95 4.08-5.7 5" fill="#4687c7" />
				<path d="m472.19 289.74c0-7.2-3.32-15.07-4.17-22.29a425.24 425.24 0 0 1 -2.94-55.26 403.92 403.92 0 0 1 4.21-51.52c2.26-15.92 5.31-40.9 15.89-53.72 9.87-12 28.33-8.38 29.35 8.19 1 16.41-9.21 32.79-14.38 47.72-8 23-13.75 47.15-15.82 71.46-1.11 13-1.72 26.16-2.06 39.22-.23 8.49 4.32 16.94-5.42 16.09-1.46-.12-3.31.44-4.68 0" fill="#68cce5" />
				<g fill="#004d77">
					<path d="m358.61 464.49c0-.11 1.07-.32 1.14-.34a57.92 57.92 0 0 0 8.32-3.22 103.6 103.6 0 0 0 18.48-10.93c18-13.48 31.34-32 42.41-51.33 14.23-24.86 24.92-51.52 29.25-80 1.64-10.76 1.53-21.92 2-32.78 0-.61-.78-5.3-.64-5.86 0 0 1.32.27 1.4.28a22.55 22.55 0 0 0 5.56-.21c4.54-.44 9.07-.95 13.61-1.41 10.93-1.12 22.09-1.9 32.85-4.21 2.24-.47 10.24-3.66 12.29-2.21s2 9.07 2.17 11.14c1.31 15.69-8.92 32.85-15.58 46.34-19.72 39.92-50.36 76.5-81.33 108.17-12.76 13.05-26.77 25.95-43 34.61-3.28 1.75-6.66 3.22-10.08 4.67-.38.17-4.4 2.41-4.74 2.24-1.52-.76-2.79-5.13-4.14-6.52-3-3.14-7.11-4.11-10.63-6.45" />
					<path d="m608.45 436c-1.38-.69 9.62-1 10.95-.82 6.67 1 26.65 2.84 28.37 11.59a2 2 0 0 1 0 1c-1.66 6.3-39.41 2.13-40.78-6.62" opacity=".15" />
					<path d="m647 378.24a25.35 25.35 0 0 1 3.67-.35c5.42-.14 10.85.23 16.25.6 12.73.86 25.37 2.42 38 4.24 40.38 5.83 81.6 13.77 119 30.75 8.13 3.69 33.94 14.49 30.52 27.45-4 15-46.86 11.66-57.53 10.61-45.79-4.54-92-18.22-134.36-36.1-4.85-2.05-61.4-27.14-25.26-31.57" opacity=".15" />
					<path d="m453.92 453.72c2.45-4.89 34.82-10.5 34.17-2.63-1 12.69-48.27 17.88-36.19 6.75" opacity=".15" />
					<path d="m266 412.18c0-5.58 19.4-12.33 22.83-13.81 11.26-4.84 91-30.69 96.6-16.75 5.13 12.81-73.79 30.93-85.36 33.34-5 1.06-38.51 9-35.12 2.41" opacity=".15" />
					<path d="m293.32 448.15c-.55-.56.61-1.29 1-1.58 2.62-2 18.24-10.18 20.11-4.85 2 5.73-26.23 19.58-23.56 12.64" opacity=".15" />
				</g>
				<path d="m443 268.24c-1.07 0 2.06.66 3.1.95 2.38.68 4.7 1.56 7.1 2.17a83.93 83.93 0 0 0 20.67 2.13c12.34 0 24.83-2.88 36.77-5.7a136.62 136.62 0 0 0 15.26-4.18c.61-.22 3.16-1.78 3.79-1.51.86.37 2.11 12.75 1.93 14.66-.38 4-23.62 8.28-27.42 9.05-14.5 3-30.94 2.92-45.65 1.23-3.07-.36-11.13.59-13.51-1.8-1.27-1.26-2.09-13.83-2.45-16.72" fill="#68cce5" />
				<path d="m461.92 264.18c0-.66.3 1.23.32 1.37.21 1.06.45 2.11.71 3.15.84 3.38 1.61 6.76 2.24 10.18 2 10.83 1.93 13.05 13 14 1.15.09 6.69.86 7.61-.17 1.91-2.11.87-10.88.93-13.6.15-6.78.11-14 1.45-20.63.05-.25.25-.84 0-1.06-1.12-1.12-29.67-.09-26 7.18" fill="#4687c7" />
				<path d="m470.76 290.93c0-.22-1.14 2.53-1.38 3.06a9.73 9.73 0 0 1 -4.88 4.89c-3.15 1.39-23.78-.95-15.71 9.36 6.53 8.32 22.94 8.84 29.45.61 2.4-3.05 8-13.92 2.4-17.41-2.55-1.59-7.24-.59-10.15-.88" fill="#68cce5" />
				<path d="m538.67 485.1a33.86 33.86 0 0 1 -3.88-2.53c-1.84-1.8-7.66-8.82-2.52-10.46s11.66 2.87 16.31 4.42c6.16 2.06 12.22 1.69 18.52 2.55 2.7.37 5.84 1.88 6.08 5 .36 4.61-4.65 6.21-8.29 6.77a37 37 0 0 1 -25.12-4.92" fill="#68cce5" />
				<path d="m366.85 464.93s-2.15-1.16-2.4-1.29a8.28 8.28 0 0 0 -5.35-1.3c-3.36.54-2.63 5.11-1.54 7.25 4.52 8.86 23.75 22.91 33.26 26.14 4.81 1.63 18 1.47 15-7.37-1.68-4.94-10.57-6.33-14.91-7.68-8.42-2.61-18.78-8.37-23.81-15.92" fill="#68cce5" />
				<path d="m358.82 461.89c-.33-.67 3 2.08 3.37 2.38 2.51 2.19 5 4.42 7.43 6.65 8.2 7.41 11.05 8.73 20.74 2.86.91-.55 5.15-1.85 5.34-3 .57-3.26-7.36-8.72-9.47-10.8s-8.58-10.94-10.62-11.59c-1.32-.42-3.13 2.17-4 2.9-3.19 2.79-10.28 5.75-12.15 9.49" fill="#4687c7" />
				<path d="m527.63 465.24c-.54-.33 1.3 3.55 1.52 4.29.33 1.11 0 7 .49 7.64 1.61 1.78 20.09 2.92 22.57 1.75 1.95-.91 1.71-3.72 2-5s2.21-4.91.63-6.06c-1.08-.8-5.74-.36-7.25-.43-6.39-.3-12.52-1.21-18.74-2" fill="#004d77" />
				<path d="m759.87 94.49c-6-3.88-93.55-53.22-82-17.38 14.62 45.55 151 111.29 193.09 132 10.13 5 66 33 74.73 17.35 10.78-19.31-61.44-64.77-65.7-62.11-.84.52-3 2.88-2.31 3.9s2.28 1.89 3.35 2.66c13.54 9.59 33.88 21.6 40.91 37.35.75 1.68 1.21 3.73-1 4.34-5.5 1.49-13.28-1.82-18.34-3.55s-9.84-3.66-14.63-5.83c-48.97-22.22-98.68-47.03-142.45-78.22-5.45-3.89-40.17-29.34-32.55-38.44 9.73-11.63 29 12.08 37.91 17.52" fill="#004d77" opacity=".15" />
				<path d="m395.22 484.9c1.45 0-2.89-.13-4.34-.18-2.79-.09-5.57-.14-8.36-.25q-13.45-.54-26.92-1.2c-26.22-1.24-52.41-2.69-78.65-3.56l-2.54-.1-2.37-.1c-5.57-.23-11 .06-16.51.06-.43 0-.62.15-.69.61-.47 2.89 4 35.1 4.76 35.79 4.1 3.78 17.51-.5 22.17-1.12 20.56-2.72 40.92-6.18 61.15-10.8 11.06-2.52 22.23-4.7 33.24-7.43 1-.26 18.76-2.26 19.36-3.45" fill="url(#b)" opacity=".19" stroke="#fff" stroke-miterlimit="10" stroke-width=".24" />
				<path d="m557.21 484.9c1.45 0-2.89-.13-4.34-.18-2.79-.09-5.57-.14-8.36-.25q-13.46-.54-26.92-1.2c-26.22-1.24-52.41-2.69-78.65-3.56l-2.54-.1-2.37-.1c-5.57-.23-11 .06-16.51.06-.43 0-.62.15-.69.61-.47 2.89 4 35.1 4.76 35.79 4.1 3.78 17.51-.5 22.17-1.12 20.56-2.72 40.92-6.18 61.15-10.8 11.06-2.52 22.23-4.7 33.24-7.43 1-.26 18.76-2.26 19.36-3.45" fill="url(#c)" opacity=".19" stroke="#fff" stroke-miterlimit="10" stroke-width=".24" />
				<path d="m218.15 128.35s73.79-73.69 168.85-91.85" fill="none" stroke="#004d77" stroke-dasharray="8.82" stroke-miterlimit="10" stroke-width="1.47" />
				<path d="m290.67 99.89c18.21-10.67 32-31.22 96.37-51.69" fill="none" stroke="#004d77" stroke-dasharray="8.82" stroke-miterlimit="10" stroke-width="1.47" />
			</svg>
		</div>
		<div class="safe-mode__warning-img">
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="m10.6370486 10.2189236.22875 3.8888889c.0129514.2202431.1953472.3921875.4159375.3921875h1.4364583c.220607 0 .4029769-.1719616.4159376-.3921875l.22875-3.8888889c.0140625-.23934028-.1762153-.44114583-.4159376-.44114583h-1.893993c-.2396875 0-.4299653.20180555-.4159028.44114583zm2.8212847 6.2255209c0 .8054166-.6529166 1.4583333-1.4583333 1.4583333s-1.4583333-.6529167-1.4583333-1.4583333c0-.8054167.6529166-1.4583334 1.4583333-1.4583334s1.4583333.6529167 1.4583333 1.4583334zm-.0146875-12.50052093c-.6400347-1.10940973-2.2460764-1.11142362-2.8872916 0l-8.33145842 14.44541673c-.63965278 1.1087847.16114584 2.4995486 1.44364585 2.4995486h16.66270837c1.2800348 0 2.0845487-1.3886458 1.4436459-2.4995486zm-9.59673612 14.96586813 7.97263892-13.81923618c.0801736-.13895833.2807292-.13895833.3609028 0l7.9726389 13.81920148c.0801389.1388889-.0201041.3124305-.1804514.3124305h-15.94527783c-.1603125 0-.26055556-.1735069-.18045139-.3123958z" fill-rule="evenodd" fill="#f89c24" />
			</svg>
		</div>
		<div class="safe-mode__content">
			<h1><?php echo \esc_html_e( 'Please upgrade your WordPress', 'wp-module-onboarding' ); ?></h1>
			<p><?php echo \esc_html_e( 'To take advantage of the latest WordPress has to offer, our WordPress Onboarding to setup your website requires the latest version of WordPress.', 'wp-module-onboarding' ); ?></p>
			<p><em>
					<?php
					echo esc_html(
						sprintf(
						/* translators: 1: Current WP Version 2: Minimum Required version */
							\__( 'Your WordPress version %1$s does not meet our minimum requirements of %2$s.', 'wp-module-onboarding' ),
							$this->scan->data['wp_version'],
							$this->scan->config['min_wp']
						)
					)
					?>
				</em></p>
		</div>
		<div class="safe-mode__form--container">
			<div class="safe-mode__form--container__row">
				<form method="post" action="update-core.php?action=do-core-upgrade" name="upgrade" class="upgrade" id="upgrade-form">
					<?php \wp_nonce_field( 'upgrade-core' ); ?>
					<p>
						<input name="version" value="<?php echo esc_html( \get_preferred_from_update_core()->current ); ?>" type="hidden">
						<input name="locale" value="en_US" type="hidden">
						<input name="upgrade" value="Upgrade WordPress" type="hidden">
						<input type="submit" name="upgrade" id="upgrade" class="button button-primary button-hero" value="<?php echo \esc_html_e( 'Upgrade WordPress', 'wp-module-onboarding' ); ?>">
					</p>
				</form>
				<div id="safe-mode__loader" class="safe-mode__loader"></div>
				<p id="safe-mode__error" class="safe-mode__error"><?php echo \esc_html_e( 'There was an error Upgrading WordPress.', 'wp-module-onboarding' ); ?></p>
			</div>
		</div>
		<script>
			const form = document.getElementById( 'upgrade-form' );
			const loader = document.getElementById( 'safe-mode__loader' );
			const errorParagraph = document.getElementById( 'safe-mode__error' );

			function handleForm( event ) {
				loader.style.visibility = 'visible';
				form.style.display = 'none';
				return true;
			}

			form.addEventListener( 'submit', handleForm );
		</script>
		<?php
	}
	/**
	 * Cleanup and Redirect to Onboarding once core has updated successfully.
	 *
	 * @return void
	 */
	public static function handle_redirect() {
		global $pagenow;
		$valid_onboarding_referrer_regex = '/^\/wp-admin\/index.php\?page=' . WP_Admin::$slug . '*/';
		// Prevent about.php hijack if it is not being loaded after a core update.
		if ( 'about.php' === $pagenow && ! isset( $_GET['updated'] ) ) {
			return;
		}
		// Reset the compatibility status to re-scan after a core update.
		Status::reset();
		// Get the post core update redirect URL.
		$onboarding_referrer = \get_transient( Options::get_option_name( 'core_update_referrer' ) );
		// Only redirect if the URL exists and the site is in coming soon mode.
		if ( $onboarding_referrer && Data::coming_soon() ) {
			\delete_transient( Options::get_option_name( 'core_update_referrer' ) );
			// Ensure that it is a safe Onboarding URL before redirecting.
			if ( ! preg_match( $valid_onboarding_referrer_regex, $onboarding_referrer ) ) {
				return;
			}
			// Prevent the default about page redirect after a core update and replace it with our URL. See wp-admin/includes/update-core.php _redirect_to_about_wordpress
			?>
		<script type="text/javascript">
			window.location = "<?php echo \esc_url_raw( $onboarding_referrer ); ?>";
		</script>
			<?php
			exit;
		}
	}
}
