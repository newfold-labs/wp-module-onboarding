import { useCallback, useContext, useState, useEffect } from '@wordpress/element';
import { dispatch, useSelect } from '@wordpress/data';
import classNames from 'classnames';
import { Title, Button } from '@newfold/ui-component-library';
import {
	HandThumbUpIcon as HandThumbUpIconOutline,
	HandThumbDownIcon as HandThumbDownIconOutline,
	SquaresPlusIcon,
} from '@heroicons/react/24/outline';
import {
	HandThumbUpIcon as HandThumbUpIconSolid,
	HandThumbDownIcon as HandThumbDownIconSolid,
} from '@heroicons/react/24/solid';
import { nfdOnboardingStore } from '@/data/store';
import { InlineAction } from '@/components';
import { LOGOGEN_PENDING_STATES, LOGOGEN_STATES, generateMoreLogos, checkLogogenStatus } from '@/utils/logogen';
import { LogoGenSetSiteLogoHookContext } from '@/utils/hooks/useLogoGenSetSiteLogo';
import LogoCard from './LogoCard';
import PreviewLightbox from './PreviewLightbox';

const Header = () => {
	return (
		<div className="nfd-flex nfd-flex-col nfd-gap-1">
			<Title as="h2" className="nfd-text-xl nfd-text-content-default">
				{ __( 'Pick your logo!', 'wp-module-onboarding' ) }
			</Title>
			<p className="nfd-text-content-default nfd-text-tiny">
				{ __( 'Select the logo you like best for your new site.', 'wp-module-onboarding' ) }
			</p>
		</div>
	);
};

const Survey = () => {
	const { logos, logogenSurvey } = useSelect( ( select ) => {
		return {
			logos: select( nfdOnboardingStore ).getLogos(),
			logogenSurvey: select( nfdOnboardingStore ).getLogogenSurvey(),
		};
	} );

	const handleSurvey = ( value ) => {
		const ALLOWED_VALUES = [ 'like', 'dislike' ];

		// Value must be one of the allowed values.
		if ( ! ALLOWED_VALUES.includes( value ) ) {
			// eslint-disable-next-line no-console
			console.error( `Invalid survey value, must be one of: ${ ALLOWED_VALUES.join( ', ' ) }. Got: ${ value }` );
			return;
		}

		// Only update new values.
		if ( logogenSurvey === value ) {
			return;
		}

		dispatch( nfdOnboardingStore ).setLogogenSurvey( value );
	};

	const shouldRender = useCallback( () => {
		// False if there are no logos.
		if ( logos.length === 0 ) {
			return false;
		}
		// Show if there are logos in completed status.
		if ( logos.some( ( logo ) => LOGOGEN_STATES.COMPLETED === logo.status ) ) {
			return true;
		}

		// False otherwise.
		return false;
	}, [ logos ] );

	return (
		<div className="nfd-flex nfd-items-center nfd-gap-3 nfd-text-slate-500">
			{ shouldRender() && (
				<>
					<p className="nfd-text-sm">
						{ __( 'Do you like what you see?', 'wp-module-onboarding' ) }
					</p>
					<div className="nfd-flex nfd-items-center nfd-gap-2">
						<InlineAction
							icon={ logogenSurvey === 'like' ? <HandThumbUpIconSolid className="nfd-w-4 nfd-h-4" /> : <HandThumbUpIconOutline className="nfd-w-4 nfd-h-4" /> }
							onClick={ () => handleSurvey( 'like' ) }
						/>
						<InlineAction
							icon={ logogenSurvey === 'dislike' ? <HandThumbDownIconSolid className="nfd-w-4 nfd-h-4" /> : <HandThumbDownIconOutline className="nfd-w-4 nfd-h-4" /> }
							onClick={ () => handleSurvey( 'dislike' ) }
						/>
					</div>
				</>
			) }
		</div>
	);
};

const SettingSiteLogoStatusOverlay = ( {
	isSettingSiteLogo,
} ) => {
	if ( ! isSettingSiteLogo ) {
		return null;
	}

	return (
		<div className="nfd-absolute nfd-inset-0 nfd-bg-white nfd-bg-opacity-90 nfd-flex nfd-items-center nfd-justify-center nfd-z-40" />
	);
};

