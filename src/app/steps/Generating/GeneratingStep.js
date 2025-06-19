import { dispatch, select } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { Container, Title } from '@newfold/ui-component-library';
import { Motion, Orb, Step } from '@/components';
import { nfdOnboardingStore } from '@/data/store';
import { generateSite } from '@/utils/sitegen';
import { ExperienceOptions } from './';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_EXPERIENCE_LEVEL_SET } from '@/utils/analytics/hiive/constants';

const GeneratingStep = () => {
	const experienceLevel = select( nfdOnboardingStore ).getExperienceLevel();
	const [ selectedExperienceValue, setSelectedExperienceValue ] = useState( experienceLevel ?? null );
	const [ isSiteGenerationComplete, setIsSiteGenerationComplete ] = useState( false );
	const [ isTimerComplete, setIsTimerComplete ] = useState( false );
	const [ isReadyToAnimate, setIsReadyToAnimate ] = useState( false );

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
	 * Check if the user can advance to the next step.
	 */
	const canAdvance = () => {
		// If generation is complete and the user has selected an experience level, advance to the next step.
		if ( isSiteGenerationComplete && selectedExperienceValue ) {
			return true;
		}
		// If the timer is complete and the generation is complete, advance to the next step.
		if ( isTimerComplete && isSiteGenerationComplete ) {
			return true;
		}

		return false;
	};

	/**
	 * Handle advancing to the next step.
	 */
	const handleNext = () => {
		if ( ! canAdvance() ) {
			return;
		}
		dispatch( nfdOnboardingStore ).setExperienceLevel( selectedExperienceValue );

		// Analytics: Experience Level Set
		trackOnboardingEvent(
			new OnboardingEvent(
				ACTION_EXPERIENCE_LEVEL_SET,
				selectedExperienceValue,
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
		const retryMode = select( nfdOnboardingStore ).getRetryMode();
		// If we're already in retry mode...
		if ( retryMode ) {
			// Mark Sitegen as failed.
			dispatch( nfdOnboardingStore ).setHasFailed( true );
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
		const result = await generateSite();
		if ( result ) {
			setIsSiteGenerationComplete( true );
			handleNext();
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

	// When the timer is complete, attempt to advance to the next step.
	useEffect( () => {
		handleNext();
	}, [ isTimerComplete ] );

	// Delay the animation start to allow the component to mount first.
	useEffect( () => {
		initiateSiteGeneration();
		startExperienceTimer();

		const animationStartTimer = setTimeout( () => {
			window.requestAnimationFrame( () => setIsReadyToAnimate( true ) );
		}, 1500 );
		return () => clearTimeout( animationStartTimer );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	/*
	 * Handle the experience level selection change.
	 */
	const handleExperienceChange = ( value ) => {
		setSelectedExperienceValue( value );
		handleNext();
	};

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
							<Title className="nfd-text-3xl">
								{ __( 'Building your website…', 'wp-module-onboarding' ) }
							</Title>
							<p className="nfd-text-[15px] nfd-text-content-primary">
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
								<ExperienceOptions
									selectedValue={ selectedExperienceValue }
									onValueChange={ handleExperienceChange }
								/>
							</Motion>
						</Motion>
					</div>
				</Container.Block>
			</Container>
		</Step>
	);
};

export default GeneratingStep;
