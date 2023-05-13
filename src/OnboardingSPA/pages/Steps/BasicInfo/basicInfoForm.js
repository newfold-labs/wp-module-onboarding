import { useDispatch, useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useState, useEffect, useRef } from '@wordpress/element';
import getContents from './contents';
import TextInput from '../../../components/TextInput';
import SkipButton from '../../../components/SkipButton';
import MiniPreview from '../../../components/MiniPreview';
import Animate from '../../../components/Animate';
import { getSettings } from '../../../utils/api/settings';
import { store as nfdOnboardingStore } from '../../../store';
import ImageUploader from '../../../components/ImageUploader';
import SocialMediaForm from '../../../components/SocialMediaForm';

/**
 * Basic Info Form.
 *
 * @return {WPComponent} BasicInfoForm Component
 */
const BasicInfoForm = () => {
	const socialMediaRef = useRef( null );
	const [ flowData, setFlowData ] = useState();
	const [ isLoaded, setisLoaded ] = useState( false );
	const [ debouncedFlowData, setDebouncedFlowData ] = useState();

	const [ siteTitle, setSiteTitle ] = useState( '' );
	const [ siteDesc, setSiteDesc ] = useState( '' );
	const [ siteLogo, setSiteLogo ] = useState();
	const [ socialData, setSocialData ] = useState();
	const [ isValidSocials, setIsValidSocials ] = useState( false );
	const [ isSocialFormOpen, setIsSocialFormOpen ] = useState( false );

	const { setOnboardingSocialData, setCurrentOnboardingData } =
		useDispatch( nfdOnboardingStore );
	const { editEntityRecord } = useDispatch( coreStore );

	const { getEditedEntityRecord } = useSelect( ( select ) => {
		return select( coreStore );
	}, [] );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	const content = getContents();

	function setDefaultData() {
		if ( isLoaded ) {
			setSiteLogo( flowData?.data?.siteLogo );
			setSiteTitle( flowData?.data?.blogName ?? '' );
			setSiteDesc( flowData?.data?.blogDescription ?? '' );
		}
	}

	function createSaveData() {
		const dataToSave = {
			data: {
				siteLogo,
				blogName: siteTitle,
				blogDescription: siteDesc,
				socialData,
			},
		};
		return dataToSave;
	}

	useEffect( () => {
		if ( isSocialFormOpen ) {
			socialMediaRef.current.scrollIntoView();
		}
	}, [ isSocialFormOpen ] );

	useEffect( () => {
		async function getFlowData() {
			const socialDataAPI = await getSettings();
			setSocialData( socialDataAPI?.body );
			setFlowData( currentData );
			setDebouncedFlowData( flowData );
			setisLoaded( true );
			setOnboardingSocialData( socialDataAPI?.body );
		}
		if ( ! isLoaded ) {
			getFlowData();
		}
		getEditedEntityRecord( 'root', 'site' );

		setDefaultData();
	}, [ isLoaded ] );

	useEffect( () => {
		const timerId = setTimeout( () => {
			if ( isLoaded ) {
				setDebouncedFlowData( createSaveData() );
			}
		}, 600 );

		return () => {
			clearTimeout( timerId );
		};
	}, [ siteTitle, siteDesc, siteLogo, socialData, isValidSocials ] );

	const updateCoreStore = ( siteLogoTemp, siteTitleTemp, siteDescTemp ) => {
		editEntityRecord( 'root', 'site', undefined, {
			site_logo: siteLogoTemp?.id ? siteLogoTemp.id : null,
			description: siteDescTemp,
			title: siteTitleTemp,
		} );
	};

	useEffect( () => {
		const saveData = async () => {
			const currentDataCopy = currentData;
			currentDataCopy.data.siteLogo =
				debouncedFlowData.data.siteLogo ??
				currentDataCopy.data.siteLogo;
			currentDataCopy.data.blogName =
				debouncedFlowData.data.blogName ??
				currentDataCopy.data.blogName;
			currentDataCopy.data.blogDescription =
				debouncedFlowData.data.blogDescription ??
				currentDataCopy.data.blogDescription;
			updateCoreStore(
				currentDataCopy.data.siteLogo,
				currentDataCopy.data.blogName,
				currentDataCopy.data.blogDescription
			);
			setCurrentOnboardingData( currentDataCopy );
			setOnboardingSocialData(
				debouncedFlowData.data.socialData ?? socialData
			);
		};
		if ( debouncedFlowData ) {
			saveData();
		}
	}, [ debouncedFlowData ] );

	return (
		<Animate
			type={ 'fade-in-disabled' }
			after={
				typeof flowData === 'object' && typeof socialData === 'object'
			}
		>
			<div className={ 'basic-info' }>
				<div className="basic-info-form">
					<div className="basic-info-form__left">
						<TextInput
							title={ content.siteTitle.title }
							hint={ content.siteTitle.hint }
							placeholder={ content.siteTitle.placeholder }
							maxCharacters={ content.siteTitle.maxCharacters }
							height="47px"
							textValue={ siteTitle }
							textValueSetter={ setSiteTitle }
						/>

						<TextInput
							title={ content.siteDesc.title }
							hint={ content.siteDesc.hint }
							placeholder={ content.siteDesc.placeholder }
							maxCharacters={ content.siteDesc.maxCharacters }
							height="100px"
							textValue={ siteDesc }
							textValueSetter={ setSiteDesc }
						/>
						<div ref={ socialMediaRef }>
							<SocialMediaForm
								socialData={ socialData }
								setSocialData={ setSocialData }
								isSocialFormOpen={ isSocialFormOpen }
								setIsValidSocials={ setIsValidSocials }
								setIsSocialFormOpen={ setIsSocialFormOpen }
							/>
						</div>
					</div>
					<div className="basic-info-form__right">
						<ImageUploader
							icon={ siteLogo }
							iconSetter={ setSiteLogo }
						/>
						<MiniPreview
							icon={ siteLogo }
							title={ siteTitle }
							desc={ siteDesc }
							socialData={ socialData }
							isSocialFormOpen={ isSocialFormOpen }
							setIsSocialFormOpen={ setIsSocialFormOpen }
						/>
					</div>
				</div>
				<SkipButton />
			</div>
		</Animate>
	);
};

export default BasicInfoForm;
