import { useViewportMatch } from '@wordpress/compose';
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
	const isLargeViewport = useViewportMatch( 'small' );
	const [ customerInput, setCustomerInput ] = useState();
	const [ isValidInput, setIsValidInput ] = useState( false );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const {
		setFooterNavEnabled,
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
			return setCustomerInput( currentData.sitegen.siteDetails.prompt );
		}
		setFooterNavEnabled( false );
	}, [] );

	useEffect( () => {
		setFooterNavEnabled( isValidInput );
		currentData.sitegen.siteDetails.prompt = customerInput?.trim();
		setCurrentOnboardingData( currentData );
	}, [ customerInput ] );

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
						setIsValidInput={ setIsValidInput }
						setCustomerInput={ setCustomerInput }
					/>
					{ isLargeViewport && (
						<div className={ 'nfd-sg-site-details-endrow' }>
							<NextButtonSiteGen
								className={ 'nfd-sg-site-details--next-btn' }
								text={ content.buttonText }
								disabled={ ! isValidInput }
							/>
						</div>
					) }
				</div>
			</Animate>
		</CommonLayout>
	);
};

export default SiteGenSiteDetails;
