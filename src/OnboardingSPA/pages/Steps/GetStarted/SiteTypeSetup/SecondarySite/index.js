import { __ } from '@wordpress/i18n';
import CommonLayout from '../../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../../components/NewfoldLargeCard';
import { VIEW_NAV_PRIMARY } from '../../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import CardHeader from '../../../../../components/CardHeader';
import NavCardButton from '../../../../../components/Button/NavCardButton';
import GenericHtml from "../../../../../components/GenericHtml";
import content from '../content.json';


const StepPrimarySetup = () => {
  const { setDrawerActiveView } = useDispatch(nfdOnboardingStore);

  useEffect(() => {
    setDrawerActiveView(VIEW_NAV_PRIMARY);
  }, []);

  const [clickedIndex, changeCategory] = useState(-1);

  const handleCategoryClick = (idxOfElm) => {
    changeCategory(idxOfElm);
  }

  const handleClick = (e) => {
      console.log("Button Click to be handled here");
  }

  var [currentElm, changeClickedElm] = useState(0);
  const categoriesArray = content.categories;

  const leftBtnClick = () => {
    if(currentElm === 0) changeClickedElm(categoriesArray.length - 1)
    else changeClickedElm(currentElm - 1);
  }

  const rightBtnClick = () => {
    if(currentElm === categoriesArray.length-1) changeClickedElm(0)
    else changeClickedElm(currentElm + 1);
  }
  
  return (
    <CommonLayout isBgPrimary isCentered>
      <NewfoldLargeCard>
          <div className="nfd-card-heading center">
            <CardHeader 
              heading={__(content.cardHeading, 'wp-module-onboarding')} 
              subHeading={__(content.subHeading, 'wp-module-onboarding')}
              question={__(content.question, 'wp-module-onboarding')}
              />
          </div>

          <div className='nfd-setup-secondary-categories'>
            <div className='nfd-card-category-wrapper'>
              <span className='iconSiteType' 
                    style={{ backgroundImage: 'var(--chevron-left-icon)' }} 
                    onClick={()=> leftBtnClick()}
              />

              <div className="category-scrolling-wrapper">
                <span className="icon" style={{backgroundImage: categoriesArray[currentElm].icon}}/>
                <p className="categName"> {categoriesArray[currentElm].name}</p>
              </div>
              <span className='iconSiteType' 
                    style={{ backgroundImage: 'var(--chevron-right-icon)' }} 
                    onClick={()=> rightBtnClick()}
              />
            </div>

            <div className='subCategoriesSection'>
            {
              categoriesArray[currentElm]?.subCategories?.map((item,idx) => {
                return <span 
                          onClick={(e) => handleCategoryClick(idx)} 
                          className={`${(clickedIndex === idx) ? 'chosenPrimaryCategory ' : ''}nfd-card-category`}>
                            {item}
                        </span> 
              })
            }
            </div>
          </div>

          <p className='blackText'>or tell us here:</p>
          <input type="text" className='tellUsInput'/>
          
          <NavCardButton
            text={__(content.buttonText)}
          />

          <GenericHtml content={__(content.needHelpText, 'wp-module-onboarding')}/>
      </NewfoldLargeCard>
    </CommonLayout>
  );
};

export default StepPrimarySetup;

