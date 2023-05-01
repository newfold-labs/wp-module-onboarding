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
import Animate from '../../../../../components/Animate';
import getContents from '../contents';

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
	}, [] );

	const [ clickedIndex, changeCategory ] = useState( -1 );
	const [ inputCategVal, changeInputCateg ] = useState( '' );

	const content = getContents();
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

	const categoryInput = ( input ) => {
		changeCategory( -1 );
		changeInputCateg( input?.target?.value );
		const currentDataCopy = currentData;
		currentDataCopy.data.siteType.primary = input?.target?.value;
		setCurrentOnboardingData( currentDataCopy );
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
				<Animate
					type="fade-in-disabled"
					after={
						content.categories &&
						selectedPrimaryCategoryInStore !== null
					}
				>
					<div className="nfd-setup-primary-categories">
						{ content.categories.map( ( item, idx ) => {
							return (
								<div
									key={ item?.name }
									tabIndex={ idx + 1 }
									role="button"
									className={ `${
										clickedIndex === idx ||
										item.name ===
											selectedPrimaryCategoryInStore
											? 'chosenPrimaryCategory '
											: ''
									}nfd-card-category` }
									onClick={ () => handleCategoryClick( idx ) }
									onKeyUp={ () => handleCategoryClick( idx ) }
								>
									<div className="nfd-card-category-wrapper">
										<span
											className="icon"
											style={ {
												backgroundImage:
													clickedIndex !== idx &&
													item.name !==
														selectedPrimaryCategoryInStore
														? item?.icon
														: item?.iconWhite,
											} }
										></span>
										<span className="categName">
											{ item?.name }
										</span>
									</div>
								</div>
							);
						} ) }
					</div>

					<div className="nfd-setup-primary-second">
						<div className="nfd-setup-primary-second-top">
							<p className="blackText">
								{ content.customInputLabel }
							</p>
							<input
								type="text"
								tabIndex={ content.categories.length + 1 }
								onChange={ ( e ) => categoryInput( e ) }
								className="tellUsInput"
								placeholder={
									content.customInputPlaceholderText
								}
								value={ inputCategVal }
							/>
						</div>
					</div>
				</Animate>
				<NavCardButton
					text={ content.buttonText }
					disabled={ content.categories === null }
				/>
				<NeedHelpTag />
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepPrimarySetup;
