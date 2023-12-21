import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

import getContents from '../contents';
import { store as nfdOnboardingStore } from '../../../../store';
import AIHeading from '../../../../components/Heading/AIHeading';
import TextInputSiteGenDetails from '../../../../components/TextInput/TextInputSiteGenDetails';
import TextAreaSiteGenDetails from '../../../../components/TextInput/TextAreaSiteGenDetails';
import NextButtonSiteGen from '../../../../components/Button/NextButtonSiteGen';

const SiteGenSiteDetailsWalkthrough = ( { siteDetailsmeta } ) => {
	const content = getContents();
	const isLargeViewport = useViewportMatch( 'small' );
	const [ customerInputName, setCustomerInputName ] = useState();
	const [ customerInputType, setCustomerInputType ] = useState();
	const [ customerInputUnique, setCustomerInputUnique ] = useState();

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const { setCurrentOnboardingData } = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		if ( currentData.sitegen.siteDetails?.name !== '' ) {
			setCustomerInputName( currentData.sitegen.siteDetails.name );
		}
		if ( currentData.sitegen.siteDetails?.type !== '' ) {
			setCustomerInputType( currentData.sitegen.siteDetails.type );
		}
		if ( currentData.sitegen.siteDetails?.uniqueAboutBusiness !== '' ) {
			setCustomerInputUnique(
				currentData.sitegen.siteDetails.uniqueAboutBusiness
			);
		}
	}, [] );

	const handlePromptChange = ( field, e ) => {
		e.preventDefault();
		currentData.sitegen.siteDetails[ field ] = e.target.value;
		currentData.sitegen.siteDetails.prompt = concatenatePrompt();
		setCurrentOnboardingData( currentData );
		const setters = {
			name: setCustomerInputName,
			type: setCustomerInputType,
			uniqueAboutBusiness: setCustomerInputUnique,
		};

		setters[ field ]( e.target.value );
	};

	const concatenatePrompt = () => {
		const siteDetails = currentData.sitegen.siteDetails;
		let concatenatedString = '';

		for ( const field in siteDetails ) {
			if ( siteDetails[ field ] ) {
				switch ( field ) {
					case 'name':
						concatenatedString += `${ siteDetailsmeta.businessName.prompt } ${ siteDetails[ field ] }. `;
						break;
					case 'type':
						concatenatedString += `${ siteDetailsmeta.websiteType.prompt } ${ siteDetails[ field ] }. `;
						break;
					case 'uniqueAboutBusiness':
						concatenatedString += `${ siteDetailsmeta.uniqueBusiness.prompt } ${ siteDetails[ field ] }. `;
						break;
					default:
						break;
				}
			}
		}
		return concatenatedString;
	};

	const checkAndNavigate = () => {
		currentData.sitegen.siteDetails.prompt = concatenatePrompt();
		currentData.sitegen.siteDetails.mode = 'detailed';
		setCurrentOnboardingData( currentData );
	};

	const isdisabledNextButton = () => {
		return (
			customerInputType === undefined ||
			customerInputType === '' ||
			customerInputUnique === undefined ||
			customerInputUnique === ''
		);
	};

	return (
		<div className={ 'nfd-sg-site-details' }>
			<AIHeading title={ content.heading } />
			{ siteDetailsmeta && (
				<>
					<div className={ 'nfd-sg-site-details-rows' }>
						<TextInputSiteGenDetails
							labelText={ siteDetailsmeta.businessName.question }
							customerInput={ customerInputName }
							callback={ ( e ) =>
								handlePromptChange( 'name', e )
							}
						/>
					</div>
					<div className={ 'nfd-sg-site-details-rows' }>
						<TextInputSiteGenDetails
							labelText={ siteDetailsmeta.websiteType.question }
							placeholder={
								siteDetailsmeta.websiteType.placeholder
							}
							customerInput={ customerInputType }
							callback={ ( e ) =>
								handlePromptChange( 'type', e )
							}
						/>
					</div>
					<div className={ 'nfd-sg-site-details-rows' }>
						<TextAreaSiteGenDetails
							labelText={
								siteDetailsmeta.uniqueBusiness.question
							}
							placeholder={
								siteDetailsmeta.uniqueBusiness.placeholder
							}
							customerInput={ customerInputUnique }
							callback={ ( e ) =>
								handlePromptChange( 'uniqueAboutBusiness', e )
							}
						/>
					</div>
					{ isLargeViewport && (
						<div className={ 'nfd-sg-site-details-endrow' }>
							<NextButtonSiteGen
								className={ 'nfd-sg-site-details--next-btn' }
								text={ content.buttonText }
								callback={ checkAndNavigate }
								disabled={ isdisabledNextButton() }
							/>
						</div>
					) }
				</>
			) }
		</div>
	);
};

export default SiteGenSiteDetailsWalkthrough;
