import CommonLayout from '../../../components/Layouts/Common';
import { VIEW_DESIGN_COLORS } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import LivePreview from '../../../components/LivePreview';

const StepDesignColors = () => {
	const { setDrawerActiveView, setIsDrawerOpened } =
	     useDispatch( nfdOnboardingStore );

	// [TODO] Once design is finalized replace this with block grammer from API's/files.
	const blockGrammer = `<!-- wp:group {"align":"full","layout":{"inherit":true}} -->
     <div class="wp-block-group alignfull"><!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"bottom":"var(--wp--custom--spacing--large, 8rem)","top":"var(--wp--custom--spacing--small, 1.25rem)"}}},"layout":{"type":"flex","justifyContent":"space-between"}} -->
     <div class="wp-block-group alignwide" style="padding-top:var(--wp--custom--spacing--small, 1.25rem);padding-bottom:var(--wp--custom--spacing--large, 8rem)"><!-- wp:group {"layout":{"type":"flex"}} -->
     <div class="wp-block-group">
     <!-- wp:site-logo {"width":64} /-->

     <!-- wp:site-title {"style":{"typography":{"fontStyle":"italic","fontWeight":"400"}}} /--></div>
     <!-- /wp:group -->

     <!-- wp:navigation {"layout":{"type":"flex","setCascadingProperties":true,"justifyContent":"right"}} -->
     <!-- wp:page-list {"isNavigationChild":true,"showSubmenuIcon":true,"openSubmenusOnClick":false} /-->
     <!-- /wp:navigation --></div>
     <!-- /wp:group --></div>
     <!-- /wp:group -->`;

	useEffect( () => {
		setIsDrawerOpened( true );
		setDrawerActiveView( VIEW_DESIGN_COLORS );
	}, [] );
	return (
		<CommonLayout>
			<LivePreview blockGrammer={ blockGrammer } styling={ 'custom' } viewportWidth={ 1300 } />
		</CommonLayout>
	);
};

export default StepDesignColors;
