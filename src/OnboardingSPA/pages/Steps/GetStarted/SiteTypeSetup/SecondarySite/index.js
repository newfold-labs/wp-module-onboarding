import { __ } from '@wordpress/i18n';
import CommonLayout from '../../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../../components/NewfoldLargeCard';
import { VIEW_NAV_PRIMARY } from '../../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../../store';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import CardHeader from '../../../../../components/CardHeader';
import NavCardButton from '../../../../../components/Button/NavCardButton';
import NeedHelpTag from '../../../../../components/NeedHelpTag';
import content from '../content.json';


const StepPrimarySetup = () => {
  const { setDrawerActiveView, setIsSidebarOpened, setIsDrawerSuppressed } = useDispatch(
		nfdOnboardingStore
	);

	useEffect( () => {
		setIsSidebarOpened( false );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_NAV_PRIMARY );
	}, [] );

  const [clickedIndex, changeCategory] = useState(-1);
  const [inputCategVal, changeInputCateg] = useState('');


  const { setCurrentOnboardingData } = useDispatch(nfdOnboardingStore);

  const { currentData } = useSelect((select) => {
    return {
        currentData: select(nfdOnboardingStore).getCurrentOnboardingData()
    };
  }, []);

  const selectedCategoryInStore = currentData?.data?.siteType?.secondary;
  const categoriesArray = content.categories;

  /** Function which saves data in redux when category name is put-in via input box */
  const categoryInput = input => {
    changeCategory(-1);
    changeInputCateg(input?.target?.value);
    const currentDataCopy = currentData;
    currentDataCopy.data.siteType['secondary'] = inputCategVal;
    setCurrentOnboardingData(currentDataCopy);
  }

  /** Function which saves data in redux when category name is chosen via categories displayed */
  const handleCategoryClick = (idxOfElm) => {
    changeCategory(idxOfElm);
    changeInputCateg('');
    const currentDataCopy = currentData;
    currentDataCopy.data.siteType['secondary'] = categoriesArray[0]?.subCategories[idxOfElm];
    setCurrentOnboardingData(currentDataCopy);
  }
  
  return (
    <CommonLayout isBgPrimary isCentered>
      <NewfoldLargeCard className={'site-type-card'}>
          <div className="nfd-card-heading center">
            <CardHeader 
              heading={__(content.cardHeading, 'wp-module-onboarding')} 
              subHeading={__(content.subHeading, 'wp-module-onboarding')}
              question={__(content.question, 'wp-module-onboarding')}
              />
          </div>

          <div className='nfd-setup-secondary-categories'>
            <div className='nfd-card-category-wrapper'>
              <div className="category-scrolling-wrapper">
                <span className="icon" style={{backgroundImage: categoriesArray[0].icon}}/>
                <p className="categName"> {categoriesArray[0].name}</p>
              </div>
            </div>

            <div className='subCategoriesSection'>
            {
              categoriesArray[0]?.subCategories?.map((item,idx) => {
                return <span 
                          onClick={(e) => handleCategoryClick(idx)} 
                          className={`${(clickedIndex === idx || item === selectedCategoryInStore ) ? 'chosenSecondaryCategory ' : ''}nfd-card-category`}>
                            {item}
                        </span> 
              })
            }
            </div>
          </div>

          <p className='blackText'>{__(content.tellusHereText, 'wp-module-onboarding')}</p>
          <input 
            type="text" 
            onChange={(e) => categoryInput(e)} 
            className='tellUsInput' 
            placeholder={__(content.placeholderSiteTypeInput, 'wp-module-onboarding')}
            value={inputCategVal}
          />
          
          <NavCardButton
            text={__(content.buttonText)}
          />

          <NeedHelpTag />
      </NewfoldLargeCard>
    </CommonLayout>
  );
};

export default StepPrimarySetup;

