/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { motion } from 'motion/react';
import { ArrowRightLeft } from 'lucide-react';

/**
 * Internal dependencies
 */
import PromptCard from '@/components/prompt/PromptCard.jsx';
import { nfdOnboardingStore } from '@/data/store';
import getGreeting from '@/utils/helpers/getGreeting';

const PromptView = ( {
	prompt,
	setPrompt,
	onSubmit,
	onMigrate,
	showMigration = false,
	devSitekitSlug = '',
	setDevSitekitSlug,
} ) => {
	const displayName = useSelect(
		( select ) => select( nfdOnboardingStore ).getCurrentUserDisplayName(),
		[]
	);
	const greeting = useMemo( () => getGreeting( displayName ), [ displayName ] );

	return (
		<motion.div
			key="prompt"
			initial={ { opacity: 1 } }
			exit={ { opacity: 0, y: -30 } }
			transition={ { duration: 0.35, ease: 'easeInOut' } }
			className="nfd-flex nfd-flex-1 nfd-flex-col nfd-items-center nfd-pt-[10vh] md:nfd-pt-[22vh] nfd-px-6 nfd-pb-10"
		>
			<div className="nfd-flex nfd-flex-col nfd-items-center nfd-w-full nfd-max-w-[710px] nfd-gap-10">
				<div className="nfd-text-center">
					<h1 className="nfd-text-4xl nfd-font-normal nfd-leading-[44px] nfd-text-[rgb(31,31,31)] [text-wrap:pretty] [-webkit-font-smoothing:antialiased] nfd-max-w-3xl nfd-mt-6 nfd-mx-auto nfd-m-0 nfd-mb-2">
						{ greeting }
					</h1>
					<p className="nfd-text-xl nfd-font-normal nfd-leading-7 nfd-text-[rgb(95,99,104)] [-webkit-font-smoothing:antialiased] nfd-max-w-2xl nfd-mx-auto nfd-m-0 nfd-text-balance">
						{ __( 'Tell us what kind of website you want to build', 'wp-module-onboarding' ) }
					</p>
				</div>
				<div className="nfd-w-full">
					<PromptCard
						value={ prompt }
						onChange={ setPrompt }
						onSubmit={ onSubmit }
						isSubmitting={ false }
					/>
					{ process.env.NODE_ENV === 'development' && (
						<div className="nfd-mt-3 nfd-flex nfd-items-center nfd-gap-2 nfd-px-1">
							<label
								htmlFor="nfd-dev-sitekit-slug"
								className="nfd-text-xs nfd-font-medium nfd-text-[rgb(95,99,104)] nfd-whitespace-nowrap"
							>
								{ __( 'Dev — sitekit slug:', 'wp-module-onboarding' ) }
							</label>
							<input
								id="nfd-dev-sitekit-slug"
								type="text"
								value={ devSitekitSlug }
								onChange={ ( e ) => setDevSitekitSlug( e.target.value ) }
								placeholder={ __( 'leave empty for AI selection', 'wp-module-onboarding' ) }
								className="nfd-flex-1 nfd-text-xs nfd-border nfd-border-solid nfd-border-[rgb(218,220,224)] nfd-rounded nfd-px-2 nfd-py-1 nfd-bg-transparent nfd-text-[rgb(31,31,31)] focus:nfd-outline-none focus:nfd-border-[rgb(23,108,223)]"
							/>
						</div>
					) }
				</div>

				{ showMigration && (
					<div className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-4 nfd-w-full nfd-mt-12">
						<span className="nfd-text-base nfd-font-medium nfd-text-[rgb(95,99,104)]">
							{ __( 'Or', 'wp-module-onboarding' ) }
						</span>
						<button
							onClick={ onMigrate }
							className="nfd-flex nfd-items-center nfd-justify-center nfd-gap-3 nfd-w-full nfd-px-6 nfd-py-4 nfd-bg-[rgb(232,240,254)] nfd-border nfd-border-solid nfd-border-[rgb(232,240,254)] nfd-rounded-xl nfd-cursor-pointer nfd-transition-all hover:nfd-border-[rgba(23,108,223,0.35)] hover:nfd-shadow-[0_0_0_4px_rgba(23,108,223,0.08)]"
						>
							<ArrowRightLeft className="nfd-w-5 nfd-h-5 nfd-text-primary" />
							<span className="nfd-text-lg nfd-font-medium nfd-text-primary">
								{ __( 'Import an Existing WordPress Site', 'wp-module-onboarding' ) }
							</span>
						</button>
					</div>
				) }
			</div>
		</motion.div>
	);
};

export default PromptView;
