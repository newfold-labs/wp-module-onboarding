import CommonLayout from '../../components/Layouts/Common';
import HeadingWithSubHeading from '../../components/HeadingWithSubHeading';
import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '@wordpress/data';
import { RadioControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const ExperienceWithWP = () => {
	const [ option, setOption ] = useState( '1');
 
    return (    
            <div className='nfd-onboarding-experience-step'>
            <HeadingWithSubHeading title="Help us tailor this setup to your site" subtitle="ABOUT YOU" isColoredSubheading="true"/>
            <h2 className='nfd-onboarding-experience-step__title'>What is your experience with WordPress?</h2>
            <RadioControl className='nfd-onboarding-experience-step-tabs components-radio-control__input'
                selected={ option } 
                options={ [
                    { label: '1 - Never used it', value: '1' },
                    { label: '2 - Used it a little', value: '2' },
                    { label: '3 - Managed or built a site', value: '3' },
                    { label: '4 - Built few sites', value: '4' },
                    { label: "5 - I'm an expert", value: '5' },
                ] }
                onChange={ ( value ) => setOption( value ) }
            />
            <button className='button-style'>Continue Setup</button>
            <div className='bottom'>
                <h2 className='bottom'>Need help?</h2>
                <a href='https://www.bluehost.com/solutions/full-service' target='_blank' className='bottom-link'>Hire our experts</a>
            </div>  
            </div>
    );
};

export default ExperienceWithWP;
