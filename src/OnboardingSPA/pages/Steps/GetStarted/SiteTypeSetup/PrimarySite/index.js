import { __, sprintf } from '@wordpress/i18n';
import CommonLayout from '../../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../../components/NewfoldLargeCard';
import {
	SIDEBAR_LEARN_MORE,
	VIEW_NAV_GET_STARTED,
} from '../../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import CardHeader from '../../../../../components/CardHeader';
import NavCardButton from '../../../../../components/Button/NavCardButton';
import NeedHelpTag from '../../../../../components/NeedHelpTag';
import content from '../content.json';
import { translations } from '../../../../../utils/locales/translations';
import Animate from '../../../../../components/Animate';

const StepPrimarySetup = () => {
	const {
		setDrawerActiveView,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
		setSidebarActiveView,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	const { currentStep, currentData } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerSuppressed( true );
		setDrawerActiveView( VIEW_NAV_GET_STARTED );
		setIsHeaderNavigationEnabled( true );
	}, [] );

	const [ clickedIndex, changeCategory ] = useState( -1 );
	const [ inputCategVal, changeInputCateg ] = useState( '' );

	const categoriesArray = content.categories;
	const selectedPrimaryCategoryInStore = currentData?.data?.siteType?.primary;

	/**This condition fills the data in input box if the saved category isn't a subcategory from the content*/
	if ( selectedPrimaryCategoryInStore && ! inputCategVal ) {
		const found = categoriesArray.find(
			( e ) => e.name === selectedPrimaryCategoryInStore
		);
		if ( ! found && selectedPrimaryCategoryInStore !== 'primaryCategory' )
			changeInputCateg( selectedPrimaryCategoryInStore );
	}

	const handleCategoryClick = ( idxOfElm ) => {
		changeCategory( idxOfElm );
		changeInputCateg( '' );
		const currentDataCopy = currentData;
		currentDataCopy.data.siteType.primary =
			content.categories[ idxOfElm ]?.name;
		setCurrentOnboardingData( currentDataCopy );
	};

	/**
	 * Function which saves data in redux when category name is put-in via input box
	 *
	 * @param  input
	 */
	const categoryInput = ( input ) => {
		changeCategory( -1 );
		changeInputCateg( input?.target?.value );
		const currentDataCopy = currentData;
		currentDataCopy.data.siteType.primary = input?.target?.value;
		setCurrentOnboardingData( currentDataCopy );
	};

	const primarySiteTypeChips = () => {
		let primaryChipList = [];
		
		let types = content?.categories?.types;
		for ( let typeKey in types ) {
			primaryChipList.push(
				<div
					key={ types[typeKey]?.slug }
					className={ `${
						types[typeKey].slug ===
							selectedPrimaryCategoryInStore
							? 'chosenPrimaryCategory '
							: ''
					}nfd-card-category` }
					onClick={ ( e ) =>
						handleCategoryClick( idx )
					}
				>
					<div className="nfd-card-category-wrapper">
						<span
							className="nfd-card-category-wrapper-icon"
							style={ {
								backgroundImage:
									`url(${types[typeKey]?.icon})`
							} }
						></span>
						<span className="categName">
							{ types[typeKey]?.label }
						</span>
					</div>
				</div>
			)
		}

		return primaryChipList;
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
						content.categories &&
						selectedPrimaryCategoryInStore !== null
					}
				>
					<div style={{backgroundColor: 'red'}}>
						<image src="https://cdn.hiive.space/site-classification/business.svg" height={24} width={24}/>
					</div>
					<div className="nfd-setup-primary-categories">
						{ primarySiteTypeChips() }
					</div>
					<div className="nfd-setup-primary-second">
						<div className="nfd-setup-primary-second-top">
							<p className="blackText">or tell us here:</p>
							<input
								type="search"
								onChange={ ( e ) => categoryInput( e ) }
								className="tellUsInput"
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
					disabled={ content.categories === null }
				/>
				<NeedHelpTag />
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepPrimarySetup;
