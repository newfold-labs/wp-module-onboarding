import { Title } from '@newfold/ui-component-library';
import { useEffect, useState } from "react";
import { Motion, Navigate, Orb } from '@/components';

const IntroStep = () => {
	const [ isReady, setIsReady ] = useState( false );

	const containerVariants = {
		visible: {
			transition: {
				delayChildren: 2.5,
				staggerChildren: 0.2,
			},
		},
		hidden: {},
	};

	const itemVariants = {
		visible: {
			opacity: 1,
			y: -70,
			transition: {
				duration: 0.2,
				ease: 'easeOut',
			},
		},
		hidden: {
			opacity: 0,
			y: -20,
		},
	};

	// Delay the animation start to allow the app to mount first.
	useEffect( () => {
		const animationStartTimer = setTimeout( () => {
			window.requestAnimationFrame( () => setIsReady( true ) );
		}, 300 );

		return () => clearTimeout( animationStartTimer );
	}, [] );

	return (
		<div
			className="nfd-onboarding-step-intro nfd-flex nfd-flex-col nfd-items-center nfd-justify-center nfd-h-[calc(100dvh-10rem-65px)]"
		>
			<Motion
				initial={ { scale: 1, y: 0 } }
				animate={ isReady ? { scale: 0.8, y: -100 } : { scale: 1, y: 0 } }
				transition={ { ease: 'easeOut', delay: 2.2, duration: 0.8 } }
			>
				<Orb height="100px" />
			</Motion>

			<Motion
				variants={ containerVariants }
				initial="hidden"
				animate={ isReady ? 'visible' : 'hidden' }
			>
				<div className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-4">
					<Motion variants={ itemVariants }>
						<Title>{ __( 'Welcome to Bluehost QuickStarter' ) }</Title>
					</Motion>
					<Motion
						tag="p"
						variants={ itemVariants }
					>
						{ __( 'The easiest way to get your website up and running.' ) }
					</Motion>
					<Motion variants={ itemVariants }>
						<Navigate
							toRoute="/intake"
							direction="forward"
							size="large"
						>
							{ __( 'Let\'s Start' ) }
						</Navigate>
					</Motion>
				</div>
			</Motion>
		</div>
	);
};

export default IntroStep;
