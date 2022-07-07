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
    const [flowData, setFlowData] = useState();
    const [isLoaded, setisLoaded] = useState(false);
    // const [debouncedFlowData, setDebouncedFlowData] = useState();
    const [wpComfortLevel, setWpComfortLevel] = useState(5);

	const { setDrawerActiveView, setIsDrawerOpened } =
		useDispatch(nfdOnboardingStore);

	useEffect(() => {
		setIsDrawerOpened(true);
		setDrawerActiveView(VIEW_NAV_GET_STARTED);
	}, []);

	function setDefaultData() {
		console.log(flowData?.body);
        if(isLoaded) {
			console.log('isLoaded');
			console.log(flowData?.body?.data['wpComfortLevel']);
            setWpComfortLevel(flowData?.body?.data['wpComfortLevel']);
        }
    }

    function createSaveData() {
        const dataToSave = {
            "data": {
                "wpComfortLevel": wpComfortLevel,
            }
        }
		// console.log(dataToSave);
        return dataToSave;
    }
	
	useEffect(() => {
		async function getFlowData() {
			const data = await getFlow();
			// setWpComfortLevel();
			setFlowData(data);
			setisLoaded(true);
			console.log(flowData?.body?.data);
		}
		if (!isLoaded) {
			getFlowData();
		setDefaultData();
		}
	}, [wpComfortLevel]);


    const handleClick = () => {
        navigate('/wp-setup/step/top-priority');
    }

	useEffect(() => {
        const saveData = async () => {
            const result = await setFlow(createSaveData());
            setFlowData(result);
			setisLoaded(true);
			console.log(result);
        };
        if (isLoaded) saveData();
    }, [wpComfortLevel]);
 
	// console.log(wpComfortLevel);

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
						<Button text={content.buttonText} disabled={!wpComfortLevel} handleClick={handleClick}/>
					</div>
					<GenericHtml content={content.needHelpText}/> 
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
    );
};

export default StartSetupExperience;
