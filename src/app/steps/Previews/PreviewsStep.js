import { useState, useEffect } from 'react';
import { dispatch, useSelect } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { Container } from '@newfold/ui-component-library';
import { Step } from '@/components';
import { nfdOnboardingStore } from '@/data/store';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_HOMEPAGE_PREVIEW_SELECTED } from '@/utils/analytics/hiive/constants';
import { Preview } from './';

const PreviewsStep = () => {
	const { homepages, fallbackHomepages, sitegenHasFailed } = useSelect( ( select ) => {
		return {
			homepages: select( nfdOnboardingStore ).getHomepages(),
			fallbackHomepages: select( nfdOnboardingStore ).getFallbackHomepages(),
			sitegenHasFailed: select( nfdOnboardingStore ).getSitegenHasFailed(),
		};
	} );

	const navigate = useNavigate();

	// Update store with static homepages when sitegenHasFailed is true
	useEffect( () => {
		if ( sitegenHasFailed ) {
			dispatch( nfdOnboardingStore ).setHomepages( fallbackHomepages );
		}
	}, [ sitegenHasFailed ] );

	const handleNext = () => {
		navigate( '/canvas', {
			state: { direction: 'forward' },
		} );
	};

	const handlePreview = ( slug ) => {
		// Analytics: Selected homepage preview.
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_HOMEPAGE_PREVIEW_SELECTED, slug, {
				source: 'quickstart',
			} )
		);

		dispatch( nfdOnboardingStore ).setSelectedHomepage( slug );
		handleNext();
	};

	const renderPreviews = () => {
		const previews = homepages;
		return Object.keys( previews ).map( ( slug, idx ) => {
			return (
				<Preview
					key={ idx }
					preview={ previews[ slug ] }
					onPreview={ handlePreview }
				/>
			);
		} );
	};

	const getStepTitle = () => {
		if ( sitegenHasFailed ) {
			return __( "Sorry, let's try a different approach.", 'wp-module-onboarding' );
		}
		return __( 'Pick your website', 'wp-module-onboarding' );
	};

	const getStepDescription = () => {
		if ( sitegenHasFailed ) {
			return __( "We're sorry, our site generation tool isn't working right now. In the meantime, here are three unique site templates to get you started. Choose your favorite — we'll guide you through customizing it!", 'wp-module-onboarding' );
		}
		return __( 'Here are three unique designs for you to start with. Pick your favorite to customize it!', 'wp-module-onboarding' );
	};

	return (
		<Step>
			<Container
				className="nfd-onboarding-step-container nfd-onboarding-step-previews nfd-w-full nfd-max-w-[948px] nfd-mx-auto nfd-px-4 sm:nfd-px-6"
			>
				<Container.Header
					title={ getStepTitle() }
					description={ getStepDescription() }
					className="nfd-gap-2 nfd-text-center sm:nfd-text-left"
				/>
				<Container.Block>
					<div className="nfd-grid nfd-grid-cols-1 sm:nfd-grid-cols-2 lg:nfd-grid-cols-3 nfd-gap-6 nfd-place-items-center sm:nfd-place-items-start">
						{ renderPreviews() }
					</div>
				</Container.Block>
			</Container>
		</Step>
	);
};

export default PreviewsStep;
