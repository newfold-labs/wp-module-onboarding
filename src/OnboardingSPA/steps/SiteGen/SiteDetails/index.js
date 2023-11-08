import CommonLayout from '../../../components/Layouts/Common';

import { useDispatch } from '@wordpress/data';
import { HEADER_SITEGEN } from '../../../../constants';
import { useEffect, useState } from '@wordpress/element';
import { store as nfdOnboardingStore } from '../../../store';

import getContents from './contents';
import AIHeading from '../../../components/AIHeading';
import TextInputSiteGen from '../../../components/TextInput/TextInputSiteGen';

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
			<div className={ 'nfd-sg-site-details' }>
				<AIHeading title={ content.heading } />
				<TextInputSiteGen
					placeholder={ content.inputPlaceholder }
					hint={ content.inputHint }
					height={ '40px' }
					customerInput={ customerInput }
					setCustomerInput={ setCustomerInput }
				/>
				<div className={ 'nfd-sg-site-details-endrow' }></div>
			</div>
		</CommonLayout>
	);
};

export default SiteGenSiteDetails;
