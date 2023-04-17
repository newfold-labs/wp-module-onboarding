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

const StepTopPriority = () => {
	const priorityTypes = {
		0: 'publishing',
		1: 'selling',
		2: 'designing',
	};

	const priorities = [
		{
			icon: '--nfd-publish-icon',
			title: __( 'Publishing', 'wp-module-onboarding' ),
			desc: __(
				'From blogs, to newsletters, to podcasts and videos, we help the web find your content.',
				'wp-module-onboarding'
			),
		},
		{
			icon: '--nfd-selling-icon',
			title: __( 'Selling', 'wp-module-onboarding' ),
			desc: __(
				"Startup or seasoned business, drop-shipping or downloads, we've got ecommerce covered.",
				'wp-module-onboarding'
			),
		},
		{
			icon: '--nfd-design-icon',
			title: __( 'Designing', 'wp-module-onboarding' ),
			desc: __(
				'With smart style presets and powerful options, we help your site look and feel polished.',
				'wp-module-onboarding'
			),
		},
	];

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

	const { currentStep, currentData } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
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

	const handleSelling = () => {
		if ( 'ecommerce' !== window.nfdOnboarding.currentFlow ) {
			window.nfdOnboarding.newFlow = 'ecommerce';
		}
	};

	useEffect( () => {
		const selectedPriorityType = priorityTypes[ selected ];
		currentData.data.topPriority.priority1 = selectedPriorityType;
		setCurrentOnboardingData( currentData );
		if ( 'selling' === selectedPriorityType ) {
			handleSelling();
		} else {
			window.nfdOnboarding.newFlow = undefined;
		}
	}, [ selected ] );

	const handleSkip = () => {
		window.nfdOnboarding.newFlow = undefined;
		currentData.data.topPriority.priority1 = priorityTypes[ 0 ];
		setCurrentOnboardingData( currentData );
	};

	return (
		<CommonLayout isVerticallyCentered>
			<HeadingWithSubHeading
				title={ currentStep?.heading }
				subtitle={ currentStep?.subheading }
			/>
			<SelectableCardList
				contents={ priorities }
				selected={ selected }
				onSelectedChange={ setSelected }
			></SelectableCardList>
			<div className="center">
				<p className="info-top-priority">
					{ __(
						"Where would you like to start? We'll start ",
						'wp-module-onboarding'
					) }
					<br></br>
					{ __(
						'there and then move into next steps.',
						'wp-module-onboarding'
					) }
				</p>
				<SkipButton callback={ handleSkip } />
			</div>
		</CommonLayout>
	);
};

export default StepTopPriority;
