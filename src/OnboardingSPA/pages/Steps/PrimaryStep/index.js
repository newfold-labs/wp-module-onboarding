import CommonLayout from '../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../components/NewfoldLargeCard';
import { VIEW_NAV_PRIMARY } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import CardHeader from '../../../components/CardHeader';
import Button from '../../../components/Button';
import GenericHtml from "../../../components/GenericHtml";
import content from './content.json';


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
              heading={content.cardHeading} 
              subHeading={content.subHeading}
              question={content.question}
              />
          </div>
          <div className="nfd-card-button-wrapper">
            <Button text={content.buttonText} handleClick={handleClick}/>
          </div>

          <GenericHtml content={content.needHelpText}/>
      </NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepPrimarySetup;
