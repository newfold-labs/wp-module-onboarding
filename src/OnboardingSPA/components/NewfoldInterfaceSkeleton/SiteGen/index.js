import NewfoldInterfaceSkeleton from '../index';
import Header from '../../Header';
import Content from '../../Content';
import Sidebar from '../../Sidebar';
import ToggleDarkMode from '../../ToggleDarkMode';
import { ThemeProvider } from '../../ThemeContextProvider';
import classNames from 'classnames';
import themeToggleHOC from '../themeToggleHOC';

// Wrap NewfoldInterfaceSkeleton with the HOC
const ThemedNewfoldInterfaceSkeleton = themeToggleHOC(
	NewfoldInterfaceSkeleton,
	'nfd-onboarding-sitegen-dark',
	'nfd-onboarding-sitegen-light'
  );

const SiteGen = () => {
	return (
		<ThemeProvider> 
			<ThemedNewfoldInterfaceSkeleton 
				className={classNames(
					'nfd-onboarding-skeleton--sitegen',
				)}
				header={ <Header /> }
				content={ <Content /> }
				sidebar={ <Sidebar /> }
				footer={ <ToggleDarkMode /> }
			/>
		</ThemeProvider> 
	);
};

export default SiteGen;