const SetAsSiteLogoAction = () => {
	const { logos, selectedLogo, siteLogo } = useSelect( ( select ) => {
		return {
			logos: select( nfdOnboardingStore ).getLogos(),
			selectedLogo: select( nfdOnboardingStore ).getSelectedLogo(),
			siteLogo: select( nfdOnboardingStore ).getLogo(),
		};
	} );

	const { status, setSiteLogo } = useContext( LogoGenSetSiteLogoHookContext );

	const isSelectedLogoTheSiteLogo = useCallback( () => {
		// False if there are no logos or no selected logo.
		if ( logos.length === 0 || ! selectedLogo ) {
			return false;
		}

		const selectedLogoId = logos.find( ( logo ) => logo.reference_id === selectedLogo )?.attachment_data?.id;

		// Return true if the selected logo is the site logo.
		return selectedLogoId === siteLogo?.id;
	}, [ logos, selectedLogo, siteLogo ] );

	const shouldBeDisabled = useCallback( () => {
		// Disable if there are no logos.
		if ( logos.length === 0 ) {
			return true;
		}

		// Disable if no logo is selected.
		if ( ! selectedLogo ) {
			return true;
		}

		// Disable if we're already setting the site logo.
		if ( status.isSettingSiteLogo ) {
			return true;
		}

		// Disabled if the selected logo is actually the site logo.
		if ( isSelectedLogoTheSiteLogo() && ! status.hasError ) {
			return true;
		}

		return false;
	}, [
		logos,
		selectedLogo,
		status.isSettingSiteLogo,
		status.hasError,
		isSelectedLogoTheSiteLogo,
	] );

	const handleSetAsSiteLogo = () => {
		setSiteLogo( {
			logoReferenceId: selectedLogo,
		} );
	};

	const getButtonText = useCallback( () => {
		// Setting site logo.
		if ( status.isSettingSiteLogo ) {
			return __( 'Setting site logo…', 'wp-module-onboarding' );
		}

		// Error.
		if ( status.hasError ) {
			return __( 'Failed. Try again.', 'wp-module-onboarding' );
		}

		// Current site logo.
		if ( isSelectedLogoTheSiteLogo() ) {
			return __( 'Current site logo', 'wp-module-onboarding' );
		}
		return __( 'Set as site logo', 'wp-module-onboarding' );
	}, [
		isSelectedLogoTheSiteLogo,
		status.isSettingSiteLogo,
		status.hasError,
	] );

	return (
		<>
			<SettingSiteLogoStatusOverlay
				isSettingSiteLogo={ status.isSettingSiteLogo }
				message={ status.message }
				hasError={ status.hasError }
			/>
			<Button
				disabled={ shouldBeDisabled() }
				className={ classNames(
					'nfd-button--enhanced nfd-z-50',
					status.isSettingSiteLogo && 'nfd-bg-slate-600',
					status.hasError && 'nfd-bg-red-600',
					isSelectedLogoTheSiteLogo() && 'nfd-bg-green-600',
				) }
				onClick={ handleSetAsSiteLogo }
				isLoading={ status.isSettingSiteLogo }
			>
				{ getButtonText() }
			</Button>
		</>
	);
};

