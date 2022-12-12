import { isEmpty } from 'lodash';
import { useViewportMatch } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';

import { VIEW_NAV_PRIMARY } from '../../../../constants';
import CommonLayout from '../../../components/Layouts/Common';
import { getSiteFeatures } from '../../../utils/api/plugins';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import CheckboxList from '../../../components/CheckboxTemplate/CheckboxList';
import { CheckboxListSkeleton } from '../../../components/CheckboxTemplate';

const StepSiteFeatures = () => {
	const isLargeViewport = useViewportMatch( 'medium' );

	const [ isLoaded, setisLoaded ] = useState( false );
	const [ selectedPlugins, setSelectedPlugins ] = useState();
	const [ customPluginsList, setCustomPluginsList ] = useState();

	const {
		setIsDrawerOpened,
		setDrawerActiveView,
		setIsSidebarOpened,
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
	}

	async function changeToStoreSchema(
		customPluginsList,
		saveToStore = false
	) {
		const selectedPlugins = {};

		for ( const key in customPluginsList ) {
			const plugin = customPluginsList[ key ];
			selectedPlugins[ plugin.slug ] = plugin.selected;
		}
		setSelectedPlugins( selectedPlugins );

		if ( saveToStore ) {
			currentData.data.siteFeatures = { ...selectedPlugins };
			setCurrentOnboardingData( currentData );
		}
	}

	async function getCustomPlugins() {
		const customPluginsList = await getSiteFeatures();
		if ( isEmpty( currentData?.data?.siteFeatures ) )
			changeToStoreSchema( customPluginsList.body, true );
		else setSelectedPlugins( { ...currentData?.data?.siteFeatures } );

		setCustomPluginsList( customPluginsList.body );
		setisLoaded( true );
	}

	useEffect( () => {
		if ( ! isLoaded ) {
			getCustomPlugins();
		}
	}, [ isLoaded ] );

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( false );
		}
		setIsSidebarOpened( false );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_NAV_PRIMARY );
		setIsHeaderNavigationEnabled( true );
	}, [] );

	return (
		<CommonLayout>
			<div style={ { margin: '100px' } }>
				<HeadingWithSubHeading
					title={ currentStep?.heading }
					subtitle={ currentStep?.subheading }
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
