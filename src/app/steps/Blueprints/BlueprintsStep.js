import { useMemo } from '@wordpress/element';
import { dispatch, useSelect } from '@wordpress/data';
import classNames from 'classnames';
import { Container, Spinner, Title } from '@newfold/ui-component-library';
import { SiteGenPreviewCard, Step, Navigate } from '@/components';
import { nfdOnboardingStore } from '@/data/store';
import missingResourceFigureUrl from '@/assets/nfd-missing-resource.png';

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
	];

	return (
		<div className="nfd-flex nfd-gap-8 nfd-border-b nfd-border-[#EDEFF0]">
			{ tabs.map( ( tab ) => (
				<button
					key={ tab.value }
					className={ classNames(
						'nfd-bg-transparent nfd-py-4 nfd-px-1 nfd-text-tiny nfd-font-medium nfd-relative',
						activeTab === tab.value
							? '!nfd-text-primary after:nfd-content-[""] after:nfd-absolute after:nfd-bottom-[-1px] after:nfd-left-0 after:nfd-w-full after:nfd-h-[2px] after:nfd-bg-primary' : 'nfd-text-[#4A5565]',
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
	const [ isLoading, setIsLoading ] = useState( true );
	const { blueprints, activeTab } = useSelect( ( select ) => {
		const resolve = {
			blueprints: select( nfdOnboardingStore ).getBlueprints() || [],
			activeTab: select( nfdOnboardingStore ).getActiveTab() || 'ecommerce',
		};
		setIsLoading( false );
		return resolve;
	}, [] );

	const LoadingState = () => {
		return (
			<div className="nfd-flex nfd-justify-center nfd-items-center nfd-h-full">
				<Spinner
					size="8"
					variant="primary"
				/>
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
						padding-top: 3rem !important;
					}
				` }
			</style>
		);
	};

	const handleOnPreview = ( slug ) => {
		dispatch( nfdOnboardingStore ).setSelectedBlueprint( slug );
	};

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
						<p className="nfd-text-tiny nfd-text-content-default">{ __( 'This category is currently unavailable. Please try again later or select a different category.', 'wp-module-onboarding' ) }</p>
					</div>
				</div>
			);
		}

		// Render blueprints.
		return (
			<div className="nfd-grid nfd-grid-cols-3 nfd-gap-8">
				{ filteredBlueprints
					.map( ( blueprint ) => (
						<SiteGenPreviewCard
							key={ blueprint.id }
							screenshot={ blueprint.screenshot_url }
							frameName={ blueprint.slug }
							frameSrc={ blueprint.preview_url }
							isLoading={ false }
							overlay={ true }
							width="245px"
							height="295px"
							onPreview={ handleOnPreview }
						/>
					) )
				}
			</div>
		);
	}, [ activeTab, blueprints ] );

	return (
		<Step>
			<Container className="nfd-onboarding-step-container nfd-onboarding-step-intro nfd-min-w-[780px] nfd-max-w-[780px] tablet:nfd-min-w-[90%] tablet:nfd-max-w-[90%]">
				{ getCustomStyles() }
				<Container.Header>
					<div className="nfd-flex nfd-flex-col nfd-gap-3">
						<Title
							as="h3"
							className="nfd-text-lg mobile:nfd-text-lg nfd-text-[#66A3D2] nfd-font-serif nfd-italic"
						>
							{ __( "It's up to you!", 'wp-module-onboarding' ) }
						</Title>
						<Title
							as="h1"
							className="nfd-text-3xl nfd-text-content-default mobile:nfd-text-2xl"
						>
							{ __( 'Pick the best Starter Template for your needs', 'wp-module-onboarding' ) }
						</Title>
						<p className="nfd-text-tiny nfd-text-content-default">
							{ __(
								"Choose a template based on your goals — whether you're launching a shop, blog, portfolio, or business site. We'll set up your WordPress site in no time — then it's your turn to make it truly yours with easy customizations.",
								'wp-module-onboarding'
							) }
						</p>
					</div>
				</Container.Header>

				<Container.Block className="nfd-p-0">
					{ isLoading ? <LoadingState /> : (
						<div className="nfd-flex nfd-flex-col nfd-gap-9">
							<Tabs activeTab={ activeTab } />
							{ renderBlueprints }
						</div>
					) }
				</Container.Block>

				<Container.Footer className="nfd-p-0">
					<div className="nfd-flex nfd-justify-start nfd-border-t nfd-pt-8">
						<Navigate
							toRoute="/"
							direction="backward"
							variant="secondary"
						>
							{ __( 'Back', 'wp-module-onboarding' ) }
						</Navigate>
					</div>
				</Container.Footer>
			</Container>
		</Step>
	);
};

export default BlueprintsStep;