const GenerateMoreLogosAction = () => {
	const [ isLoading, setIsLoading ] = useState( false );
	const { logos } = useSelect( ( select ) => {
		return {
			logos: select( nfdOnboardingStore ).getLogos(),
		};
	} );

	const getBatchVersion = useCallback( () => {
		if ( logos.length < 4 ) {
			return 1;
		}

		if ( logos.length < 7 ) {
			return 2;
		}

		return 3;
	}, [ logos ] );

	const shouldBeDisabled = useCallback( () => {
		// True if we're in loading state.
		if ( isLoading ) {
			return true;
		}

		// True if we have any logos in pending status.
		if ( logos.some( ( logo ) => LOGOGEN_PENDING_STATES.includes( logo.status ) ) ) {
			return true;
		}

		// True if we're in the third batch
		if ( logos.length > 6 ) {
			return true;
		}

		// False otherwise.
		return false;
	}, [ logos, isLoading ] );

	const shouldRender = useCallback( () => {
		// False if there are no logos.
		if ( logos.length === 0 ) {
			return false;
		}
		// False if we're still in the first batch and it hasn't resolved yet.
		if ( logos.length < 4 ) {
			const logosPending = logos.some( ( logo ) => LOGOGEN_PENDING_STATES.includes( logo.status ) );
			return ! logosPending;
		}
		// False if we have more than 6 logos.
		if ( logos.length > 6 ) {
			return false;
		}

		// True otherwise.
		return true;
	}, [ logos ] );

	const getButtonText = useCallback( () => {
		if ( getBatchVersion() === 1 ) {
			return __( 'Generate more (3) 3/9', 'wp-module-onboarding' );
		}

		if ( getBatchVersion() === 2 ) {
			return __( 'Generate more (3) 6/9', 'wp-module-onboarding' );
		}

		return __( 'Generate more (3) 9/9', 'wp-module-onboarding' );
	}, [ getBatchVersion ] );

	const handleGenerateMoreLogos = async () => {
		setIsLoading( true );
		await generateMoreLogos();
		setIsLoading( false );
	};

	if ( ! shouldRender() ) {
		return null;
	}

	return (
		<div className={ classNames(
			'nfd-w-full nfd-flex nfd-justify-center',
			getBatchVersion() === 1 && 'nfd-pt-8',
			getBatchVersion() === 2 && 'nfd-pt-5',
			getBatchVersion() === 3 && 'nfd-p-0',
		) }>
			<Button
				variant="secondary"
				size="large"
				disabled={ shouldBeDisabled() }
				onClick={ handleGenerateMoreLogos }
				isLoading={ isLoading }
			>
				<SquaresPlusIcon
					className="nfd-w-5 nfd-h-5 nfd-mr-2"
				/>
				<span>
					{ getButtonText() }
				</span>
			</Button>
		</div>
	);
};

const Footer = () => {
	return (
		<div className="nfd-flex nfd-items-center nfd-justify-between nfd-mt-auto">
			<Survey />
			<SetAsSiteLogoAction />
		</div>
	);
};

/**
 * Render the reference id for support purposes.
 *
 * @param {string} referenceId - The reference id to display.
 * @return {React.ReactNode} The reference id span element.
 */
const LogoGenReferenceId = ( { referenceId } ) => {
	if ( ! referenceId ) {
		return null;
	}

	return (
		<span className="nfd-text-slate-400 nfd-text-[10px] nfd-absolute nfd-bottom-2 nfd-left-2">{ '#' + referenceId }</span>
	);
};

/**
 * The LogoGen Logos.
 *
 * @return {React.ReactNode} The logos component.
 */
const Logos = () => {
	const [ previewLogoReferenceId, setPreviewLogoReferenceId ] = useState( null );
	const { logos, selectedLogo, logogenReferenceId } = useSelect( ( select ) => {
		return {
			logos: select( nfdOnboardingStore ).getLogos(),
			selectedLogo: select( nfdOnboardingStore ).getSelectedLogo(),
			logogenReferenceId: select( nfdOnboardingStore ).getLogogenReferenceId(),
		};
	} );

	useEffect( () => {
		// if any of the logos are generating, check status every 5 seconds
		checkLogogenStatus();
	}, [ logos.length ] );

	const handleSelect = ( logoReferenceId ) => {
		// Only update new values.
		if ( selectedLogo === logoReferenceId ) {
			return;
		}

		dispatch( nfdOnboardingStore ).setSelectedLogo( logoReferenceId );
	};

	const handlePreview = ( logoReferenceId ) => {
		setPreviewLogoReferenceId( logoReferenceId );
	};

	const handleClosePreview = () => {
		setPreviewLogoReferenceId( null );
	};

	return (
		<div className="nfd-onboarding-logogen-content-logos nfd-flex nfd-flex-col nfd-w-full nfd-gap-6 nfd-h-full">
			<Header />
			<div className="nfd-grid nfd-grid-cols-3 nfd-gap-8 nfd-w-full">
				{ logos.map( ( logo, index ) => (
					<LogoCard
						key={ logo.reference_id || index }
						status={ logo.status }
						logoReferenceId={ logo.reference_id }
						style={ logo.style }
						src={ logo.src }
						selectedSrc={ logo.selected_src }
						isSelected={ selectedLogo === ( logo?.reference_id || false ) }
						onSelect={ handleSelect }
						onPreview={ handlePreview }
					/>
				) ) }
			</div>
			<GenerateMoreLogosAction />
			<Footer />
			<LogoGenReferenceId referenceId={ logogenReferenceId } />
			<PreviewLightbox
				logos={ logos }
				activeLogoReferenceId={ previewLogoReferenceId }
				onClose={ handleClosePreview }
			/>
		</div>
	);
};

export default Logos;
