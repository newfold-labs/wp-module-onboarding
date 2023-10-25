import Content from '../../../OnboardingSPA/components/Content';
import HeaderSiteGen from '../HeaderSiteGen';
import ToggleDarkMode from '../ToggleDarkMode';
import AdminBarSiteGen from '../AdminBarSiteGen';
import ProgressBarSiteGen from '../ProgressBarSiteGen';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
import { kebabCase } from 'lodash';
import { useViewportMatch } from '@wordpress/compose';
import { SlotFillProvider } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { FullscreenMode } from '@wordpress/interface';
import SiteGenInterfaceSkeleton from '../SiteGenInterfaceSkeleton';

const AppSiteGen = () => {
	const location = useLocation();
	const isLargeViewport = useViewportMatch( 'medium' );
	const pathname = kebabCase( location.pathname );

	return (
		<Fragment>
			<FullscreenMode isActive={ true } />
			<SlotFillProvider>
				<SiteGenInterfaceSkeleton
					className={ classNames(
						'nfd-sitegen-skeleton',
						`brand-sitegen`,
						`path-${ pathname }`,
						{ 'is-large-viewport': isLargeViewport },
						{ 'is-small-viewport': ! isLargeViewport }
					) }
					adminbar={ <AdminBarSiteGen /> }
					progressbar={
						<ProgressBarSiteGen current={ 20 } total={ 100 } />
					}
					header={ <HeaderSiteGen /> }
					content={ <Content /> }
					darkModeToggle={ <ToggleDarkMode /> }
				/>
			</SlotFillProvider>
		</Fragment>
	);
};

export default AppSiteGen;
