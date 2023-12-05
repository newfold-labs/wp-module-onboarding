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
	const [ customerInputName, setCustomerInputName ] = useState();
	const [ customerInputType, setCustomerInputType ] = useState();
	const [ customerInputStyle, setCustomerInputStyle ] = useState();
	const [ customerInputUnique, setCustomerInputUnique ] = useState();
	const [ isWalkthrough, setIsWalkthrough ] = useState( false );
	const [ isEditing, setEditing ] = useState( false );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

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
		if ( isWalkthrough ) {
			currentData.sitegen.siteDetails.prompt = concatenatePrompt();
		} else {
			currentData.sitegen.siteDetails.prompt = customerInput;
		}
		setCurrentOnboardingData( currentData );
	};

	const handleClickWalkThrough = () => {
		setIsWalkthrough( true );
	};

	return (
		<CommonLayout isCentered>
			<Animate type={ 'fade-in' }>
				{ isWalkthrough ? (
					<div className={ 'nfd-sg-site-details' }>
						<AIHeading title={ content.heading } />
						<div className={ 'nfd-sg-site-details-rows' }>
							<label> { content.businessName }</label>
							<br></br>
							<div>
								{ isEditing ? (
									<div>
										<input
											type="text"
											value={ customerInputName }
											onChange={ ( e ) =>
												handlePromptChange( 'name', e )
											}
										/>
									</div>
								) : (
									<div>
										<button
											onClick={ () => setEditing( true ) }
										>
											Yes
										</button>
										<button
											className={ `nfd-sg-site-details-rows-button-site-name
											${ ! isEditing ? 'nfd-sg-site-details-rows-button-selected' : '' }` }
											onClick={ ( e ) => {
												setEditing( false );
												selectOption(
													e,
													'nfd-sg-site-details-rows-button-site-name'
												);
											} }
										>
											No
										</button>
									</div>
								) }
							</div>
						</div>

						<div className={ 'nfd-sg-site-details-rows' }>
							<label>{ content.websiteType }</label>
							<br></br>
							<input
								type="text"
								value={ customerInputType }
								placeholder={ content.websiteTypePlaceholder }
								onChange={ ( e ) =>
									handlePromptChange( 'type', e )
								}
							/>
						</div>

						<div className={ 'nfd-sg-site-details-rows' }>
							<label>{ content.writeStyle }</label>
							<div>
								<button
									className={ `nfd-sg-site-details-rows-write-style ${
										customerInputStyle ===
										content.writeStyleOption1
											? 'nfd-sg-site-details-rows-button-selected'
											: ''
									}` }
									value={ content.writeStyleOption1 }
									onClick={ ( e ) => {
										handlePromptChange( 'style', e );
										selectOption(
											e,
											'nfd-sg-site-details-rows-write-style'
										);
									} }
								>
									{ content.writeStyleOption1 }
								</button>
								<button
									className={ `nfd-sg-site-details-rows-write-style ${
										customerInputStyle ===
										content.writeStyleOption2
											? 'nfd-sg-site-details-rows-button-selected'
											: ''
									}` }
									value={ content.writeStyleOption2 }
									onClick={ ( e ) => {
										handlePromptChange( 'style', e );
										selectOption(
											e,
											'nfd-sg-site-details-rows-write-style'
										);
									} }
								>
									{ content.writeStyleOption2 }
								</button>
							</div>
						</div>

						<div className={ 'nfd-sg-site-details-rows' }>
							<label>{ content.uniqueBusiness }</label>
							<br></br>
							<textarea
								value={ customerInputUnique }
								placeholder={
									content.uniqueBusinessPlaceholder
								}
								onChange={ ( e ) =>
									handlePromptChange(
										'uniqueAboutBusiness',
										e
									)
								}
							/>
						</div>
						<div className={ 'nfd-sg-site-details-endrow' }>
							<NextButtonSiteGen
								className={ 'nfd-sg-site-details--next-btn' }
								text={ content.buttonText }
								callback={ checkAndNavigate }
							/>
						</div>
					</div>
				) : (
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
						<div className={ 'nfd-sg-site-details-walkThrough' }>
							{ content.walkThroughText }
							<span
								onClick={ handleClickWalkThrough }
								onKeyDown={ handleClickWalkThrough }
								role="button"
								tabIndex="0"
							>
								click here
							</span>
						</div>
					</div>
				) }
			</Animate>
		</CommonLayout>
	);
};

export default SiteGenSiteDetails;
