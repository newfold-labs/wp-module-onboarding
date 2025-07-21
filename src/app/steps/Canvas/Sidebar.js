import { dispatch, useSelect } from '@wordpress/data';
import { Title } from '@newfold/ui-component-library';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SiteGenPreviewCard } from '@/components';
import { nfdOnboardingStore } from '@/data/store';

const Header = () => {
	const handleCanvasSidebarToggle = () => {
		dispatch( nfdOnboardingStore ).setCanvasSidebarIsOpen( false );
	};

	return (
		<div className="nfd-onboarding-canvas-sidebar-header nfd-flex nfd-justify-between nfd-items-center nfd-p-4 nfd-border-b">
			<Title as="h3" level={ 3 }>
				{ __( 'Layouts', 'wp-module-onboarding' ) }
			</Title>
			<button
				type="button"
				title={ __( 'Close layouts sidebar', 'wp-module-onboarding' ) }
				aria-label={ __( 'Close layouts sidebar', 'wp-module-onboarding' ) }
				className="nfd-onboarding-canvas-sidebar-header-close nfd-rounded-sm hover:nfd-text-primary focus:nfd-text-primary focus:nfd-outline-none focus:nfd-ring-2 focus:nfd-ring-primary focus:nfd-ring-offset-2"
				onClick={ handleCanvasSidebarToggle }
			>
				<XMarkIcon className="nfd-w-5 nfd-h-5" />
			</button>
		</div>
	);
};

const Preview = ( { preview, tabIndex } ) => {
	const [ isLoading, setIsLoading ] = useState( true );

	const { selectedPreview } = useSelect( ( select ) => {
		return {
			selectedPreview: select( nfdOnboardingStore ).getSelectedHomepage(),
		};
	} );

	const getScreenshot = () => {
		if ( preview.screenshot ) {
			// Set 500ms delay to avoid abrupt flickering.
			setTimeout( () => {
				setIsLoading( false );
			}, 500 );
			return preview.screenshot;
		}
		return null;
	};

	const iframeOnLoad = () => {
		setTimeout( () => {
			// Set 500ms delay to allow the iframe to fully render.
			setIsLoading( false );
		}, 500 );
	};

	const handlePreview = () => {
		dispatch( nfdOnboardingStore ).setSelectedHomepage( preview.slug );
	};

	return (
		<SiteGenPreviewCard
			screenshot={ getScreenshot() }
			frameName={ preview.slug }
			frameSrc={ preview.iframeSrc }
			onFrameLoad={ iframeOnLoad }
			width={ 280 }
			height={ 170 }
			viewportWidth={ 1600 }
			viewportHeight={ '540%' }
			viewportScale={ 0.18 }
			overlay={ true }
			isLoading={ isLoading }
			tabIndex={ tabIndex }
			onPreview={ handlePreview }
			className={ selectedPreview === preview.slug ? 'nfd-border-2 nfd-border-primary-400' : '' }
		/>
	);
};

const Sidebar = () => {
	const { homepages, canvasSidebarIsOpen } = useSelect( ( select ) => {
		return {
			homepages: select( nfdOnboardingStore ).getHomepages(),
			canvasSidebarIsOpen: select( nfdOnboardingStore ).getCanvasSidebarIsOpen(),
		};
	} );

	const renderPreviews = () => {
		return Object.keys( homepages ).map( ( slug, idx ) => {
			return (
				<Preview
					key={ idx }
					preview={ homepages[ slug ] }
					tabIndex={ canvasSidebarIsOpen ? 0 : -1 }
				/>
			);
		} );
	};

	return (
		<div
			className={ `nfd-onboarding-canvas-sidebar nfd-h-full nfd-bg-white nfd-border-l nfd-overflow-y-auto nfd-transition-all nfd-duration-300 nfd-ease-in-out mobile:nfd-hidden ${
				canvasSidebarIsOpen
					? 'nfd-min-w-[325px] nfd-max-w-[325px] nfd-opacity-100'
					: 'nfd-min-w-0 nfd-max-w-0 nfd-opacity-0 nfd-overflow-hidden'
			}` }
			role="region"
			aria-label={ __( 'Layouts sidebar', 'wp-module-onboarding' ) }
			aria-hidden={ ! canvasSidebarIsOpen }
		>
			<Header />
			<div className="nfd-onboarding-canvas-sidebar-content nfd-flex nfd-flex-col nfd-gap-6 nfd-p-4">
				{ renderPreviews() }
			</div>
		</div>
	);
};

export default Sidebar;
