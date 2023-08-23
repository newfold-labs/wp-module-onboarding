// eslint-disable-next-line import/no-extraneous-dependencies
import { isEmpty } from 'lodash';
import { useViewportMatch } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';

import { SIDEBAR_LEARN_MORE, VIEW_NAV_PRIMARY } from '../../../../constants';
import CommonLayout from '../../../components/Layouts/Common';
import { getSiteFeatures } from '../../../utils/api/plugins';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import CheckboxList from '../../../components/CheckboxTemplate/CheckboxList';
import { CheckboxListSkeleton } from '../../../components/CheckboxTemplate';
import getContents from './contents';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';
import { ACTION_FEATURE_ADDED } from '../../../utils/analytics/hiive/constants';

const StepSiteFeatures = () => {
	const isLargeViewport = useViewportMatch( 'medium' );

	const [ selectedPlugins, setSelectedPlugins ] = useState();
	const [ customPluginsList, setCustomPluginsList ] = useState();

	const {
		setIsDrawerOpened,
		setDrawerActiveView,
		setSidebarActiveView,
		setCurrentOnboardingData,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	const { currentStep, currentData, themeVariations } = useSelect(
		( select ) => {
			return {
				currentStep: select( nfdOnboardingStore ).getCurrentStep(),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				themeVariations:
					select( nfdOnboardingStore ).getStepPreviewData(),
			};
		},
		[]
	);

	async function selectPlugin( slug, choice ) {
		const selectedPluginsCopy = { ...selectedPlugins };
		selectedPluginsCopy[ slug ] = choice;
		setSelectedPlugins( selectedPluginsCopy );

		currentData.data.siteFeatures = { ...selectedPluginsCopy };
		setCurrentOnboardingData( currentData );
		if ( true === choice ) {
			trackOnboardingEvent(
				new OnboardingEvent( ACTION_FEATURE_ADDED, slug )
			);
		}
	}

	async function changeToStoreSchema( customPlugins, saveToStore = false ) {
		const plugins = {};

		for ( const key in customPlugins ) {
			const plugin = customPlugins[ key ];
			plugins[ plugin.slug ] = plugin.selected;
		}
		setSelectedPlugins( plugins );

		if ( saveToStore ) {
			currentData.data.siteFeatures = { ...plugins };
			setCurrentOnboardingData( currentData );
		}
	}

	async function getCustomPlugins() {
		const customPlugins = await getSiteFeatures();
		if ( isEmpty( currentData?.data?.siteFeatures ) )
			changeToStoreSchema( customPlugins.body, true );
		else setSelectedPlugins( { ...currentData?.data?.siteFeatures } );

		setCustomPluginsList( customPlugins.body );
	}

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( false );
		}
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_NAV_PRIMARY );
		setIsHeaderNavigationEnabled( true );
		getCustomPlugins();
	}, [] );

	const content = getContents();

	return (
		<CommonLayout>
			<div style={ { margin: '100px' } }>
				<HeadingWithSubHeading
					title={ content.heading }
					subtitle={ content.subheading }
				/>
			</div>
			{ ! customPluginsList && (
				<CheckboxListSkeleton
					count={
						themeVariations[ currentStep?.patternId ]?.previewCount
					}
				/>
			) }
			{ customPluginsList && (
				<CheckboxList
					callback={ selectPlugin }
					selectedItems={ selectedPlugins }
					customItemsList={ customPluginsList }
				/>
			) }
		</CommonLayout>
	);
};

export default StepSiteFeatures;
