import CommonLayout from '../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import CardHeader from '../../../../components/CardHeader';
import Button from '../../../../components/Button';
import GenericHtml from "../../../../components/GenericHtml";
import content from './content.json';
import { useNavigate } from 'react-router-dom';
import { RadioControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { VIEW_NAV_GET_STARTED } from '../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../store';
import { useDispatch } from '@wordpress/data';
import { getFlow, setFlow } from '../../../../utils/api/flow';

/**
 * Start Setup: WordPress Experience Comfort Level.
 *
 * @returns
 */

const StartSetupExperience = () => {
	const navigate = useNavigate();
    const [isLoaded, setisLoaded] = useState(false);
    const [wpComfortLevel, setWpComfortLevel] = useState(5);

	const { setDrawerActiveView, setIsDrawerOpened } =
		useDispatch(nfdOnboardingStore);

	useEffect(() => {
		setIsDrawerOpened(true);
		setDrawerActiveView(VIEW_NAV_GET_STARTED);
	}, []);

    function createSaveData() {
        const dataToSave = {
            "data": {
                "wpComfortLevel": wpComfortLevel,
            }
        }
        return dataToSave;
    }
	
	useEffect(() => {
		async function getFlowData() {
			const data = await getFlow();
			setWpComfortLevel(data?.body?.data['wpComfortLevel']);
			setisLoaded(true);
		}
		if (!isLoaded) {
			getFlowData();
		}
	}, [isLoaded]);


    const handleClick = () => {
        navigate('/wp-setup/step/top-priority');
    }

	useEffect(() => {
        const saveData = async () => {
            const result = await setFlow(createSaveData());
        };
		if(isLoaded)
			saveData();
    }, [wpComfortLevel]);
 
    return (    
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className='nfd-onboarding-experience-step'>
					<div className="nfd-card-heading center">
						<CardHeader 
						heading={content.cardHeading} 
						subHeading={content.subHeading}
						question={content.question}
						/>
					</div>
					<RadioControl className='nfd-onboarding-experience-step-tabs components-radio-control__input'
					selected={ wpComfortLevel } 
					options={ [
						{ label: content.label1, value: '1' },
						{ label: content.label2, value: '3' },
						{ label: content.label3, value: '5' }
					] }
					onChange={ ( value ) => setWpComfortLevel( value ) }
					/>
					<div className="nfd-steps-card-large-button">
						<Button text={content.buttonText} disabled={wpComfortLevel =='0'} handleClick={handleClick}/>
					</div>
					<GenericHtml content={content.needHelpText}/> 
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
    );
};

export default StartSetupExperience;
