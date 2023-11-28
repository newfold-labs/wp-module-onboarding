import NewfoldInterfaceSkeleton from '../index';
import Header from '../../Header';
import Content from '../../Content';
import Sidebar from '../../Sidebar';
import ToggleDarkMode from '../../ToggleDarkMode';
import { ThemeProvider } from '../../ThemeContextProvider';
import themeToggleHOC from '../themeToggleHOC';
import { store as nfdOnboardingStore } from '../../../store';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import classNames from 'classnames';

// Wrapping the NewfoldInterfaceSkeleton with the HOC to make theme available
const ThemedNewfoldInterfaceSkeleton = themeToggleHOC(
	NewfoldInterfaceSkeleton,
	'nfd-onboarding-sitegen-dark',
	'nfd-onboarding-sitegen-light'
);

const SiteGen = () => {
	const { newfoldBrand } = useSelect( ( select ) => {
		return {
			newfoldBrand: select( nfdOnboardingStore ).getNewfoldBrand(),
		};
	}, [] );

	useEffect( () => {
		document.body.classList.add( `nfd-brand-${ newfoldBrand }` );
	}, [ newfoldBrand ] );

	return (
		<ThemeProvider>
			<ThemedNewfoldInterfaceSkeleton
				className={ classNames(
					'nfd-onboarding-skeleton--sitegen',
					`brand-${ newfoldBrand }`
				) }
				header={ <Header /> }
				content={ <Content /> }
				sidebar={ <Sidebar /> }
				footer={ <ToggleDarkMode /> }
			/>
		</ThemeProvider>
	);
};

export default SiteGen;
