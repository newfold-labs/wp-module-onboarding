import { __, sprintf } from '@wordpress/i18n';
import CommonLayout from '../../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../../components/NewfoldLargeCard';
import {
	SIDEBAR_LEARN_MORE,
	VIEW_NAV_GET_STARTED,
} from '../../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../../store';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import CardHeader from '../../../../../components/CardHeader';
import NavCardButton from '../../../../../components/Button/NavCardButton';
import NeedHelpTag from '../../../../../components/NeedHelpTag';
import content from '../content.json';
import { translations } from '../../../../../utils/locales/translations';
import Animate from '../../../../../components/Animate';
import { getSiteClassifications } from '../../../../../utils/api/site-classifications';

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

		// getSiteClassificationsData();
		changePrimaryType( currentData?.data?.siteType?.primary );
		changeSecondaryType( currentData?.data?.siteType?.secondary ?? "" );

		if(currentData?.data?.siteType?.label === 'custom'){
			changePrimaryType(defaultPrimaryType);
			changeSecondaryType("");
			changeInputCateg( currentData?.data?.siteType?.secondary );
		}
	}, [] );

	const defaultPrimaryType = "business";
	const [ primaryType, changePrimaryType ] = useState( defaultPrimaryType );
	const [ secondaryType, changeSecondaryType ] = useState( "" );
	const [ inputCategVal, changeInputCateg ] = useState( '' );

	const { currentStep, currentData } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	const selectedCategoryInStore = currentData?.data?.siteType?.secondary;
	const primaryCategoryData = content.categories.types[ primaryType ];
	const subCategories = primaryCategoryData?.secondaryTypes;

	/**
	 * Function which saves data in redux when category name is put-in via input box
	 *
	 * @param  input
	 */
	const getSiteClassificationsData = async ( ) => {
		const siteClassificationsData = await getSiteClassifications();
		console.log(siteClassificationsData);
	};

	/**
	 * Function which saves data in redux when category name is put-in via input box
	 *
	 * @param  input
	 */
	const categoryInput = ( input ) => {
		changeSecondaryType( "" );
		changeInputCateg( input?.target?.value );
		const currentDataCopy = currentData;
		currentDataCopy.data.siteType.secondary = input?.target?.value;
		setCurrentOnboardingData( currentDataCopy );
	};

	/**
	 * Function which saves data in redux when category name is chosen via categories displayed
	 *
	 * @param  idxOfElm
	 */
	const handleCategoryClick = ( secType ) => {
		changeSecondaryType( secType );
		changeInputCateg( '' );
		const currentDataCopy = currentData;
		currentDataCopy.data.siteType.secondary = secType;
		setCurrentOnboardingData( currentDataCopy );
	};

	const secondarySiteTypeChips = () => {
		let secondaryChipList = [];
		
		let types = content?.categories?.types[primaryType]?.secondaryTypes;
		for ( let typeKey in types ) {
			secondaryChipList.push(
				<div
					key={ types[typeKey]?.slug }
					className={ `${
						types[typeKey].slug === secondaryType
							? 'chosenSecondaryCategory '
							: ''
					}nfd-card-sec-category` }
					onClick={ ( e ) =>
						handleCategoryClick( types[typeKey].slug )
					}
				>
					<span className="categName">
						{ types[typeKey]?.label }
					</span>
				</div>
			)
		}

		return secondaryChipList;
	}


	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className="nfd-card-heading center">
					<CardHeader
						heading={ __(
							currentStep?.heading,
							'wp-module-onboarding'
						) }
						subHeading={ sprintf(
							__( content.subHeading, 'wp-module-onboarding' ),
							translations( 'SITE' )
						) }
						question={ __(
							currentStep?.subheading,
							'wp-module-onboarding'
						) }
					/>
				</div>
				<Animate
					type="fade-in-disabled"
					after={
						primaryCategoryData?.secondaryTypes &&
						selectedCategoryInStore !== null
					}
				>
					<div className="nfd-setup-secondary-categories">
						<div className="nfd-card-sec-category-wrapper">
							<div className="category-scrolling-wrapper">
								<div className="category-scrolling-wrapper_left-btn">
									<span className="category-scrolling-wrapper_left-btn-icon" 
										onClick={()=> {}}
										style={{ backgroundImage: "var(--chevron-left-icon)" }} />
								</div>
								<div className="category-scrolling-wrapper_type">
									<span
										className="category-scrolling-wrapper_type-icon"
										style={ {
											backgroundImage:
												`url(${primaryCategoryData?.icon})`
										} }
									/>
									<p className="category-scrolling-wrapper_type-text"> {primaryCategoryData.label}</p>
								</div>
								<div className="category-scrolling-wrapper_right-btn">
								<span className="category-scrolling-wrapper_right-btn-icon"
									onClick={()=> {}}
									style={{ backgroundImage: "var(--chevron-right-icon)" }} />
								</div>
							</div>
						</div>

						<div className="subCategoriesSection">
							{ secondarySiteTypeChips() }
						</div>
					</div>

					<div className="nfd-setup-primary-second">
						<div className="nfd-setup-primary-second-top">
							<div className="tellus-text">
								{ __(
									content.tellusHereText,
									'wp-module-onboarding'
								) }
							</div>
							<input
								type="text"
								onChange={ ( e ) => categoryInput( e ) }
								className="tellus-input"
								placeholder={ sprintf(
									__(
										content.placeholderSiteTypeInput,
										'wp-module-onboarding'
									),
									translations( 'site' )
								) }
								value={ inputCategVal }
							/>
						</div>
					</div>
				</Animate>
				<NavCardButton
					text={ __( content.buttonText ) }
					disabled={ primaryCategoryData[ 0 ]?.subCategories === null }
				/>
				<NeedHelpTag />
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepPrimarySetup;
