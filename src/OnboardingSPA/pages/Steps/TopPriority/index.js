import { __ } from '@wordpress/i18n';
import { useViewportMatch } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { SIDEBAR_LEARN_MORE, VIEW_NAV_PRIMARY } from '../../../../constants';

import SkipButton from '../../../components/SkipButton';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import SelectableCardList from '../../../components/SelectableCardList/selectable-card-list';
import getContents from './contents';
import { trackHiiveEvent } from '../../../utils/analytics';

const StepTopPriority = () => {
	const priorityTypes = {
		0: 'publishing',
		1: 'selling',
		2: 'designing',
	};

	const [ selected, setSelected ] = useState( 0 );
	const [ isLoaded, setisLoaded ] = useState( false );
	const isLargeViewport = useViewportMatch( 'medium' );

	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setSidebarActiveView,
		setCurrentOnboardingData,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	const getKey = ( value ) => {
		return Object?.keys( priorityTypes ).find(
			( key ) => priorityTypes[ key ] === value
		);
	};

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_NAV_PRIMARY );
		setIsHeaderNavigationEnabled( true );
	}, [] );

	useEffect( () => {
		async function setInitialData() {
			if ( currentData ) {
				const val = await currentData?.data.topPriority.priority1;
				if ( val !== '' ) {
					setSelected( parseInt( getKey( val ) ) );
				} else {
					currentData.data.topPriority.priority1 =
						priorityTypes[ selected ];
					setCurrentOnboardingData( currentData );
				}
			}
			setisLoaded( true );
		}
		if ( ! isLoaded ) {
			setInitialData();
		}
	}, [ isLoaded ] );

	useEffect( () => {
		if ( isLoaded ) {
			currentData.data.topPriority.priority1 = priorityTypes[ selected ];
			setCurrentOnboardingData( currentData );
			trackHiiveEvent( 'top-priority', priorityTypes[ selected ] );
		}
	}, [ selected ] );

	const content = getContents();

	return (
		<CommonLayout isVerticallyCentered>
			<HeadingWithSubHeading
				title={ content.heading }
				subtitle={ content.subheading }
			/>
			<SelectableCardList
				contents={ content.options }
				selected={ selected }
				onSelectedChange={ setSelected }
			></SelectableCardList>
			<div className="center">
				<p className="info-top-priority">
					{ __(
						"Where would you like to start? We'll start ",
						'wp-module-onboarding'
					) }
					{ __(
						'there and then move into next steps.',
						'wp-module-onboarding'
					) }
				</p>
				<SkipButton
					callback={ () =>
						trackHiiveEvent(
							'top-priority-skipped',
							priorityTypes[ selected ]
						)
					}
				/>
			</div>
		</CommonLayout>
	);
};

export default StepTopPriority;
