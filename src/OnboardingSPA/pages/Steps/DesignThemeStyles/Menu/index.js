import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { check, search, Icon } from '@wordpress/icons';
import { useNavigate } from 'react-router-dom';
import { useViewportMatch } from '@wordpress/compose';

import { store as nfdOnboardingStore } from '../../../../store';
import CommonLayout from '../../../../components/Layouts/Common';
import LivePreview from '../../../../components/LivePreview';
import HeadingWithSubHeading from '../../../../components/HeadingWithSubHeading';
import { useGlobalStylesOutput } from '../../../../utils/global-styles/use-global-styles-output';
import { getPatterns } from '../../../../utils/api/patterns';
import { getGlobalStyles } from '../../../../utils/api/themes';
import { VIEW_DESIGN_THEME_STYLES_MENU } from '../../../../../constants';

const StepDesignThemeStylesMenu = () => {
	const MAX_PREVIEWS_PER_ROW = 3;

	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ pattern, setPattern ] = useState();
	const [ globalStyles, setGlobalStyles ] = useState();
	const [ selectedStyle, setSelectedStyle ] = useState();

    const navigate = useNavigate();
	const isLargeViewport = useViewportMatch( 'medium' );
	const { currentStep, nextStep, currentData } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
			nextStep: select( nfdOnboardingStore ).getNextStep(),
            currentData: select(nfdOnboardingStore).getCurrentOnboardingData()
		};
	}, [] );

	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsSidebarOpened,
		setIsDrawerSuppressed,
        updatePreviewSettings,
        setCurrentOnboardingData
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setIsSidebarOpened( false );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_DESIGN_THEME_STYLES_MENU );
	}, [] );

	const getStylesAndPatterns = async () => {
		const pattern = await getPatterns( currentStep.patternId, true );
		const globalStyles = await getGlobalStyles();
		setPattern( pattern?.body );
		setGlobalStyles( globalStyles?.body );
        setSelectedStyle(currentData.data['theme']['variation'])
		setIsLoaded( true );
	};

	useEffect( () => {
		if ( ! isLoaded ) getStylesAndPatterns();
	}, [ isLoaded ] );

	const handleClick = ( idx ) => {
        const selectedGlobalStyle = globalStyles[idx];
        updatePreviewSettings( useGlobalStylesOutput( selectedGlobalStyle ) );
		setSelectedStyle( selectedGlobalStyle['title'] );
        currentData.data['theme']['variation'] = selectedGlobalStyle['title']
        setCurrentOnboardingData( currentData );
		navigate( nextStep.path );
	};

	const buildPreviews = () => {
		return globalStyles?.map( ( globalStyle, idx ) => {
			return (
				<div
					className="theme-styles-menu__list__item"
					onClick={ () => handleClick( idx ) }
				>
					<div className="theme-styles-menu__list__item__title-bar">
						<div className="theme-styles-menu__list__title-bar__browser">
							<span
								className="theme-styles-menu__list__item__title-bar__browser__dot"
								style={ { background: '#989EA7' } }
							></span>
							<span
								className="theme-styles-menu__list__item__title-bar__browser__dot"
								style={ { background: '#989EA7' } }
							></span>
							<span
								className="theme-styles-menu__list__item__title-bar__browser__dot"
								style={ { background: '#989EA7' } }
							></span>
						</div>
						<div
							className={ `${
								globalStyles[idx]['title'] == selectedStyle
									? 'theme-styles-menu__list__item__title-bar--selected'
									: 'theme-styles-menu__list__item__title-bar--unselected'
							}` }
						>
							<Icon
								className="theme-styles-menu__list__item__title-bar--selected__path"
								icon={ check }
								size={ 64 }
							/>
						</div>
					</div>
					<div className="theme-styles-menu__list__item__live-preview-container">
						<LivePreview
							blockGrammer={ pattern }
							viewportWidth={ 900 }
							styling={ 'custom' }
							previewSettings={ globalStyle }
						/>
						<div className="theme-styles-menu__list__item__live-preview-container__overlay">
							<Icon
								className="theme-styles-menu__list__item__live-preview-container__overlay__icon"
								size={ 64 }
								icon={ search }
							/>
						</div>
					</div>
				</div>
			);
		} );
	};

	return (
		<CommonLayout>
			<div className="theme-styles-menu">
				<HeadingWithSubHeading
					title={ currentStep?.heading }
					subtitle={ currentStep?.subheading }
				/>
				<div className="theme-styles-menu__list">
					{ globalStyles ? buildPreviews().slice( 0, MAX_PREVIEWS_PER_ROW ) : '' }
				</div>
				<div className="theme-styles-menu__list">
					{ globalStyles
						? buildPreviews().slice( MAX_PREVIEWS_PER_ROW, globalStyles.length )
						: '' }
				</div>
			</div>
		</CommonLayout>
	);
};

export default StepDesignThemeStylesMenu;
