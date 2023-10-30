import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import AdminBar from '../AdminBar';
import ProgressBar from '../ProgressBar';
import Header from '../Header';
import Content from '../../../OnboardingSPA/components/Content';
import ToggleDarkMode from '../ToggleDarkMode';

// eslint-disable-next-line import/no-extraneous-dependencies
import { kebabCase } from 'lodash';
import { useViewportMatch } from '@wordpress/compose';
import { SlotFillProvider } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { FullscreenMode } from '@wordpress/interface';
import SiteGenInterfaceSkeleton from '../SiteGenInterfaceSkeleton';
import { ThemeProvider } from '../ThemeContextProvider';

const AppSiteGen = () => {
	const location = useLocation();
	const isLargeViewport = useViewportMatch( 'medium' );
	const pathname = kebabCase( location.pathname );

	return (
		<Fragment>
			<ThemeProvider>
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
						adminbar={ <AdminBar /> }
						progressbar={
							<ProgressBar current={ 20 } total={ 100 } />
						}
						header={ <Header /> }
						content={ <Content /> }
						darkModeToggle={ <ToggleDarkMode /> }
						footer={ <ToggleDarkMode /> }
					/>
				</SlotFillProvider>
			</ThemeProvider>
		</Fragment>
	);
};

export default AppSiteGen;
