import { dispatch, useSelect } from '@wordpress/data';
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

	const handleNext = () => {
		console.log( 'handleNext' );
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

	// we need to loop through the homepages and render them
	return (
		<Step>
			<Container className="nfd-onboarding-step-container nfd-onboarding-step-previews nfd-min-w-[948px] nfd-max-w-[948px]">
				<Container.Header
					title={ __( 'Pick your website', 'wp-module-onboarding' ) }
					description={ __( 'Here are three unique designs for you to start with. Pick your favorite to customize it!', 'wp-module-onboarding' ) }
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
