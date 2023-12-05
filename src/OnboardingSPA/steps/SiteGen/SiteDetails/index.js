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

	const handleInputChange = ( field, e ) => {
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

	const handleBusinessNameButtonClick = ( value ) => {
		switch ( value ) {
			case 'yes':
				setEditing( true );
				break;
			case 'no':
				setEditing( false );
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
						concatenatedString += `My business name is ${ siteDetails[ field ] }.`;
						break;
					case 'type':
						concatenatedString += `I am making a website type of ${ siteDetails[ field ] }.`;
						break;
					case 'style':
						concatenatedString += `My writing style is ${ siteDetails[ field ] }.`;
						break;
					case 'uniqueAboutBusiness':
						concatenatedString += `Unique about my business is ${ siteDetails[ field ] }.`;
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

	const addSelectedClassOnClick = ( event, classname ) => {
		// Remove 'selected' class from all buttons
		document.querySelectorAll( `.${ classname }` ).forEach( ( button ) => {
			button.classList.remove(
				'nfd-sg-site-details-rows-button-selected'
			);
		} );

		// Add 'selected' class to the clicked button
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
							<label>
								1. Do you have a business name or website title?
							</label>
							<br></br>
							<div>
								{ isEditing ? (
									<div>
										<input
											type="text"
											value={ customerInputName }
											onChange={ ( e ) =>
												handleInputChange( 'name', e )
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
												addSelectedClassOnClick(
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
							<label>
								2. What type of website are you making?
							</label>
							<br></br>
							<input
								type="text"
								value={ customerInputType }
								onChange={ ( e ) =>
									handleInputChange( 'type', e )
								}
							/>
						</div>

						<div className={ 'nfd-sg-site-details-rows' }>
							<label>
								3. Which writing style do you like better?
							</label>
							<div>
								<button
									className={ `nfd-sg-site-details-rows-write-style ${
										customerInputStyle ===
										'We craft awesome goodies!'
											? 'nfd-sg-site-details-rows-button-selected'
											: ''
									}` }
									value={ 'We craft awesome goodies!' }
									onClick={ ( e ) => {
										handleInputChange( 'style', e );
										addSelectedClassOnClick(
											e,
											'nfd-sg-site-details-rows-write-style'
										);
									} }
								>
									We craft awesome goodies!
								</button>
								<button
									className={ `nfd-sg-site-details-rows-write-style ${
										customerInputStyle ===
										'We manufacture quality products'
											? 'nfd-sg-site-details-rows-button-selected'
											: ''
									}` }
									value={ 'We manufacture quality products' }
									onClick={ ( e ) => {
										handleInputChange( 'style', e );
										addSelectedClassOnClick(
											e,
											'nfd-sg-site-details-rows-write-style'
										);
									} }
								>
									We manufacture quality products
								</button>
							</div>
						</div>

						<div className={ 'nfd-sg-site-details-rows' }>
							<label>
								4. Is there anything unique about your business
								or brand?
							</label>
							<br></br>
							<textarea
								value={ customerInputUnique }
								onChange={ ( e ) =>
									handleInputChange(
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
