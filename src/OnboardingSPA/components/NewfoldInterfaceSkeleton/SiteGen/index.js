import NewfoldInterfaceSkeleton from '../index';
import Header from '../../Header';
import Content from '../../Content';
import Sidebar from '../../Sidebar';
import ToggleDarkMode from '../../ToggleDarkMode';
import { ThemeProvider } from '../../ThemeContextProvider';
import themeToggleHOC from '../themeToggleHOC';

// Wrapping the NewfoldInterfaceSkeleton with the HOC to make theme available
const ThemedNewfoldInterfaceSkeleton = themeToggleHOC(
	NewfoldInterfaceSkeleton,
	'nfd-onboarding-sitegen-dark',
	'nfd-onboarding-sitegen-light'
);

const SiteGen = () => {
	return (
		<ThemeProvider>
			<ThemedNewfoldInterfaceSkeleton
				className={ 'nfd-onboarding-skeleton--sitegen' }
				header={ <Header /> }
				content={ <Content /> }
				sidebar={ <Sidebar /> }
				footer={ <ToggleDarkMode /> }
			/>
		</ThemeProvider>
	);
};

export default SiteGen;
