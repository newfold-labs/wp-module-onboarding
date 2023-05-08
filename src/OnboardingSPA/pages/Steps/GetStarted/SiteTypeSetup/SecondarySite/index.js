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
	const [ siteClassification, setSiteClassification ] = useState();
	const [ primaryTypesList, setPrimaryTypeList ] = useState();
	const [ primaryCategory, setPrimaryCategory ] = useState();
	const [ secondaryCategory, setSecondaryCategory ] = useState( '' );
	const [ inputCategVal, changeInputCateg ] = useState( '' );

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
		setSiteClassification( siteClassificationData?.body );
		setPrimaryTypeList(
			Object.keys( siteClassificationData?.body?.types )
		);

		if ( currentData?.data?.siteType?.primary !== '' )
			setPrimaryCategory( currentData?.data?.siteType?.primary );
		setSecondaryCategory( currentData?.data?.siteType?.secondary ?? '' );

		if ( currentData?.data?.siteType?.labelPri === 'custom' ) {
			setPrimaryCategory( defaultPrimaryType );
			setSecondaryCategory( '' );
			changeInputCateg( currentData?.data?.siteType?.secondary );
		}

		if ( currentData?.data?.siteType?.labelSec === 'custom' ) {
			setPrimaryCategory( defaultPrimaryType );
			setSecondaryCategory( '' );
			changeInputCateg( currentData?.data?.siteType?.secondary );
		}
	};

	/**
	 * Function which saves data in redux when category name is put-in via input box
	 *
	 * @param {string} input
	 */
	const categoryInput = ( input ) => {
		setSecondaryCategory( '' );
		changeInputCateg( input?.target?.value );
		currentData.data.siteType.labelSec = 'custom';
		currentData.data.siteType.secondary = input?.target?.value;
		setCurrentOnboardingData( currentData );
	};

	/**
	 * Function which saves data in redux when category name is chosen via categories displayed
	 *
	 * @param {string} secType
	 */
	const handleCategoryClick = ( secType ) => {
		setSecondaryCategory( secType );
		changeInputCateg( '' );
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
		let idx = 0;
		const secondaryChipList = [];

		const types =
			siteClassification?.types[ primaryCategory ]?.secondaryTypes;
		for ( const typeKey in types ) {
			secondaryChipList.push(
				<div
					key={ types[ typeKey ]?.slug }
					role="button"
					tabIndex={ idx + 1 }
					className={ `${
						types[ typeKey ].slug === secondaryCategory
							? 'chosenSecondaryCategory '
							: ''
					}nfd-card-sec-category` }
					onClick={ () =>
						handleCategoryClick( types[ typeKey ].slug )
					}
					onKeyDown={ () =>
						handleCategoryClick( types[ typeKey ].slug )
					}
				>
					<span className="categName">
						{ types[ typeKey ]?.label }
					</span>
				</div>
			);
			idx++;
		}

		return secondaryChipList;
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
									<div className="category-scrolling-wrapper_left-btn">
										<span
											className="category-scrolling-wrapper_left-btn-icon"
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
									<div className="category-scrolling-wrapper_type">
										<span
											className="category-scrolling-wrapper_type-icon"
											style={ {
												backgroundImage: `url(${ siteClassification?.types[ primaryCategory ]?.icon })`,
											} }
										/>
										<p className="category-scrolling-wrapper_type-text">
											{ ' ' }
											{
												siteClassification?.types[
													primaryCategory
												]?.label
											}
										</p>
									</div>
									<div className="category-scrolling-wrapper_right-btn">
										<span
											className="category-scrolling-wrapper_right-btn-icon"
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
						<div className="nfd-setup-primary-second">
							<div className="nfd-setup-primary-second-top">
								<div className="tellus-text">
									{ contents.tellusHereText }
								</div>
								<input
									type="search"
									onChange={ ( e ) => categoryInput( e ) }
									className="tellus-input"
									placeholder={
										contents.placeholderSiteTypeInput
									}
									value={ inputCategVal }
								/>
							</div>
						</div>
					</div>
				</Animate>
				<NavCardButton
					text={ contents.buttonText }
					// disabled={ primaryCategoryData[ 0 ]?.subCategories === null }
				/>
				<NeedHelpTag />
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepPrimarySetup;
