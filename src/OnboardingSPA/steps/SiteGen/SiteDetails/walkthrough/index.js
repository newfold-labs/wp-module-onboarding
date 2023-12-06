import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

import getContents from '../contents';
import { store as nfdOnboardingStore } from '../../../../store';
import AIHeading from '../../../../components/Heading/AIHeading';
import TextInputSiteGenSimple from '../../../../components/TextInput/TextInputSiteGen/Simple';
import NextButtonSiteGen from '../../../../components/Button/NextButtonSiteGen';
import ButtonSiteGen from '../../../../components/Button/ButtonWhite/SiteGen';

const SiteGenSiteDetailsWalkthrough = () => {
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
		setCurrentOnboardingData( currentData );

		switch ( field ) {
			case 'name':
				setCustomerInputName( e.target.value );
				break;
			case 'type':
				setCustomerInputType( e.target.value );
				break;
			case 'style':
				setCustomerInputStyle( e.target.value );
				break;
			case 'uniqueAboutBusiness':
				setCustomerInputUnique( e.target.value );
				break;
			default:
				break;
		}
	};

	const concatenatePrompt = () => {
		const siteDetails = currentData.sitegen.siteDetails;
		let concatenatedString = '';

		for ( const field in siteDetails ) {
			if ( siteDetails[ field ] ) {
				switch ( field ) {
					case 'name':
						concatenatedString += `${ content.businessNamePromptText } ${ siteDetails[ field ] }.`;
						break;
					case 'type':
						concatenatedString += `${ content.websiteTypePromptText } ${ siteDetails[ field ] }.`;
						break;
					case 'style':
						concatenatedString += `${ content.writeStylePromptText } "${ siteDetails[ field ] }".`;
						break;
					case 'uniqueAboutBusiness':
						concatenatedString += `${ content.uniqueBusinessPromptText } ${ siteDetails[ field ] }.`;
						break;
					default:
						break;
				}
			}
		}
		return concatenatedString;
	};

	const selectOption = ( event, classname ) => {
		document.querySelectorAll( `.${ classname }` ).forEach( ( button ) => {
			button.classList.remove(
				'nfd-sg-site-details-rows-button-selected'
			);
		} );
		event.target.classList.add(
			'nfd-sg-site-details-rows-button-selected'
		);
	};

	const checkAndNavigate = () => {
		currentData.sitegen.siteDetails.prompt = concatenatePrompt();
		setCurrentOnboardingData( currentData );
	};

	return (
		<div className={ 'nfd-sg-site-details' }>
			<AIHeading title={ content.heading } />
			<div className={ 'nfd-sg-site-details-rows' }>
				{ isEditing ? (
					<TextInputSiteGenSimple
						type="text"
						labelText={ content.businessName }
						customerInput={ customerInputName }
						callback={ ( e ) => handlePromptChange( 'name', e ) }
					/>
				) : (
					<div>
						<label htmlFor="businessName">
							{ content.businessName }
						</label>
						<br></br>
						<br></br>
						<ButtonSiteGen
							text="Yes"
							onClick={ () => setEditing( true ) }
						/>
						<ButtonSiteGen
							className={ `nfd-sg-site-details-rows-button-site-name
										${ ! isEditing ? 'nfd-sg-site-details-rows-button-selected' : '' }` }
							text="No"
							onClick={ ( e ) => {
								setEditing( false );
								selectOption(
									e,
									'nfd-sg-site-details-rows-button-site-name'
								);
							} }
						/>
					</div>
				) }
			</div>

			<div className={ 'nfd-sg-site-details-rows' }>
				<TextInputSiteGenSimple
					type="text"
					labelText={ content.websiteType }
					placeholder={ content.websiteTypePlaceholder }
					customerInput={ customerInputType }
					callback={ ( e ) => handlePromptChange( 'type', e ) }
				/>
			</div>

			<div className={ 'nfd-sg-site-details-rows' }>
				<label htmlFor="writeStyle">{ content.writeStyle }</label>
				<div>
					<ButtonSiteGen
						className={ `nfd-sg-site-details-rows-write-style ${
							customerInputStyle === content.writeStyleOption1
								? 'nfd-sg-site-details-rows-button-selected'
								: ''
						}` }
						text={ content.writeStyleOption1 }
						value={ content.writeStyleOption1 }
						onClick={ ( e ) => {
							handlePromptChange( 'style', e );
							selectOption(
								e,
								'nfd-sg-site-details-rows-write-style'
							);
						} }
					/>
					<ButtonSiteGen
						className={ `nfd-sg-site-details-rows-write-style ${
							customerInputStyle === content.writeStyleOption2
								? 'nfd-sg-site-details-rows-button-selected'
								: ''
						}` }
						text={ content.writeStyleOption2 }
						value={ content.writeStyleOption2 }
						onClick={ ( e ) => {
							handlePromptChange( 'style', e );
							selectOption(
								e,
								'nfd-sg-site-details-rows-write-style'
							);
						} }
					/>
				</div>
			</div>

			<div className={ 'nfd-sg-site-details-rows' }>
				<TextInputSiteGenSimple
					type="textarea"
					labelText={ content.uniqueBusiness }
					placeholder={ content.uniqueBusinessPlaceholder }
					customerInput={ customerInputUnique }
					callback={ ( e ) =>
						handlePromptChange( 'uniqueAboutBusiness', e )
					}
				/>
			</div>
			<br></br>
			{ isLargeViewport && (
				<div className={ 'nfd-sg-site-details-endrow' }>
					<NextButtonSiteGen
						className={ 'nfd-sg-site-details--next-btn' }
						text={ content.buttonText }
						callback={ checkAndNavigate }
					/>
				</div>
			) }
		</div>
	);
};

export default SiteGenSiteDetailsWalkthrough;
