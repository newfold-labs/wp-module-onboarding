import { useDispatch, useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { Container } from '@newfold/ui-component-library';
import { Navigate, Step } from '@/components';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_LOGO_ADDED, ACTION_LOGO_SKIPPED } from '@/utils/analytics/hiive/constants';
import { LogoUploadInput } from '.';
import { nfdOnboardingStore } from '@/data/store';

const LogoStep = () => {
	const [ isUploading, setIsUploading ] = useState( false );

	const { editEntityRecord, saveEditedEntityRecord } = useDispatch( coreStore );
	const { siteLogoId, storeLogoId } = useSelect( ( select ) => {
		// Get the site logo from the core data store.
		const { getEntityRecord } = select( coreStore );
		const siteSettings = getEntityRecord( 'root', 'site' );
		const logoId = siteSettings?.site_logo;

		// Get the logo from the input slice.
		const logo = select( nfdOnboardingStore ).getLogo();
		return {
			siteLogoId: logoId,
			storeLogoId: logo.id,
		};
	}, [] );

	const handleNext = () => {
		// If the logo is set.
		if ( null !== storeLogoId && storeLogoId !== siteLogoId ) {
			editEntityRecord( 'root', 'site', undefined, {
				site_logo: storeLogoId,
			} );
			saveEditedEntityRecord( 'root', 'site' );

			// Analytics: track the logo added event
			trackOnboardingEvent(
				new OnboardingEvent( ACTION_LOGO_ADDED )
			);
		} else {
			// Analytics: track the logo skipped event
			trackOnboardingEvent(
				new OnboardingEvent( ACTION_LOGO_SKIPPED )
			);
		}
	};

	return (
		<Step>
			<Container className="nfd-onboarding-step-container nfd-onboarding-step-logo">
				<Container.Header
					title={ __( 'Do you have a logo you would like to use?', 'wp-module-onboarding' ) }
					description={ __( 'Browse to upload your logo, or drag and drop it below.', 'wp-module-onboarding' ) }
					className="nfd-gap-2"
				/>
				<Container.Block separator={ false }>
					<LogoUploadInput
						isUploading={ isUploading }
						setIsUploading={ setIsUploading }
					/>
				</Container.Block>
				<Container.Footer>
					<Step.Actions>
						<Navigate
							toRoute="/generating"
							direction="forward"
							callback={ handleNext }
							disabled={ isUploading }
						>
							{ __( 'Next', 'wp-module-onboarding' ) }
						</Navigate>
						<Navigate
							toRoute="/intake"
							direction="backward"
							variant="secondary"
							disabled={ isUploading }
						>
							{ __( 'Back', 'wp-module-onboarding' ) }
						</Navigate>
					</Step.Actions>
				</Container.Footer>
			</Container>
		</Step>
	);
};

export default LogoStep;
