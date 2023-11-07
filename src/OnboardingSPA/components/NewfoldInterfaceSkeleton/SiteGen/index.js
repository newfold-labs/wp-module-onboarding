import NewfoldInterfaceSkeleton from '../index';
import Header from '../../Header';
import Content from '../../Content';
import Sidebar from '../../Sidebar';
import classNames from 'classnames';

const SiteGen = () => {
	return (
		<NewfoldInterfaceSkeleton
			className={ classNames( 'nfd-onboarding-skeleton--sitegen', 'nfd-onboarding-sitegen' ) }
			header={ <Header /> }
			content={ <Content /> }
			sidebar={ <Sidebar /> }
		/>
	);
};

export default SiteGen;
