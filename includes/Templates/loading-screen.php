<?php
/**
 * Loading screen template.
 *
 * Server-rendered gradient backdrop that displays while the React app loads.
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

defined( 'ABSPATH' ) || exit;
?>
<style>
	#nfd-onboarding {
		position: fixed;
		inset: 0;
		z-index: 100000;
	}

	.nfd-loading {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background:
			radial-gradient(ellipse 80% 60% at 15% 20%, rgba(23,108,223,0.1) 0%, transparent 60%),
			radial-gradient(ellipse 70% 50% at 85% 75%, rgba(67,56,202,0.08) 0%, transparent 55%),
			radial-gradient(ellipse 50% 40% at 60% 40%, rgba(100,80,220,0.06) 0%, transparent 50%),
			linear-gradient(180deg, #fff 0%, #f5f8ff 50%, #edf2ff 100%);
		background-attachment: fixed;
		transition: opacity 0.3s ease-out;
	}

	.nfd-loading.fade-out { opacity: 0; pointer-events: none; }

	.nfd-loading__spinner {
		width: 24px;
		height: 24px;
		border: 2.5px solid rgba(23,108,223,0.2);
		border-top-color: #196BDE;
		border-radius: 50%;
		animation: nfd-spin 0.8s linear infinite;
	}

	@keyframes nfd-spin { to { transform: rotate(360deg); } }
</style>

<div class="nfd-loading">
	<div class="nfd-loading__spinner"></div>
</div>
