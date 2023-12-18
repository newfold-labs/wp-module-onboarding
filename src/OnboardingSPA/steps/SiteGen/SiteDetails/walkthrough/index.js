import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

import getContents from '../contents';
import { store as nfdOnboardingStore } from '../../../../store';
import AIHeading from '../../../../components/Heading/AIHeading';
import TextInputSiteGenSimple from '../../../../components/TextInput/TextInputSiteGen/simple';
import NextButtonSiteGen from '../../../../components/Button/NextButtonSiteGen';
import ButtonSiteGenPrompt from '../../../../components/Button/ButtonWhite/SiteGen';

const SiteGenSiteDetailsWalkthrough = ( { siteDetailsmeta } ) => {
	const content = getContents();
	const isLargeViewport = useViewportMatch( 'small' );
	const [ isEditing, setEditing ] = useState( false );
	const [ customerInputName, setCustomerInputName ] = useState();
	const [ customerInputType, setCustomerInputType ] = useState();
	const [ customerInputStyle, setCustomerInputStyle ] = useState();
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
			setEditing( true );
		}
		if ( currentData.sitegen.siteDetails?.type !== '' ) {
			setCustomerInputType( currentData.sitegen.siteDetails.type );
		}
		if ( currentData.sitegen.siteDetails?.style !== '' ) {
			setCustomerInputStyle( currentData.sitegen.siteDetails.style );
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
			style: setCustomerInputStyle,
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
					case 'style':
						concatenatedString += `${ siteDetailsmeta.writeStyle.prompt } "${ siteDetails[ field ] }". `;
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
			customerInputName === undefined ||
			customerInputName === '' ||
			customerInputType === undefined ||
			customerInputType === '' ||
			customerInputStyle === undefined ||
			customerInputStyle === '' ||
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
						{ isEditing ? (
							<TextInputSiteGenSimple
								type="text"
								labelText={
									siteDetailsmeta.businessName.question
								}
								customerInput={ customerInputName }
								callback={ ( e ) =>
									handlePromptChange( 'name', e )
								}
							/>
						) : (
							<div>
								<label htmlFor="businessName">
									{ siteDetailsmeta.businessName.question }
								</label>
								<div
									className={
										'nfd-sg-site-details-businessname'
									}
								>
									<ButtonSiteGenPrompt
										text="Yes"
										onClick={ () => setEditing( true ) }
									/>
									<ButtonSiteGenPrompt
										className={ `nfd-sg-site-details-rows-button-site-name
										${ ! isEditing ? 'nfd-sg-site-details-rows-button-selected' : '' }` }
										text="No"
										onClick={ () => {
											setEditing( false );
										} }
									/>
								</div>
							</div>
						) }
					</div>
					<div className={ 'nfd-sg-site-details-rows' }>
						<TextInputSiteGenSimple
							type="text"
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
						<label htmlFor="writeStyle">
							{ siteDetailsmeta.writeStyle.question }
						</label>
						<div>
							<ButtonSiteGenPrompt
								className={ `nfd-sg-site-details-rows-write-style ${
									customerInputStyle ===
									content.writeStyleOption1
										? 'nfd-sg-site-details-rows-button-selected'
										: ''
								}` }
								text={ content.writeStyleOption1 }
								value={ content.writeStyleOption1 }
								onClick={ ( e ) => {
									handlePromptChange( 'style', e );
								} }
							/>
							<ButtonSiteGenPrompt
								className={ `nfd-sg-site-details-rows-write-style ${
									customerInputStyle ===
									content.writeStyleOption2
										? 'nfd-sg-site-details-rows-button-selected'
										: ''
								}` }
								text={ content.writeStyleOption2 }
								value={ content.writeStyleOption2 }
								onClick={ ( e ) => {
									handlePromptChange( 'style', e );
								} }
							/>
						</div>
					</div>
					<div className={ 'nfd-sg-site-details-rows' }>
						<TextInputSiteGenSimple
							type="textarea"
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
