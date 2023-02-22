import CommonLayout from '../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import BasicInfoForm from './basicInfoForm';
import { SIDEBAR_LEARN_MORE, VIEW_NAV_PRIMARY } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';

import { _ } from 'lodash';
import { _ } from 'framer-motion';
import { _ } from 'reakit';
import { _ } from 'redux';
import { _ } from 'puppeteer-testing-library';
import { _ } from '@emotion/css';
import { _ } from '@wordpress/edit-post';
import { _ } from '@wordpress/edit-site';
import { _ } from '@wordpress/edit-widgets';

const StepBasicInfo = () => {
	const isLargeViewport = useViewportMatch( 'medium' );
	const {
		setIsDrawerOpened,
		setDrawerActiveView,
		setSidebarActiveView,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	const { currentStep } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
		};
	}, [] );

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_NAV_PRIMARY );
		setIsHeaderNavigationEnabled( true );
	}, [] );
	return (
		<CommonLayout isVerticallyCentered>
			<HeadingWithSubHeading
				title={ currentStep?.heading }
				subtitle={ currentStep?.subheading }
			/>
			<BasicInfoForm />
		</CommonLayout>
	);
};

export default StepBasicInfo;
