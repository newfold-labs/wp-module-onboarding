import { useViewportMatch } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../store';
import CommonLayout from '../../components/Layouts/Common';
import HeadingWithSubHeading from './headingwithsubheading';
import getContents from './contents';

const StepSiteGenGetStarted = () => {
	const isLargeViewport = useViewportMatch( 'medium' );

	const { setIsDrawerOpened, setIsHeaderNavigationEnabled } =
		useDispatch( nfdOnboardingStore );

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setIsHeaderNavigationEnabled( true );
	}, [] );

	const content = getContents();

	return (
		<CommonLayout isVerticallyCentered>
			<HeadingWithSubHeading
				title={ content.heading }
				subtitle={ content.subheading }
			/>
		</CommonLayout>
	);
};

export default StepSiteGenGetStarted;
