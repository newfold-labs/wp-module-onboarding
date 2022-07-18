import { __ } from '@wordpress/i18n';
import CommonLayout from '../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import { VIEW_NAV_PRIMARY } from '../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
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

    const handleClick = (e) => {
        console.log("Button Click to be handled here");
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
              content.primaryCategories.map(item => {
                console.log(item);
                return (
                  <>
                    {/* <Icon icon={item.icon} /> */}
                    
                    <div className='nfd-card-category-label'>
                      <span style={{backgroundImage: 'var(--more-icon)'}}></span>
                      <img src={item.icon}/>
                      <span>{item.name}</span>
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

