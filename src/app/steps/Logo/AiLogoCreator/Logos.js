import { dispatch, useSelect } from '@wordpress/data';
import { Title, Button } from '@newfold/ui-component-library';
import { nfdOnboardingStore } from '@/data/store';
import { InlineAction, LogoCard } from '@/components';
import checkLogogenStatus from '@/utils/logogen/checkLogogenStatus';
import {
	HandThumbUpIcon as HandThumbUpIconOutline,
	HandThumbDownIcon as HandThumbDownIconOutline,
	SquaresPlusIcon,
} from '@heroicons/react/24/outline';
import {
	HandThumbUpIcon as HandThumbUpIconSolid,
	HandThumbDownIcon as HandThumbDownIconSolid,
} from '@heroicons/react/24/solid';
import { useCallback } from '@wordpress/element';
import { LOGOGEN_PENDING_STATES, LOGOGEN_STATES, generateMoreLogos } from '@/utils/logogen';
import classNames from 'classnames';

const Header = () => {
	return (
		<div className="nfd-flex nfd-flex-col nfd-gap-1">
			<Title as="h2" className="nfd-text-xl nfd-text-content-default">
				{ __( 'Pick Your Logo!', 'wp-module-onboarding' ) }
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

const SetAsSiteLogoAction = () => {
	const { logos, selectedLogo } = useSelect( ( select ) => {
		return {
			logos: select( nfdOnboardingStore ).getLogos(),
			selectedLogo: select( nfdOnboardingStore ).getSelectedLogo(),
		};
	} );

	return (
		<Button
			disabled={ ! selectedLogo || logos.length === 0 }
			className="nfd-button--enhanced"
		>
			{ __( 'Set as site logo', 'wp-module-onboarding' ) }
		</Button>
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
			return __( 'Generate more 1/3', 'wp-module-onboarding' );
		}

		if ( getBatchVersion() === 2 ) {
			return __( 'Generate more 2/3', 'wp-module-onboarding' );
		}

		return __( 'Generate more 3/3', 'wp-module-onboarding' );
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

	return (
		<div className="nfd-flex nfd-flex-col nfd-w-full nfd-gap-6 nfd-h-full">
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
					/>
				) ) }
			</div>
			<GenerateMoreLogosAction />
			<Footer />
			<LogoGenReferenceId referenceId={ logogenReferenceId } />
		</div>
	);
};

export default Logos;
