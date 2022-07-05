import CommonLayout from '../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { RadioControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import CardHeader from '../../../../components/CardHeader';
import Button from '../../../../components/Button';
import GenericHtml from "../../../../components/GenericHtml";
import content from './content.json';


const StartSetupExperience = () => {
	const [ option, setOption ] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	// useEffect(() => {
	// 	const goToTopPriority = () => navigate('/wp-setup/step/top-priority');
	// 	if (option) {goToTopPriority();}
	// }, [navigate]);

    const handleClick = () => {
        navigate('/wp-setup/step/top-priority');
    }
 
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
					selected={ option } 
					options={ [
						{ label: content.label1, value: '1' },
						{ label: content.label2, value: '3' },
						{ label: content.label3, value: '5' }
					] }
					onChange={ ( value ) => setOption( value ) }
					/>
					<div className="nfd-steps-card-large-button">
						<Button text={content.buttonText} disabled={!option} handleClick={handleClick}/>
					</div>
					<GenericHtml content={content.needHelpText}/> 
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
    );
};

export default StartSetupExperience;
