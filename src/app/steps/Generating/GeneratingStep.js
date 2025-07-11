import { dispatch, useSelect } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { Container, Title } from '@newfold/ui-component-library';
import { Motion, Orb, Step } from '@/components';
import { nfdOnboardingStore } from '@/data/store';
import { generateSite } from '@/utils/sitegen';
import { ExperienceOptions } from './';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_EXPERIENCE_LEVEL_SET } from '@/utils/analytics/hiive/constants';

const GeneratingStep = () => {
	const [ isSiteGenerationComplete, setIsSiteGenerationComplete ] = useState( false );
	const [ isTimerComplete, setIsTimerComplete ] = useState( false );
	const [ isReadyToAnimate, setIsReadyToAnimate ] = useState( false );

	const { selectedExperienceLevel, homepages, retryMode } = useSelect( ( select ) => {
		return {
			experienceLevel: select( nfdOnboardingStore ).getExperienceLevel(),
			homepages: select( nfdOnboardingStore ).getHomepages(),
			retryMode: select( nfdOnboardingStore ).getRetryMode(),
		};
	} );

	const navigate = useNavigate();

	const containerVariants = {
		visible: {
			transition: {
				delayChildren: 2.5,
				staggerChildren: 0.4,
			},
		},
		hidden: {},
	};

	const itemVariants = {
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: 'easeOut',
			},
		},
		hidden: {
			opacity: 0,
			y: 50,
		},
	};

	/**
	 * Whether to render the component or navigate a different step.
	 * @return {boolean} True if the component should render, false otherwise.
	 */
	const shouldRender = () => {
		// If Sitegen already generated 3 or more homepages, don't render this component.
		const previews = Object.keys( homepages );
		if ( previews.length >= 3 ) {
			return false;
		}

		return true;
	};

	/**
	 * Handle advancing to the next step.
	 */
	const handleNext = () => {
		// Analytics: Experience Level Set
		trackOnboardingEvent(
			new OnboardingEvent(
				ACTION_EXPERIENCE_LEVEL_SET,
				selectedExperienceLevel,
				{
					source: 'quickstart',
				}
			)
		);
		navigate( '/previews', {
			state: { direction: 'forward' },
		} );
	};

	/**
	 * Handle failed site generation.
	 * Logic:
	 * - If Sitegen has failed for the first time, restart the generation process to try again.
	 * - If Sitegen has failed for the second time, navigate to the previews step to generate fallback pages.
	 * @return {void}
	 */
	const handleFailedSiteGeneration = () => {
		// If we're already in retry mode...
		if ( retryMode ) {
			// Mark Sitegen as failed.
			dispatch( nfdOnboardingStore ).setSitegenHasFailed( true );
			// Navigate to the previews step to generate fallback pages.
			navigate( '/previews', {
				state: { direction: 'forward' },
			} );
		} else {
			// Set to retry mode.
			dispatch( nfdOnboardingStore ).setRetryMode( true );
			// Navigate to the intake step to allow the user to try again.
			navigate( '/intake', {
				state: { direction: 'backward' },
			} );
		}
	};

	/*
	 * This function will initiate the site generation process.
	 */
	const initiateSiteGeneration = async () => {
		const result = await generateSite( retryMode );
		if ( result ) {
			setIsSiteGenerationComplete( true );
		} else {
			handleFailedSiteGeneration();
		}
	};

	/*
	 * An arbitrary 20s timer to ensure the user has had a chance to select an experience level.
	 */
	const startExperienceTimer = () => {
		const experienceTimer = setTimeout( () => {
			setIsTimerComplete( true );
		}, 20000 );
		return () => clearTimeout( experienceTimer );
	};

	// When Sitegen states update, advance to the next step if possible.
	useEffect( () => {
		// If generation is complete and the user has selected an experience level, advance to the next step.
		if ( isSiteGenerationComplete && selectedExperienceLevel ) {
			handleNext();
		}
		// If the timer is complete and the generation is complete, advance to the next step.
		if ( isTimerComplete && isSiteGenerationComplete ) {
			handleNext();
		}
	}, [ isSiteGenerationComplete, selectedExperienceLevel, isTimerComplete ] );

	// On mount...
	useEffect( () => {
		if ( ! shouldRender() ) {
			// Skip site generation and navigate to the previews step.
			const forwardTimer = setTimeout( () => {
				// Wait 4 seconds for subtle transition.
				navigate( '/previews', {
					state: { direction: 'forward' },
				} );
			}, 4000 );
			return () => clearTimeout( forwardTimer );
		}

		initiateSiteGeneration();
		startExperienceTimer();

		// Delay the animation start to allow the component to mount first.
		const animationStartTimer = setTimeout( () => {
			window.requestAnimationFrame( () => setIsReadyToAnimate( true ) );
		}, 1500 );
		return () => clearTimeout( animationStartTimer );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	return (
		<Step>
			<Container className="nfd-onboarding-step-container nfd-onboarding-step-generating">
				<Container.Block className="nfd-text-center nfd-p-0">
					<Motion
						initial={ { scale: 1.1, y: 100 } }
						animate={ isReadyToAnimate ? { scale: 1, y: 0 } : { scale: 1.1, y: 100 } }
						transition={ { ease: 'easeOut', delay: 2.2, duration: 0.8 } }
					>
						<div className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-5">
							<Title className="nfd-text-3xl mobile:nfd-text-xl">
								{ __( 'Building your website…', 'wp-module-onboarding' ) }
							</Title>
							<p className="nfd-text-[15px] nfd-text-content-primary mobile:nfd-text-tiny">
								{ __( 'Hang tight while we create some wonderful options for you.', 'wp-module-onboarding' ) }
							</p>
						</div>
						<div className="nfd-my-14">
							<Orb height="90px" />
						</div>
					</Motion>

					<div className="nfd-flex nfd-flex-col nfd-max-w-[500px] nfd-mx-auto">
						<Motion
							variants={ containerVariants }
							initial="hidden"
							animate={ isReadyToAnimate ? 'visible' : 'hidden' }
						>
							<Motion variants={ itemVariants }>
								<p className="nfd-text-[14px] nfd-text-content-primary nfd-mb-8">
									{ __( 'While we wait, let us know how familiar you are with WordPress, so we can tailor the experience to your needs:', 'wp-module-onboarding' ) }
								</p>
							</Motion>
							<Motion variants={ itemVariants }>
								<ExperienceOptions />
							</Motion>
						</Motion>
					</div>
				</Container.Block>
			</Container>
		</Step>
	);
};

export default GeneratingStep;
