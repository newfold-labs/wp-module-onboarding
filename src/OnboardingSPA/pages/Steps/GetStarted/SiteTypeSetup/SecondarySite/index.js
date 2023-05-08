import CommonLayout from '../../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../../components/NewfoldLargeCard';
import {
	SIDEBAR_LEARN_MORE,
	VIEW_NAV_GET_STARTED,
} from '../../../../../../constants';
import getContents from '../contents';
import { store as nfdOnboardingStore } from '../../../../../store';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import CardHeader from '../../../../../components/CardHeader';
import NavCardButton from '../../../../../components/Button/NavCardButton';
import NeedHelpTag from '../../../../../components/NeedHelpTag';
import Animate from '../../../../../components/Animate';
import { getSiteClassification } from '../../../../../utils/api/siteClassification';

const StepPrimarySetup = () => {
	const {
		setDrawerActiveView,
		setSidebarActiveView,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerSuppressed( true );
		setDrawerActiveView( VIEW_NAV_GET_STARTED );
		setIsHeaderNavigationEnabled( true );
		getSiteClassificationData();
	}, [] );

	const contents = getContents();
	const [ custom, setCustom ] = useState( false );
	const [ siteClassification, setSiteClassification ] = useState();
	const [ primaryTypesList, setPrimaryTypeList ] = useState();
	const [ primaryCategory, setPrimaryCategory ] = useState();
	const [ secondaryCategory, setSecondaryCategory ] = useState( '' );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	/**
	 * Function which fetches the Site Classifications
	 *
	 */
	const getSiteClassificationData = async () => {
		const siteClassificationData = await getSiteClassification();

		const defaultPrimaryType = Object.keys(
			siteClassificationData?.body?.types
		)[ 0 ];

		setPrimaryCategory( defaultPrimaryType );
		setSiteClassification( siteClassificationData?.body );
		setPrimaryTypeList(
			Object.keys( siteClassificationData?.body?.types )
		);

		setSecondaryCategory( currentData?.data?.siteType?.secondary ?? '' );
		if ( currentData?.data?.siteType?.primary !== '' ) {
			const types =
				siteClassificationData?.body?.types[
					currentData?.data?.siteType?.primary
				]?.secondaryTypes;
			if ( types ) {
				setPrimaryCategory( currentData?.data?.siteType?.primary );
			} else {
				setPrimaryCategory( defaultPrimaryType );
				categoryInput( currentData?.data?.siteType?.secondary );
			}
		}

		if ( currentData?.data?.siteType?.labelSec === 'custom' ) {
			categoryInput( currentData?.data?.siteType?.secondary );
		}
	};

	/**
	 * Function which saves data in redux when category name is put-in via input box
	 *
	 * @param {string} value
	 */
	const categoryInput = ( value ) => {
		setCustom( true );
		setSecondaryCategory( value );
		currentData.data.siteType.labelSec = 'custom';
		currentData.data.siteType.secondary = value;
		setCurrentOnboardingData( currentData );
	};

	/**
	 * Function which saves data in redux when category name is chosen via categories displayed
	 *
	 * @param {string} secType
	 */
	const handleCategoryClick = ( secType ) => {
		setCustom( false );
		setSecondaryCategory( secType );
		currentData.data.siteType.labelPri = '';
		currentData.data.siteType.labelSec = '';
		currentData.data.siteType.primary = primaryCategory;
		currentData.data.siteType.secondary = secType;
		setCurrentOnboardingData( currentData );
	};

	const changePrimaryPrev = () => {
		const idx = primaryTypesList.findIndex(
			( val ) => primaryCategory === val
		);

		if ( idx === 0 )
			setPrimaryCategory(
				primaryTypesList[ primaryTypesList.length - 1 ]
			);
		else setPrimaryCategory( primaryTypesList[ idx - 1 ] );
	};

	const changePrimaryNext = () => {
		const idx = primaryTypesList.findIndex(
			( val ) => primaryCategory === val
		);

		if ( idx === primaryTypesList.length - 1 )
			setPrimaryCategory( primaryTypesList[ 0 ] );
		else setPrimaryCategory( primaryTypesList[ idx + 1 ] );
	};

	const secondarySiteTypeChips = () => {
		const types =
			siteClassification?.types[ primaryCategory ]?.secondaryTypes;
		return Object.keys( types ).map( ( type, idx ) => {
			return (
				<div
					key={ types[ type ]?.slug }
					role="button"
					tabIndex={ idx + 1 }
					className={ `${
						types[ type ].slug === secondaryCategory && ! custom
							? 'chosenSecondaryCategory '
							: ''
					}nfd-card-sec-category` }
					onClick={ () => handleCategoryClick( types[ type ].slug ) }
					onKeyDown={ () =>
						handleCategoryClick( types[ type ].slug )
					}
				>
					<span className="categName">{ types[ type ]?.label }</span>
				</div>
			);
		} );
	};

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className="nfd-card-heading center">
					<CardHeader
						heading={ contents?.cardHeading }
						subHeading={ contents.subHeading }
						question={ contents?.question }
					/>
				</div>
				<Animate type="fade-in-disabled" after={ siteClassification }>
					<div className="nfd-setup-secondary-categories">
						<div className="nfd-card-sec-category-wrapper">
							{ siteClassification && (
								<div className="category-scrolling-wrapper">
									<div className="category-scrolling-wrapper__left-btn">
										<span
											className="category-scrolling-wrapper__left-btn-icon"
											onClick={ changePrimaryPrev }
											onKeyUp={ changePrimaryPrev }
											role="button"
											tabIndex={ 0 }
											style={ {
												backgroundImage:
													'var(--chevron-left-icon)',
											} }
										/>
									</div>
									<div className="category-scrolling-wrapper__type">
										<span
											className="category-scrolling-wrapper__type-icon"
											style={ {
												backgroundImage: `url(${ siteClassification?.types[ primaryCategory ]?.icon })`,
											} }
										/>
										<p className="category-scrolling-wrapper__type-text">
											{ ' ' }
											{
												siteClassification?.types[
													primaryCategory
												]?.label
											}
										</p>
									</div>
									<div className="category-scrolling-wrapper__right-btn">
										<span
											className="category-scrolling-wrapper__right-btn-icon"
											onClick={ changePrimaryNext }
											onKeyUp={ changePrimaryNext }
											role="button"
											tabIndex={ 0 }
											style={ {
												backgroundImage:
													'var(--chevron-right-icon)',
											} }
										/>
									</div>
								</div>
							) }
						</div>
						<div className="subCategoriesSection">
							{ siteClassification && secondarySiteTypeChips() }
						</div>
						<div className="nfd-setup-primary-custom">
							<div className="nfd-setup-primary-custom__tellus-text">
								{ contents.tellusHereText }
							</div>
							<input
								type="search"
								onChange={ ( e ) =>
									categoryInput( e?.target?.value )
								}
								className="nfd-setup-primary-custom__tellus-input"
								placeholder={
									contents.placeholderSiteTypeInput
								}
								value={ custom ? secondaryCategory : '' }
							/>
						</div>
					</div>
				</Animate>
				<NavCardButton text={ contents.buttonText } />
				<NeedHelpTag />
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepPrimarySetup;
