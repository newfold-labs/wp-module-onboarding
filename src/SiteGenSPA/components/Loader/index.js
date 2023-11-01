import getContents from './contents';
import { addThemeSuffix } from '../../utils/helper';

const Loader = () => {
	const percentage = 50;
	const content = getContents();

	return (
		<div className={ addThemeSuffix( 'nfd-sg-loader' ) }>
			<div className={ addThemeSuffix( 'nfd-sg-loader__title' ) }>
				{ content.title }
			</div>
			<div
				className={ addThemeSuffix( 'nfd-sg-loader__progress' ) }
				style={ { width: `${ 320 * percentage * 0.01 }px` } }
			/>
			<div className={ addThemeSuffix( 'nfd-sg-loader__status' ) }></div>
		</div>
	);
};

export default Loader;
