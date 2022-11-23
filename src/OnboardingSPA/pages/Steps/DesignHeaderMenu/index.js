import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { useViewportMatch } from '@wordpress/compose';

import { LivePreview } from '../../../components/LivePreview';
import CommonLayout from '../../../components/Layouts/Common';
import { DesignStateHandler } from '../../../components/StateHandlers';


import {
	VIEW_DESIGN_HEADER_MENU,
	THEME_STATUS_ACTIVE,
	THEME_STATUS_NOT_ACTIVE,
} from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';

const StepDesignHeaderMenu = () => {
	const location = useLocation();
	const { currentStep, currentData, storedPreviewSettings } = useSelect(
		( select ) => {
			return {
				currentStep: select( nfdOnboardingStore ).getStepFromPath(
					location.pathname
				),
				currentData: select( nfdOnboardingStore ).getCurrentOnboardingData(),
				storedPreviewSettings: select( nfdOnboardingStore ).getPreviewSettings(),
			};
		},
		[]
	);
	
	const isLargeViewport = useViewportMatch( 'medium' );

	console.log(currentData);
	const pattern = '<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"15px","bottom":"15px"}}},"backgroundColor":"secondary-background","textColor":"secondary-foreground","layout":{"inherit":true}} --><div class="wp-block-group alignfull has-secondary-foreground-color has-secondary-background-background-color has-text-color has-background" style="padding-top:15px;padding-bottom:15px">        <!-- wp:group {"style":{"spacing":{"blockGap":"30px"}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"right"}} -->        <div class="wp-block-group">          </div>        <!-- /wp:group -->       <!-- wp:group {"layout":{"type":"flex","orientation":"vertical","justifyContent":"center"}} -->      <div class="wp-block-group">           <!-- wp:site-logo {"width":250} /-->          <!-- wp:navigation {"style":{"typography":{"textTransform":"uppercase"}},"fontSize":"x-small"} /-->      </div>        <!-- /wp:group --></div><!-- /wp:group -->';

	const { 
		setDrawerActiveView, 
		setIsDrawerOpened, 
		setIsDrawerSuppressed,
		setIsSidebarOpened 
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setIsSidebarOpened( false );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_DESIGN_HEADER_MENU );
	}, [] );

	return (
		<DesignStateHandler>
			<CommonLayout className="theme-header-menu-preview">
				<div className="theme-header-menu-preview__title-bar">
					<div className="theme-header-menu-preview__title-bar__browser">
						<span className="theme-header-menu-preview__title-bar__browser__dot"></span>
						<span className="theme-header-menu-preview__title-bar__browser__dot"></span>
						<span className="theme-header-menu-preview__title-bar__browser__dot"></span>
					</div>
				</div>
				<div className="theme-header-menu-preview__live-preview-container">
					{ pattern && (
						<LivePreview
							blockGrammer={ pattern }
							styling={ 'custom' }
							viewportWidth={ 1300 }
							skeletonLoadingTime={ false }
						/>
					) }
				</div>
			</CommonLayout>
		</DesignStateHandler>
	);
};

export default StepDesignHeaderMenu;
