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
	const homepages = useSelect( ( select ) => {
		return {
			homepages: select( nfdOnboardingStore ).getHomepages(),
		};
	} );

	const hasFailed = useSelect( ( select ) => {
		return select( nfdOnboardingStore ).getHasFailed();
	} );

	const navigate = useNavigate();

	// Get fallback homepages from runtime data
	const getFallbackHomepages = () => {
		return window.nfdOnboarding?.runtime?.fallbackHomepages || {};
	};

	// Update store with static homepages when hasFailed is true
	useEffect( () => {
		if ( hasFailed ) {
			const fallbackHomepages = getFallbackHomepages();
			dispatch( nfdOnboardingStore ).setHomepages( fallbackHomepages );
		}
	}, [ hasFailed ] );

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
		const previews = homepages.homepages;
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

	return (
		<Step>
			<Container className="nfd-onboarding-step-container nfd-onboarding-step-previews nfd-min-w-[948px] nfd-max-w-[948px]">
				<Container.Header
					title={ __( 'Pick your website', 'wp-module-onboarding' ) }
					description={ hasFailed 
						? __( 'Here are three beautiful pre-designed templates for you to start with. Pick your favorite to customize it!', 'wp-module-onboarding' )
						: __( 'Here are three unique designs for you to start with. Pick your favorite to customize it!', 'wp-module-onboarding' )
					}
					className="nfd-gap-2"
				/>
				<Container.Block>
					<div className="nfd-grid nfd-grid-cols-3 nfd-gap-6">
						{ renderPreviews() }
					</div>
				</Container.Block>
			</Container>
		</Step>
	);
};

export default PreviewsStep;
