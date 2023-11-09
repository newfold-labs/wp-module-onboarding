import { useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

import getContents from './contents';
import Animate from '../../../components/Animate';
import AIHeading from '../../../components/AIHeading';
import { HEADER_SITEGEN } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import TextInputSiteGen from '../../../components/TextInput/TextInputSiteGen';
import NextButtonSiteGen from '../../../components/Button/NextButtonSiteGen';

const SiteGenSiteDetails = () => {
	const content = getContents();
	const [ customerInput, setCustomerInput ] = useState();

	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
	} );

	// const checkAndNavigate = () => {
	// 	// console.log( customerInput );
	// 	// console.log( 'Navigate to the next screen!' );
	// };

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
						/>
					</div>
				</div>
			</Animate>
		</CommonLayout>
	);
};

export default SiteGenSiteDetails;
