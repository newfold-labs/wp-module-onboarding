import { Motion, Orb, Step } from '@/components';
import { Container, Title } from '@newfold/ui-component-library';
import { ExperienceOptions } from './';

const GeneratingStep = () => {
	const [ isReady, setIsReady ] = useState( false );

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

	// Delay the animation start to allow the component to mount first.
	useEffect( () => {
		const animationStartTimer = setTimeout( () => {
			window.requestAnimationFrame( () => setIsReady( true ) );
		}, 1500 );

		return () => clearTimeout( animationStartTimer );
	}, [] );

	return (
		<Step>
			<Container className="nfd-onboarding-step-container nfd-onboarding-step-generating">
				<Container.Block className="nfd-text-center nfd-p-0">
					<Motion
						initial={ { scale: 1.1, y: 100 } }
						animate={ isReady ? { scale: 1, y: 0 } : { scale: 1.1, y: 100 } }
						transition={ { ease: 'easeOut', delay: 2.2, duration: 0.8 } }
					>
						<div className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-5">
							<Title className="nfd-text-3xl">
								{ __( 'Building your website…', 'wp-module-onboarding' ) }
							</Title>
							<p className="nfd-text-[15px]">
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
							animate={ isReady ? 'visible' : 'hidden' }
						>
							<Motion variants={ itemVariants }>
								<p className="nfd-text-[14px] nfd-mb-8">
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
