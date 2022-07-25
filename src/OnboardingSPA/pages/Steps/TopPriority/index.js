import { __ } from '@wordpress/i18n';
import { useNavigate } from 'react-router-dom';
import { useViewportMatch } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { VIEW_NAV_PRIMARY } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import SelectableCardList from '../../../components/SelectableCardList/selectable-card-list';

const StepTopPriority = ( props ) => {
	const priorityTypes = {
		0: 'publishing',
		1: 'selling',
		2: 'designing',
	};

	const priorities = [
		{
			icon: '--nfd-publish-icon',
			title: 'Publishing',
			desc: 'From blogs, to newsletters, to podcasts and videos, we help the web find your content.',
		},
		{
			icon: '--nfd-selling-icon',
			title: 'Selling',
			desc: "Startup or seasoned business, drop-shipping or downloads, we've got ecommerce covered.",
		},
		{
			icon: '--nfd-design-icon',
			title: 'Designing',
			desc: 'With smart style presets and powerful options, we help your site look and feel polished.',
		},
	];

	const navigate = useNavigate();
	const [ selected, setSelected ] = useState( 0 );
	const [ isLoaded, setisLoaded ] = useState( false );
	const isLargeViewport = useViewportMatch( 'medium' );

	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsSidebarOpened,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	const getKey = ( priorityTypes, value ) => {
		return Object?.keys( priorityTypes ).find(
			( key ) => priorityTypes[ key ] === value
		);
	};

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setIsSidebarOpened( false );
		setDrawerActiveView( VIEW_NAV_PRIMARY );
	}, [] );

	useEffect( () => {
		async function setInitialData() {
			if ( currentData ) {
				const val = await currentData?.data.topPriority.priority1;
				if ( val != '' )
					setSelected( parseInt( getKey( priorityTypes, val ) ) );
				else {
					currentData.data.topPriority.priority1 =
						priorityTypes[ selected ];
					setCurrentOnboardingData( currentData );
				}
			}
			setisLoaded( true );
		}
		if ( ! isLoaded ) setInitialData();
	}, [ isLoaded ] );

	useEffect( () => {
		if ( isLoaded ) {
			currentData.data.topPriority.priority1 = priorityTypes[ selected ];
			setCurrentOnboardingData( currentData );
		}
	}, [ selected ] );

	return (
		<CommonLayout isVerticallyCentered>
			<HeadingWithSubHeading
				title='Tell us your top priority' subtitle='We’ll prioritize getting you there.'/>
			<SelectableCardList
				contents={ priorities }
				selected={ selected }
				onSelectedChange={ setSelected }
			></SelectableCardList>
			<div style={ { textAlign: 'center' } }>
				<p style={ { margin: '16px', fontWeight: '500' } }>
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
				<a
					onClick={ ( e ) => navigate( '/wp-setup/step/basic-info' ) }
					style={ { cursor: 'pointer' } }
				>
					{ __( 'Skip this Step', 'wp-module-onboarding' ) }
				</a>
			</div>
		</CommonLayout>
	);
};

export default StepTopPriority;
