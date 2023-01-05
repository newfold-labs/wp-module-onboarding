import { __ } from '@wordpress/i18n';
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
	}, [] );

	const [ clickedIndex, changeCategory ] = useState( -1 );
	const [ inputCategVal, changeInputCateg ] = useState( '' );

	const { currentStep, currentData } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	const selectedCategoryInStore = currentData?.data?.siteType?.secondary;
	const categoriesArray = content.categories;
	const subCategories = categoriesArray[ 0 ]?.subCategories;

	/**This condition fills the data in input box if the saved category isn't a subcategory from the content*/
	if (
		selectedCategoryInStore &&
		! inputCategVal &&
		subCategories.indexOf( selectedCategoryInStore ) === -1
	) {
		if ( selectedCategoryInStore !== 'secondaryCategory' )
			changeInputCateg( selectedCategoryInStore );
	}

	/**
	 * Function which saves data in redux when category name is put-in via input box
	 *
	 * @param  input
	 */
	const categoryInput = ( input ) => {
		changeCategory( -1 );
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
	const handleCategoryClick = ( idxOfElm ) => {
		changeCategory( idxOfElm );
		changeInputCateg( '' );
		const currentDataCopy = currentData;
		currentDataCopy.data.siteType.secondary =
			categoriesArray[ 0 ]?.subCategories[ idxOfElm ];
		setCurrentOnboardingData( currentDataCopy );
	};

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

				<div className="nfd-setup-secondary-categories">
					<div className="nfd-card-category-wrapper">
						<div className="category-scrolling-wrapper">
							<span
								className="icon"
								style={ {
									backgroundImage: categoriesArray[ 0 ].icon,
								} }
							/>
							<p className="categName">
								{ ' ' }
								{ categoriesArray[ 0 ].name }
							</p>
						</div>
					</div>

					<div className="subCategoriesSection">
						{ categoriesArray[ 0 ]?.subCategories?.map(
							( item, idx ) => {
								return (
									<span
										key={ item }
										onClick={ ( e ) =>
											handleCategoryClick( idx )
										}
										className={ `${
											clickedIndex === idx ||
											item === selectedCategoryInStore
												? 'chosenSecondaryCategory '
												: ''
										}nfd-card-category` }
									>
										{ item }
									</span>
								);
							}
						) }
					</div>
				</div>

				<div className="nfd-setup-primary-second">
					<div className="nfd-setup-primary-second-top">
						<div className="blackText">
							{ __(
								content.tellusHereText,
								'wp-module-onboarding'
							) }
						</div>
						<input
							type="text"
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
				<NavCardButton text={ __( content.buttonText ) } />
				<NeedHelpTag />
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepPrimarySetup;
