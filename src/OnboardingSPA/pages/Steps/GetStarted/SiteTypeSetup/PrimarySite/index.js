import { __ } from '@wordpress/i18n';
import CommonLayout from '../../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../../components/NewfoldLargeCard';
import { VIEW_NAV_PRIMARY } from '../../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../../store';
import { useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
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

  const handleCategoryClick = (idxOfElm) => {
    changeCategory(idxOfElm);
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

          <div className='nfd-setup-primary-categories'>
            {
              content.categories.map((item, idx) => {
                return (
                  <>
                    <div className={`${(clickedIndex === idx) ? 'chosenPrimaryCategory ' : ''}nfd-card-category`} onClick={(e) => handleCategoryClick(idx)}>
                      <div className='nfd-card-category-wrapper'>
                        <span className="icon" style={{backgroundImage: (clickedIndex !== idx) ? item.icon : item.iconWhite}}></span>
                        <span className="categName">{item.name}</span>
                      </div>
                    </div>
                  </>
                )
              })
            }
          </div>

          <p className='blackText'>or tell us here:</p>
          <input type="text" className='tellUsInput' placeholder='Enter to search your site type'/>
          
          <NavCardButton
            text={__(content.buttonText)}
          />

          <NeedHelpTag />
      </NewfoldLargeCard>
    </CommonLayout>
  );
};

export default StepPrimarySetup;

