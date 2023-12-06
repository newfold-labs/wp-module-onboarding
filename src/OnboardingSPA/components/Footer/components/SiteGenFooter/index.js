import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { Fill } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';

import ToggleDarkMode from '../../../ToggleDarkMode';
import { store as nfdOnboardingStore } from '../../../../store';
import {
	FOOTER_SITEGEN,
	FOOTER_START,
	FOOTER_END,
} from '../../../../../constants';
import NextButtonSiteGen from '../../../Button/NextButtonSiteGen';

const SiteGenFooter = () => {
	const isLargeViewport = useViewportMatch( 'small' );
	const { footerNavEnabled } = useSelect( ( select ) => {
		return {
			footerNavEnabled:
				select( nfdOnboardingStore ).getFooterNavEnabled(),
		};
	} );

	return (
		<>
			<Fill name={ `${ FOOTER_SITEGEN }/${ FOOTER_START }` }>
				<ToggleDarkMode />
			</Fill>
			{ ! isLargeViewport && (
				<Fill name={ `${ FOOTER_SITEGEN }/${ FOOTER_END }` }>
					<NextButtonSiteGen
						text={ __( 'Next', 'wp-module-onboarding' ) }
						disabled={ ! footerNavEnabled }
					/>
				</Fill>
			) }
		</>
	);
};

export default SiteGenFooter;
