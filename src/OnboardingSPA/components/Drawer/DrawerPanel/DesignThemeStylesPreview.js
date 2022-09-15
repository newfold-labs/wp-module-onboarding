import { store as nfdOnboardingStore } from '../../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect, useRef } from '@wordpress/element';
import LivePreview from '../../../components/LivePreview';

import { check, Icon } from '@wordpress/icons';
import { getPatterns } from '../../../utils/api/patterns';
import { getGlobalStyles } from '../../../utils/api/themes';

import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';

const DesignThemeStylesPreview = () => {
    const MAX_PREVIEWS_PER_ROW = 3;
    const scrollRef = useRef();
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ pattern, setPattern ] = useState();
	const [ globalStyles, setGlobalStyles ] = useState();
	const [ selectedStyle, setSelectedStyle ] = useState( '' );

	const { currentStep, nextStep, currentData } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
			nextStep: select( nfdOnboardingStore ).getNextStep(),
            currentData: select(nfdOnboardingStore).getCurrentOnboardingData(),
		};
	}, [] );

    const {
        updatePreviewSettings,
        setCurrentOnboardingData
	} = useDispatch( nfdOnboardingStore );

    useEffect(() => {
        setSelectedStyle(currentData.data['theme']['variation']);
    }, [])

	const getStylesAndPatterns = async () => {
		const pattern = await getPatterns( currentStep.patternId, true );
		const globalStyles = await getGlobalStyles();
		setPattern( pattern?.body );
		setGlobalStyles( globalStyles?.body );
        const previewSettings = globalStyles?.body.filter((globalStyle) => {
            return globalStyle['title'] === currentData.data['theme']['variation']
        })[0];
        console.log(previewSettings)
        const updatedPreviewSettings = useGlobalStylesOutput( previewSettings );
        updatePreviewSettings(updatedPreviewSettings);
		setIsLoaded( true );
	};

	useEffect( () => {
		if ( ! isLoaded ) getStylesAndPatterns();
	}, [ isLoaded ] );
    

	const handleClick = ( idx ) => {
        const previewSettings = globalStyles[idx];
        const updatedPreviewSettings = useGlobalStylesOutput( previewSettings );
        updatePreviewSettings(updatedPreviewSettings);
        setSelectedStyle( globalStyles[idx]['title'] );
	};

    const buildPreviews = () => {
		return globalStyles?.map( ( globalStyle, idx ) => {
			return (
				<div
					className="theme-styles-preview--drawer__list__item"
					onClick={ () => handleClick( idx ) }
				>
					<div className="theme-styles-preview--drawer__list__item__title-bar">
						<div className="theme-styles-preview--drawer__list__title-bar__browser">
							<span
								className="theme-styles-preview--drawer__list__item__title-bar__browser__dot"
								style={ { background: '#989EA7' } }
							></span>
							<span
								className="theme-styles-preview--drawer__list__item__title-bar__browser__dot"
								style={ { background: '#989EA7' } }
							></span>
							<span
								className="theme-styles-preview--drawer__list__item__title-bar__browser__dot"
								style={ { background: '#989EA7' } }
							></span>
						</div>
						<div
							className={ `${
								globalStyles[idx]['title'] == selectedStyle
									? 'theme-styles-preview--drawer__list__item__title-bar--selected'
									: 'theme-styles-preview--drawer__list__item__title-bar--unselected'
							}` }
						>
							<Icon
								className="theme-styles-preview--drawer__list__item__title-bar--selected__path"
								icon={ check }
								size={ 64 }
							/>
						</div>
					</div>
					<div className="theme-styles-preview--drawer__list__item__live-preview-container">
						<LivePreview
							blockGrammer={ pattern }
							viewportWidth={ 900 }
							styling={ 'custom' }
							previewSettings={ globalStyle }
						/>
					</div>
				</div>
			);
		} );

		return previews;
	};
    

    return (
			<div className="theme-styles-preview--drawer">
				<div className="theme-styles-preview--drawer__list">
					{ globalStyles ? buildPreviews().slice( 0, MAX_PREVIEWS_PER_ROW ) : '' }
				</div>
				<div className="theme-styles-preview--drawer__list">
					{ globalStyles
						? buildPreviews().slice( MAX_PREVIEWS_PER_ROW, globalStyles.length )
						: '' }
				</div>
			</div>
	);
}

export default DesignThemeStylesPreview;