/**
 * WordPress dependencies
 */
import { useEffect, useRef, useState } from '@wordpress/element';

/**
 * External dependencies
 */
import { WandSparkles, ArrowRight, Rocket } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import confetti from 'canvas-confetti';

/**
 * Internal dependencies
 */
import Spinner from '@/components/progress/Spinner.jsx';
import usePublish from '@/hooks/usePublish';
import { wpAdminUrl } from '@/data/constants';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_ONBOARDING_EXITED } from '@/utils/analytics/hiive/constants';

const EDITOR_REDIRECT_URL = `${ wpAdminUrl }site-editor.php?p=%2F&canvas=edit&referrer=nfd-editor-chat`;

const smooth = { duration: 0.3, ease: [ 0.25, 0.1, 0.25, 1 ] };
const smoothSlow = { duration: 0.5, ease: [ 0.25, 0.1, 0.25, 1 ] };

const fireConfetti = ( cardEl ) => {
	const container = document.getElementById( 'nfd-onboarding' );
	if ( ! container ) {
		return;
	}

	const canvas = document.createElement( 'canvas' );
	canvas.style.cssText =
		'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:999999';
	container.appendChild( canvas );

	const fire = confetti.create( canvas, { resize: true } );

	let origin = { x: 0.5, y: 0.5 };
	if ( cardEl ) {
		const rect = cardEl.getBoundingClientRect();
		origin = {
			x: ( rect.left + rect.width / 2 ) / window.innerWidth,
			y: ( rect.top + rect.height / 2 ) / window.innerHeight,
		};
	}

	setTimeout( () => {
		fire( {
			particleCount: 100,
			spread: 150,
			origin,
		} );
	}, 150 );

	setTimeout( () => {
		canvas.remove();
	}, 4000 );
};

/**
 * PublishProgress — auto-runs publishing steps sequentially when mounted.
 *
 * @param {Object}   props                Props.
 * @param {Object}   props.generationData Data from the generation phase.
 * @param {Object}   props.discoveryData  Data from the discovery phase.
 * @param {Function} props.onComplete     Callback when all tasks finish.
 * @return {JSX.Element} The PublishProgress component.
 */
const PublishProgress = ( { generationData, discoveryData, onComplete } ) => {
	const { tasks, isComplete } = usePublish( generationData, discoveryData );
	const didNotifyRef = useRef( false );
	const cardRef = useRef( null );
	const [ showSuccess, setShowSuccess ] = useState( false );

	const currentTask = tasks.find( ( t ) => t.status === 'running' );

	useEffect( () => {
		if ( isComplete && ! didNotifyRef.current ) {
			didNotifyRef.current = true;
			setShowSuccess( true );
			fireConfetti( cardRef.current );
			onComplete?.();
		}
	}, [ isComplete, onComplete ] );

	return (
		<div ref={ cardRef } className="nfd-publishing-card nfd-self-stretch nfd-shrink-0 nfd-w-full nfd-rounded-2xl nfd-bg-white nfd-border nfd-border-solid nfd-border-[rgba(0,0,0,0.08)] nfd-overflow-hidden nfd-antialiased">
			<AnimatePresence mode="wait">
				{ ! showSuccess ? (
					<motion.div
						key="progress"
						exit={ { opacity: 0 } }
						transition={ smooth }
						className="nfd-flex nfd-flex-col nfd-items-center nfd-py-8 nfd-px-6 nfd-gap-4"
					>
						<span className="nfd-text-lg nfd-font-semibold nfd-text-[rgb(31,31,31)]">
							{ __( 'Setting up your site', 'wp-module-onboarding' ) }
						</span>

						<span className="nfd-inline-flex nfd-items-center nfd-justify-center nfd-w-12 nfd-h-12">
							<span className="nfd-spinner nfd-w-10 nfd-h-10 nfd-rounded-full nfd-animate-spin" />
						</span>

						<span className="nfd-text-sm nfd-text-[rgba(0,0,0,0.45)]">
							{ currentTask?.label || __( 'Preparing…', 'wp-module-onboarding' ) }
						</span>
					</motion.div>
				) : (
					<motion.div
						key="success"
						initial={ { opacity: 0 } }
						animate={ { opacity: 1 } }
						transition={ smoothSlow }
						className="nfd-flex nfd-flex-col nfd-items-center nfd-text-center nfd-py-8 nfd-px-6 nfd-gap-4"
					>
						<div className="nfd-flex nfd-items-center nfd-justify-center nfd-w-10 nfd-h-10 nfd-rounded-xl nfd-bg-blue-50 nfd-text-blue-500">
							<Rocket size={ 20 } strokeWidth={ 1.75 } />
						</div>
						<div className="nfd-flex nfd-flex-col nfd-gap-1">
							<span className="nfd-text-lg nfd-font-semibold nfd-text-[rgb(31,31,31)]">
								{ __( 'Your site is ready', 'wp-module-onboarding' ) }
							</span>
							<span className="nfd-text-xs nfd-text-[rgba(0,0,0,0.4)] nfd-leading-relaxed">
								{ __( 'Everything has been published and is ready to go.', 'wp-module-onboarding' ) }
							</span>
						</div>
						<motion.button
							type="button"
							initial={ { opacity: 0 } }
							animate={ { opacity: 1 } }
							transition={ { ...smooth, delay: 0.15 } }
							className="nfd-flex nfd-items-center nfd-gap-2 nfd-pl-5 nfd-pr-4 nfd-py-2.5 nfd-rounded-full nfd-border-0 nfd-text-white nfd-bg-primary nfd-cursor-pointer nfd-text-[13px] nfd-font-medium"
							whileHover={ { opacity: 0.9 } }
							whileTap={ { scale: 0.98 } }
							onClick={ () => {
								sendOnboardingEvent(
									new OnboardingEvent( ACTION_ONBOARDING_EXITED, 'site_editor' )
								);
								sessionStorage.setItem( 'nfd_onboarding_complete', 'true' );
								window.location.href = EDITOR_REDIRECT_URL;
							} }
						>
							<WandSparkles size={ 14 } />
							<span>{ __( 'Customize your site', 'wp-module-onboarding' ) }</span>
							<ArrowRight size={ 14 } />
						</motion.button>
					</motion.div>
				) }
			</AnimatePresence>
		</div>
	);
};

export default PublishProgress;
