import CommonLayout from '../../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../../components/NewfoldLargeCard';
import {
	SIDEBAR_LEARN_MORE,
	VIEW_NAV_GET_STARTED,
} from '../../../../../../constants';
import getContents from '../contents';
import { store as nfdOnboardingStore } from '../../../../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import CardHeader from '../../../../../components/CardHeader';
import NavCardButton from '../../../../../components/Button/NavCardButton';
import NeedHelpTag from '../../../../../components/NeedHelpTag';
import Animate from '../../../../../components/Animate';
import { getSiteClassification } from '../../../../../utils/api/siteClassification';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../../../utils/analytics/hiive';
import { ACTION_PRIMARY_TYPE_SET } from '../../../../../utils/analytics/hiive/constants';

const StepPrimarySetup = () => {
	const {
		setDrawerActiveView,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
		setSidebarActiveView,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerSuppressed( true );
		setDrawerActiveView( VIEW_NAV_GET_STARTED );
		setIsHeaderNavigationEnabled( true );
		getSiteClassificationData();
	}, [] );

	const [ custom, setCustom ] = useState( false );
	const [ siteClassification, setSiteClassification ] = useState();
	const [ primaryCategory, setPrimaryCategory ] = useState( '' );
	// Timeout after which a custom input analytics event will be sent.
	const [ typingTimeout, setTypingTimeout ] = useState();

	const content = getContents();

	/**
	 * Function which fetches the Site Classifications
	 *
	 */
	const getSiteClassificationData = async () => {
		const siteClassificationData = await getSiteClassification();
		setSiteClassification( siteClassificationData?.body );

		// Incase old user comes again with data, we need to save it
		if (
			typeof currentData?.data?.siteType?.primary === 'string' ||
			typeof currentData?.data?.siteType?.secondary === 'string'
		) {
			const primaryValue = currentData?.data?.siteType?.primary;
			const secondaryValue = currentData?.data?.siteType?.secondary;
			currentData.data.siteType.primary = {
				refers: 'custom',
				value: primaryValue,
			};
			currentData.data.siteType.secondary = {
				refers: 'custom',
				value: secondaryValue,
			};
			setCurrentOnboardingData( currentData );
		}

		setPrimaryCategory( currentData?.data?.siteType?.primary?.value ?? '' );
		if ( currentData?.data?.siteType?.primary?.refers === 'custom' ) {
			categoryInput( currentData?.data?.siteType?.primary?.value );
		}
	};

	/**
	 * Function which saves data in redux when category name is selected via chips
	 *
	 * @param {string} primType
	 */
	const handleCategoryClick = ( primType ) => {
		setCustom( false );
		setPrimaryCategory( primType );
		currentData.data.siteType.primary.refers = 'slug';
		currentData.data.siteType.primary.value = primType;
		setCurrentOnboardingData( currentData );
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_PRIMARY_TYPE_SET, primType )
		);
	};

	/**
	 * Function which saves data in redux when category name is put-in via input box
	 *
	 * @param {string} value
	 */
	const categoryInput = ( value ) => {
		setCustom( true );
		currentData.data.siteType.primary.refers = 'custom';
		currentData.data.siteType.primary.value = value;
		setCurrentOnboardingData( currentData );
		if ( '' !== primaryCategory && primaryCategory !== value ) {
			clearTimeout( typingTimeout );
			setTypingTimeout(
				setTimeout( () => {
					trackOnboardingEvent(
						new OnboardingEvent( ACTION_PRIMARY_TYPE_SET, value )
					);
				}, 1000 )
			);
		}
		setPrimaryCategory( value );
	};

	const primarySiteTypeChips = () => {
		const types = siteClassification?.types;
		return Object.keys( types ).map( ( type, idx ) => {
			return (
				<div
					key={ types[ type ]?.slug }
					tabIndex={ idx + 1 }
					role="button"
					className={ `${
						types[ type ].slug === primaryCategory && ! custom
							? 'chosenPrimaryCategory '
							: ''
					}nfd-card-pri-category` }
					onClick={ () => handleCategoryClick( types[ type ].slug ) }
					onKeyDown={ () =>
						handleCategoryClick( types[ type ].slug )
					}
				>
					<div className="nfd-card-pri-category-wrapper">
						<span
							className={ `nfd-card-pri-category-wrapper__icon ${
								types[ type ].slug === primaryCategory
									? 'nfd-card-pri-category-wrapper__icon-selected '
									: ''
							}` }
							style={ {
								backgroundImage: `url(${ types[ type ]?.icon })`,
							} }
						></span>
						<span className="categName">
							{ types[ type ]?.label }
						</span>
					</div>
				</div>
			);
		} );
	};

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className="nfd-card-heading center">
					<CardHeader
						heading={ content.heading }
						subHeading={ content.subheading }
						question={ content.question }
					/>
				</div>
				<Animate type="fade-in-disabled" after={ siteClassification }>
					<div className="nfd-setup-primary-categories">
						{ siteClassification && primarySiteTypeChips() }
					</div>
					<div className="nfd-setup-primary-custom">
						<p className="nfd-setup-primary-custom__tellus-text">
							or tell us here:
						</p>
						<input
							type="search"
							onChange={ ( e ) =>
								categoryInput( e?.target?.value )
							}
							className="nfd-setup-primary-custom__tellus-input"
							placeholder={ content.customInputPlaceholderText }
							value={ custom ? primaryCategory : '' }
						/>
					</div>
				</Animate>
				<NavCardButton text={ content.buttonText } />
				<NeedHelpTag />
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepPrimarySetup;
