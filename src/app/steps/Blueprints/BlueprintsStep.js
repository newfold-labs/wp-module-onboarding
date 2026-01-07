import missingResourceFigureUrl from '@/assets/nfd-missing-resource.png';
import { SiteGenPreviewCard, Step } from '@/components';
import { nfdOnboardingStore } from '@/data/store';
import { canAccessBlueprints } from '@/utils/helpers';
import { Container, Spinner, Title } from '@newfold/ui-component-library';
import { dispatch, useSelect } from '@wordpress/data';
import { useMemo, useState, useCallback, useEffect } from '@wordpress/element';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
/**
 * Tabs buttons component.
 *
 * @param {Object} props           - The component props.
 * @param {string} props.activeTab - The active tab.
 * @return {JSX.Element}           - The Tabs buttons component.
 */
const Tabs = ( { activeTab } ) => {
	const tabs = [
		{
			label: __( 'Commerce', 'wp-module-onboarding' ),
			value: 'ecommerce',
		},
		{
			label: __( 'Business', 'wp-module-onboarding' ),
			value: 'business',
		},
		{
			label: __( 'Blog', 'wp-module-onboarding' ),
			value: 'personal',
		},
		{
			label: __( 'Link in bio', 'wp-module-onboarding' ),
			value: 'linkinbio',
		},
	];

	return (
		<div className="nfd-flex nfd-gap-8 nfd-border-b nfd-border-[#E5E7EB]">
			{ tabs.map( ( tab ) => (
				<button
					key={ tab.value }
					className={ classNames(
						'nfd-bg-transparent nfd-py-3 nfd-px-0 nfd-text-base nfd-font-semibold nfd-relative nfd-border-b-2 nfd-transition-colors',
						activeTab === tab.value
							? 'nfd-text-primary nfd-border-primary'
							: 'nfd-text-[#6B7280] nfd-border-transparent hover:nfd-text-[#374151]'
					) }
					onClick={ () => {
						dispatch( nfdOnboardingStore ).setActiveTab( tab.value );
					} }
				>
					{ tab.label }
				</button>
			) ) }
		</div>
	);
};

