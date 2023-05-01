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
import Animate from '../../../../../components/Animate';
import getContents from '../contents';

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

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	const content = getContents();
	const selectedCategoryInStore = currentData?.data?.siteType?.secondary;
	const categoriesArray = content.categories;
	const subCategories = categoriesArray[ 0 ]?.subCategories;

	if (
		selectedCategoryInStore &&
		! inputCategVal &&
		subCategories.indexOf( selectedCategoryInStore ) === -1
	) {
		if ( selectedCategoryInStore !== 'secondaryCategory' )
			changeInputCateg( selectedCategoryInStore );
	}

	const categoryInput = ( input ) => {
		changeCategory( -1 );
		changeInputCateg( input?.target?.value );
		const currentDataCopy = currentData;
		currentDataCopy.data.siteType.secondary = input?.target?.value;
		setCurrentOnboardingData( currentDataCopy );
	};

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
						heading={ content.heading }
						subHeading={ content.subheading }
						question={ content.question }
					/>
				</div>
				<Animate
					type="fade-in-disabled"
					after={
						categoriesArray[ 0 ]?.subCategories &&
						selectedCategoryInStore !== null
					}
				>
					<div className="nfd-setup-secondary-categories">
						<div className="nfd-card-category-wrapper">
							<div className="category-scrolling-wrapper">
								<span
									className="icon"
									style={ {
										backgroundImage:
											categoriesArray[ 0 ].icon,
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
											tabIndex={ idx + 1 }
											role="button"
											onClick={ () =>
												handleCategoryClick( idx )
											}
											onKeyUp={ () =>
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
								{ content.customInputLabel }
							</div>
							<input
								type="text"
								tabIndex={
									categoriesArray[ 0 ].subCategories.length +
									1
								}
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
					disabled={ categoriesArray[ 0 ]?.subCategories === null }
				/>
				<NeedHelpTag />
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepPrimarySetup;
