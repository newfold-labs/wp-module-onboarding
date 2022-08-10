import { __ } from '@wordpress/i18n';
import CommonLayout from '../../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../../components/NewfoldLargeCard';
import { VIEW_NAV_GET_STARTED } from '../../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import CardHeader from '../../../../../components/CardHeader';
import NavCardButton from '../../../../../components/Button/NavCardButton';
import NeedHelpTag from '../../../../../components/NeedHelpTag';
import content from '../content.json';


const StepPrimarySetup = () => {

	const { setDrawerActiveView, setIsSidebarOpened, setIsDrawerSuppressed } = useDispatch(
		nfdOnboardingStore
	);

	const { currentStep, currentData } = useSelect(
		(select) => {
			return {
				currentStep: select(nfdOnboardingStore).getCurrentStep(),
				currentData: select(nfdOnboardingStore).getCurrentOnboardingData()
			};
		},
		[]
	);

	useEffect(() => {
		setIsSidebarOpened(false);
		setIsDrawerSuppressed(true);
		setDrawerActiveView(VIEW_NAV_GET_STARTED);
	}, []);

	const [clickedIndex, changeCategory] = useState(-1);
	const [inputCategVal, changeInputCateg] = useState('');
	const { setCurrentOnboardingData } = useDispatch(nfdOnboardingStore);
	
	const categoriesArray = content.categories;
	const selectedPrimaryCategoryInStore = currentData?.data?.siteType?.primary;

	/**This condition fills the data in input box if the saved category isn't a subcategory from the content*/
	if (selectedPrimaryCategoryInStore && !inputCategVal) {

		var found = categoriesArray.find(e => e.name === selectedPrimaryCategoryInStore);
		if (!found)
			changeInputCateg(selectedPrimaryCategoryInStore);
	}

	const handleCategoryClick = (idxOfElm) => {
		changeCategory(idxOfElm);
		changeInputCateg('');
		const currentDataCopy = currentData;
		currentDataCopy.data.siteType['primary'] = content.categories[idxOfElm]?.name;
		setCurrentOnboardingData(currentDataCopy);
	}

	/** Function which saves data in redux when category name is put-in via input box */
	const categoryInput = input => {
		changeCategory(-1);
		changeInputCateg(input?.target?.value);
		const currentDataCopy = currentData;
		currentDataCopy.data.siteType['primary'] = input?.target?.value;
		setCurrentOnboardingData(currentDataCopy);
	}

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className="nfd-card-heading center">
					<CardHeader
						heading={__(currentStep?.heading, 'wp-module-onboarding')}
						subHeading={__(content.subHeading, 'wp-module-onboarding')}
						question={__(currentStep?.subheading, 'wp-module-onboarding')}
					/>
				</div>

				<div className='nfd-setup-primary-categories'>
					{
						content.categories.map((item, idx) => {
							return (
								<div 
									key={item?.name} 
									className={`${(clickedIndex === idx || item.name === selectedPrimaryCategoryInStore) ? 'chosenPrimaryCategory ' : ''}nfd-card-category`} 
									onClick={(e) => handleCategoryClick(idx)} >
									<div className='nfd-card-category-wrapper'>
										<span className="icon" style={{ backgroundImage: (clickedIndex !== idx && item.name !== selectedPrimaryCategoryInStore) ? 
                      item?.icon : item?.iconWhite }}></span>
										<span className="categName">{item?.name}</span>
									</div>
								</div>
							)
						})
					}
				</div>

				<div className='nfd-setup-primary-second'>
					<div className='nfd-setup-primary-second-top'>
						<p className='blackText'>or tell us here:</p>
						<input type="text" 
							onChange={(e) => categoryInput(e)} 
							className='tellUsInput' 
							placeholder='Enter to search your site type'
							value={inputCategVal} />
					</div>
					<div className='nfd-setup-primary-second-bottom'>
						<NavCardButton text={__(content.buttonText)} />
						<NeedHelpTag />
					</div>
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepPrimarySetup;