const BlueprintsStep = () => {
	const navigate = useNavigate();
	const [ isLoading, setIsLoading ] = useState( true );
	const { blueprints, activeTab, sitegenHasFailed } = useSelect( ( select ) => {
		const resolve = {
			blueprints: select( nfdOnboardingStore ).getBlueprints(),
			activeTab: select( nfdOnboardingStore ).getActiveTab() || 'ecommerce',
			sitegenHasFailed: select( nfdOnboardingStore ).getSitegenHasFailed(),
		};
		setIsLoading( false );
		return resolve;
	}, [] );

	const handleNext = useCallback( () => {
		navigate( '/blueprints-canvas', {
			state: { direction: 'forward' },
		} );
	}, [ navigate ] );

	const handleOnPreview = useCallback(
		( slug ) => {
			dispatch( nfdOnboardingStore ).setSelectedBlueprint( slug );
			handleNext();
		},
		[ handleNext ]
	);

	const renderBlueprints = useMemo( () => {
		const filteredBlueprints = blueprints.filter( ( blueprint ) => blueprint.type === activeTab );

		// Render error state if no blueprints are found.
		if ( filteredBlueprints.length === 0 ) {
			return (
				<div className="nfd-flex nfd-flex-col nfd-justify-center nfd-items-center nfd-max-w-[450px] nfd-mx-auto nfd-h-full">
					<img
						src={ missingResourceFigureUrl }
						alt={ __( 'Missing Resource', 'wp-module-onboarding' ) }
						className="nfd-object-contain nfd-aspect-[270/207]"
						width="240"
						height="auto"
					/>
					<div className="nfd-text-center nfd-mt-6">
						<Title
							as="h3"
							className="nfd-text-lg mobile:nfd-text-lg nfd-text-content-default nfd-mb-2"
						>
							{ __( 'Oops! No templates found for this category.', 'wp-module-onboarding' ) }
						</Title>
						<p className="nfd-text-tiny nfd-text-content-default">
							{ __(
								'This category is currently unavailable. Please try again later or select a different category.',
								'wp-module-onboarding'
							) }
						</p>
					</div>
				</div>
			);
		}

		// Sort blueprints by ID descending to show latest first
		const sortedBlueprints = [ ...filteredBlueprints ].sort( ( a, b ) => {
			return ( b.id || 0 ) - ( a.id || 0 );
		} );

		// Render blueprints.
		return (
			<div className="nfd-grid nfd-grid-cols-4 nfd-gap-6 tablet:nfd-grid-cols-2 mobile:nfd-grid-cols-1 mobile:nfd-justify-items-center">
				{ sortedBlueprints.map( ( blueprint, index ) => (
					<SiteGenPreviewCard
						key={ blueprint.id }
						screenshot={ blueprint.screenshot_url }
						frameName={ blueprint.slug }
						frameSrc={ blueprint.preview_url }
						isLoading={ false }
						overlay={ true }
						width="280px"
						height="350px"
						onPreview={ handleOnPreview }
						title={ blueprint.title || blueprint.name || blueprint.slug }
						isNew={ index < 3 }
					/>
				) ) }
			</div>
		);
	}, [ activeTab, blueprints, handleOnPreview ] );

	// Redirect to fork page if brand doesn't have access to blueprints
	useEffect( () => {
		if ( ! canAccessBlueprints() ) {
			navigate( '/', { replace: true } );
		}
	}, [ navigate ] );

	const LoadingState = () => {
		return (
			<div className="nfd-flex nfd-justify-center nfd-items-center nfd-h-full">
				<Spinner size="8" variant="primary" />
			</div>
		);
	};

	/**
	 * Component styles override.
	 */
	const getCustomStyles = () => {
		return (
			<style>
				{ `
					.nfd-onboarding-body {
						padding-top: 2rem !important;
						background-color: #F9FAFB !important;
					}
					
					/* Responsive container adjustments */
					@media (min-width: 1024px) and (max-width: 1350px) {
						.nfd-onboarding-step-intro {
							min-width: 90% !important;
							max-width: 90% !important;
						}
					}
				` }
			</style>
		);
	};

	// Don't render anything if brand doesn't have access
	if ( ! canAccessBlueprints() ) {
		return null;
	}

	return (
		<Step>
			<Container className="nfd-onboarding-step-container nfd-onboarding-step-intro nfd-w-[1440px] nfd-max-w-[90vw] tablet:nfd-w-full tablet:nfd-max-w-full tablet:nfd-px-6 mobile:nfd-px-4">
				{ getCustomStyles() }
				<Container.Header>
					<div className="nfd-flex nfd-flex-col nfd-gap-4 nfd-items-center nfd-text-center nfd-mb-8">
						{ sitegenHasFailed ? (
							<>
								<Title
									as="h1"
									className="nfd-text-4xl nfd-text-[#111827] mobile:nfd-text-3xl nfd-font-bold nfd-leading-tight"
								>
									{ __( "Sorry, let's try a different approach.", 'wp-module-onboarding' ) }
								</Title>
								<p className="nfd-text-base nfd-text-[#6B7280] nfd-max-w-[600px]">
									{ __(
										"We're sorry, our site generation tool isn't working right now. In the meantime, here are our beautifully designed starter templates to get you started. Choose your favorite — we'll guide you through customizing it!",
										'wp-module-onboarding'
									) }
								</p>
							</>
						) : (
							<>
								<Title
									as="h1"
									className="nfd-text-4xl nfd-text-[#111827] mobile:nfd-text-3xl nfd-font-bold nfd-leading-tight"
								>
									{ __( 'Pick the best Starter Template for your needs', 'wp-module-onboarding' ) }
								</Title>
								<p className="nfd-text-base nfd-text-[#030303] nfd-max-w-[540px]">
									{ __(
										"We'll set up your WordPress site in no time — then it's your turn to make it truly yours with easy customizations.",
										'wp-module-onboarding'
									) }
								</p>
							</>
						) }
					</div>
				</Container.Header>

				<Container.Block className="nfd-p-0">
					{ isLoading ? (
						<LoadingState />
					) : (
						<div className="nfd-flex nfd-flex-col nfd-gap-10">
							<Tabs activeTab={ activeTab } />
							{ renderBlueprints }
						</div>
					) }
				</Container.Block>
			</Container>
		</Step>
	);
};

export default BlueprintsStep;
