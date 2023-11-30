import CommonLayout from '../../../components/Layouts/Common';

import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';

import getContents from './contents';
import ImageUploaderWithText from '../../../components/ImageUploader/components/ImageUploaderWithText';
import ButtonNext from '../../../components/Button/ButtonNext';
import SkipButton from '../../../components/SkipButton';

const SiteGenSiteLogo = () => {
	const [ siteLogo, setSiteLogo ] = useState();

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	const resetSiteLogo = () => {
		const currentDataCopy = { ...currentData };
		currentDataCopy.sitegen.siteLogo = {
			id: 0,
			url: '',
			fileName: '',
			fileSize: 0,
		};
		setCurrentOnboardingData( currentDataCopy );
		setSiteLogo( undefined );
	};

	useEffect( () => {
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		if ( currentData.sitegen.siteLogo?.id !== 0 ) {
			setSiteLogo( currentData.sitegen.siteLogo );
		}
	}, [] );

	useEffect( () => {
		if ( undefined !== siteLogo ) {
			const currentDataCopy = { ...currentData };
			currentDataCopy.sitegen.siteLogo.id = siteLogo.id;
			currentDataCopy.sitegen.siteLogo.url = siteLogo.url;
			currentDataCopy.sitegen.siteLogo.fileName = siteLogo.fileName;
			currentDataCopy.sitegen.siteLogo.fileSize = siteLogo.fileSize;
			setCurrentOnboardingData( currentDataCopy );
		}
	}, [ siteLogo ] );

	const content = getContents();
	return (
		<CommonLayout
			isCentered
			className="nfd-onboarding-step--site-gen__site-logo"
		>
			<div className="nfd-onboarding-step--site-gen__site-logo__container">
				<div className="nfd-onboarding-step--site-gen__site-logo__container__heading">
					<div className="nfd-onboarding-step--site-gen__site-logo__container__heading__animation"></div>
					<p className="nfd-onboarding-step--site-gen__site-logo__container__heading__text">
						{ content.heading }
					</p>
				</div>
				<ImageUploaderWithText
					image={ siteLogo }
					imageSetter={ setSiteLogo }
				/>
				<div className="nfd-onboarding-step--site-gen__site-logo__container__buttons">
					<SkipButton
						callback={ () => resetSiteLogo() }
						className="nfd-onboarding-step--site-gen__site-logo__container__buttons__skip"
						text={ content.buttons.skip }
					/>
					<ButtonNext
						disabled={
							siteLogo === undefined || siteLogo?.id === 0
								? true
								: false
						}
					/>
				</div>
			</div>
		</CommonLayout>
	);
};

export default SiteGenSiteLogo;
