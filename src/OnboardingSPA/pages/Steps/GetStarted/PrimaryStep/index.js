import { __ } from '@wordpress/i18n';
import CommonLayout from '../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import { VIEW_NAV_PRIMARY } from '../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../store';
import { useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import CardHeader from '../../../../components/CardHeader';
import NavCardButton from '../../../../components/Button/NavCardButton';
import GenericHtml from "../../../../components/GenericHtml";
import content from './content.json';
// import { Icon } from '@wordpress/icons/build-types';


const StepPrimarySetup = () => {
  const { setDrawerActiveView } = useDispatch(nfdOnboardingStore);

  useEffect(() => {
    setDrawerActiveView(VIEW_NAV_PRIMARY);
  }, []);

  const [clicked, changeCategory] = useState(-1);

    // const handleClick = (e) => {
    //     console.log("Button Click to be handled here");
    // }

  const handleCategoryClick = (e, idxOfElm, ee) => {
    const elm = e.currentTarget;
    changeCategory(idxOfElm);
    console.log(elm);
    // elm[0].addClass("nownownowno")
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

          <div className='nfd-setup-categories'>
            {
              content.primaryCategories.map((item, idx) => {
                return (
                  <>
                    <div className={`${(clicked === idx) ? 'chosenPrimaryCategory ' : ''}nfd-card-category`} onClick={(e) => handleCategoryClick(e, idx, item)}>
                      <div className='nfd-card-category-wrapper'>
                        <span className="icon" style={{backgroundImage: (clicked !== idx) ? item.icon : item.iconWhite}}></span>
                        <span className="categName">{item.name}</span>
                      </div>
                    </div>
                  </>
                )
              })
            }
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

