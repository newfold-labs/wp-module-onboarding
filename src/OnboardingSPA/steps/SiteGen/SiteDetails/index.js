import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

import getContents from './contents';
import Animate from '../../../components/Animate';
import { HEADER_SITEGEN } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import AIHeading from '../../../components/Heading/AIHeading';
import CommonLayout from '../../../components/Layouts/Common';
import TextInputSiteGen from '../../../components/TextInput/TextInputSiteGen';
import NextButtonSiteGen from '../../../components/Button/NextButtonSiteGen';

const SiteGenSiteDetails = () => {
	const content = getContents();
	const [ customerInput, setCustomerInput ] = useState();

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );

		if ( currentData.sitegen.siteDetails?.prompt !== '' ) {
			setCustomerInput( currentData.sitegen.siteDetails.prompt );
		}
	}, [] );

	const checkAndNavigate = () => {
		currentData.sitegen.siteDetails.prompt = customerInput;
		setCurrentOnboardingData( currentData );
		// console.log( 'Navigate to the next screen!' );
	};

	return (
		<CommonLayout isCentered>
			<Animate type={ 'fade-in' }>
				<div className={ 'nfd-sg-site-details' }>
					<AIHeading title={ content.heading } />
					<TextInputSiteGen
						placeholder={ content.inputPlaceholder }
						hint={ content.inputHint }
						height={ '40px' }
						customerInput={ customerInput }
						setCustomerInput={ setCustomerInput }
					/>
					<div className={ 'nfd-sg-site-details-endrow' }>
						<NextButtonSiteGen
							className={ 'nfd-sg-site-details--next-btn' }
							text={ content.buttonText }
							callback={ checkAndNavigate }
						/>
					</div>
				</div>
			</Animate>
		</CommonLayout>
	);
};

export default SiteGenSiteDetails;
