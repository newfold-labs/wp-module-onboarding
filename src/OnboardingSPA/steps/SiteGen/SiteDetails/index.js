// WordPress
import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

// Classes and functions
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';
import getContents from './contents';
import { fetchLanguages, formatLanguagesForSelection } from '../../../utils/api/languages';

// Components
import Animate from '../../../components/Animate';
import AIHeading from '../../../components/Heading/AIHeading';
import CommonLayout from '../../../components/Layouts/Common';
import TextInputSiteGen from '../../../components/TextInput/TextInputSiteGen';
import NextButtonSiteGen from '../../../components/Button/NextButtonSiteGen';
import { SiteGenStateHandler } from '../../../components/StateHandlers';
import LanguageSelection from '../../../components/LanguageSelection';

// Misc
import { HEADER_SITEGEN } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { ACTION_SITEGEN_SITE_DETAILS_PROMPT_SET } from '../../../utils/analytics/hiive/constants';
import { SITEGEN_FLOW } from '../../../data/flows/constants';

const SiteGenSiteDetails = () => {
	const [ customerInput, setCustomerInput ] = useState( '' );
	const [ customerInputStrength, setCustomerInputStrength ] = useState( 0 );
	const [ isValidInput, setIsValidInput ] = useState( false );
	const [ languages, setLanguages ] = useState( [] );

	const { currentData, storedLanguages } = useSelect( ( select ) => {
		return {
			currentData: select( nfdOnboardingStore ).getCurrentOnboardingData(),
			storedLanguages: select( nfdOnboardingStore ).getLanguages(),
		};
	} );

	const [ selectedLocale, setSelectedLocale ] = useState(
		currentData?.sitegen?.siteDetails?.locale || ''
	);

	const {
		setIsFooterNavAllowed,
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setHideFooterNav,
		setCurrentOnboardingData,
		setIsHeaderNavigationEnabled,
		setStoreLanguages,
	} = useDispatch( nfdOnboardingStore );

	const isLargeViewport = useViewportMatch( 'small' );
	const content = getContents();

	// Fetch languages from API only if they don't exist in the store
	useEffect( () => {
		const getLanguages = async () => {
			// Check if languages already exist in the store
			if ( storedLanguages?.length > 0 ) {
				// Use languages from the store
				setLanguages( formatLanguagesForSelection( storedLanguages ) );
			} else {
				// Fetch languages if not in store
				const languageData = await fetchLanguages();
				if ( languageData?.length > 0 ) {
					const formattedLanguages = formatLanguagesForSelection( languageData );
					setLanguages( formattedLanguages );

					// Save languages to the store for future use
					setStoreLanguages( languageData );
				}
			}
		};

		getLanguages();
	}, [ storedLanguages, setStoreLanguages ] );

	// Function to find English in language list or default to first language
	const getDefaultLocale = () => {
		const languageList = languages.length > 0 ? languages : content.languageList;
		const englishOption = languageList.find( ( [ language ] ) =>
			language.toLowerCase().includes( 'english' ) );
		const defaultOption = languageList[ 0 ] ? languageList[ 0 ][ 1 ] : '';
		return englishOption ? englishOption[ 1 ] : defaultOption;
	};

	// Set English as default if no locale is selected
	useEffect( () => {
		// Only run this if languages have loaded or we have content.languageList
		const languageList = languages?.length > 0 ? languages : content.languageList;

		// initialize default locale when the user visits the first time
		if ( languageList?.length > 0 && ! selectedLocale ) {
			const defaultLocale = getDefaultLocale();
			setSelectedLocale( defaultLocale );

			// Update the store with the default locale
			if ( defaultLocale ) {
				currentData.sitegen.siteDetails.locale = defaultLocale;
				setCurrentOnboardingData( currentData );
			}
		}
	}, [ languages, selectedLocale ] );

	useEffect( () => {
		setHideFooterNav( false );
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setIsHeaderNavigationEnabled( true );
		setDrawerActiveView( false );
		if ( currentData.sitegen.siteDetails?.prompt !== '' ) {
			if (
				currentData.sitegen.siteDetails?.prompt.length <
				currentData.sitegen.siteDetails?.minCharLimit
			) {
				setIsValidInput( false );
				setIsFooterNavAllowed( false );
				currentData.sitegen.siteDetails.prompt = '';
				setCurrentOnboardingData( currentData );
			} else {
				if ( selectedLocale !== '' ) {
					setIsValidInput( true );
				}
				setIsFooterNavAllowed( true );
			}
			return setCustomerInput( currentData.sitegen.siteDetails.prompt );
		}
		setIsFooterNavAllowed( false );
	}, [] );

	useEffect( () => {
		if ( customerInput !== undefined ) {
			const customerInputTrimmed = customerInput.trim();
			if ( customerInputTrimmed !== '' ) {
				// When something new is added then only change in store.
				if (
					customerInputTrimmed !==
					currentData.sitegen.siteDetails.prompt
				) {
					currentData.sitegen.siteDetails.prompt =
						customerInputTrimmed;
					currentData.sitegen.siteDetails.mode = 'simple';
					currentData.sitegen.skipCache = true;
					currentData.sitegen.sitemapPagesGenerated = false;
					currentData.sitegen.homepages.active = {};
					currentData.sitegen.homepages.data = {};
					setCurrentOnboardingData( currentData );
				}
				// Else just make sure the Next is enabled when prompt is present
				if ( selectedLocale !== '' ) {
					setIsValidInput( true );
				}
				setIsFooterNavAllowed( true );
			} else {
				setIsValidInput( false );
				setIsFooterNavAllowed( false );
			}

			if ( selectedLocale !== currentData.sitegen.siteDetails.locale ) {
				currentData.sitegen.siteDetails.locale = selectedLocale;
				setCurrentOnboardingData( currentData );
			}
		}
	}, [ customerInput, selectedLocale ] );

	const trackPromptSetEvent = () => {
		let customerInputStrengthForEvent = false;
		switch ( customerInputStrength ) {
			case 2:
				customerInputStrengthForEvent = 'MEDIUM';
				break;
			case 3:
				customerInputStrengthForEvent = 'HIGH';
				break;
		}

		if ( customerInputStrengthForEvent ) {
			trackOnboardingEvent(
				new OnboardingEvent(
					ACTION_SITEGEN_SITE_DETAILS_PROMPT_SET,
					customerInput,
					{
						strength: customerInputStrengthForEvent,
						source: SITEGEN_FLOW,
					}
				)
			);
		}
	};

	return (
		<SiteGenStateHandler>
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
							setCustomerInputStrength={
								setCustomerInputStrength
							}
							customChildren={ true }
						>
							<LanguageSelection
								languageSelectionLabel={ content.languageSelectionLabel }
								languageList={ languages.length > 0 ? languages : content.languageList }
								selectedLocale={ selectedLocale }
								setSelectedLocale={ setSelectedLocale }
							/>
							{ isLargeViewport && (
								<div className={ 'nfd-sg-site-details-endrow' }>
									<NextButtonSiteGen
										className={
											'nfd-sg-site-details--next-btn'
										}
										callback={ () => {
											trackPromptSetEvent();
										} }
										text={ content.buttonText }
										disabled={ ! isValidInput }
									/>
								</div>
							) }
						</TextInputSiteGen>
					</div>
				</Animate>
			</CommonLayout>
		</SiteGenStateHandler>
	);
};

export default SiteGenSiteDetails;
