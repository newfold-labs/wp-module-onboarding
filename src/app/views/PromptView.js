import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { motion } from 'motion/react';
import PromptCard from '@/components/prompt/PromptCard.jsx';
import { nfdOnboardingStore } from '@/data/store';
import getGreeting from '@/utils/helpers/getGreeting';

const PromptView = ( { prompt, setPrompt, onSubmit } ) => {
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
			className="nfd-flex nfd-flex-1 nfd-flex-col nfd-items-center nfd-justify-center nfd-px-6 nfd-pb-10"
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
				</div>
			</div>
		</motion.div>
	);
};

export default PromptView;
