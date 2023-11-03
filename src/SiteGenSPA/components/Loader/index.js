import getContents from './contents';
import { addThemeSuffix } from '../../utils/helper';
import { useEffect, useState } from '@wordpress/element';

const Loader = () => {
	let statusIdx = 0;
	const percentage = 70;
	const content = getContents();
	const [ status, setStatus ] = useState( content.status[ statusIdx ].title );

	useEffect( () => {
		const statusTimer = setInterval( () => {
			statusIdx += 1;
			if ( statusIdx === content.status.length ) statusIdx = 0;
			setStatus( content.status[ statusIdx ].title );
		}, 3000 );
		return () => {
			clearInterval( statusTimer );
		};
	}, [] );

	return (
		<div className={ addThemeSuffix( 'nfd-sg-loader' ) }>
			<div className={ addThemeSuffix( 'nfd-sg-loader__title' ) }>
				{ content.title }
			</div>
			<div className={ addThemeSuffix( 'nfd-sg-loader__progress' ) }>
				<div
					className={ addThemeSuffix( 'nfd-sg-loader__progress_bg' ) }
				/>
				<div
					className={ addThemeSuffix(
						'nfd-sg-loader__progress_bar'
					) }
					style={ { width: `${ 60 * percentage * 0.01 }vw` } }
				/>
			</div>
			<div
				className={ addThemeSuffix( 'nfd-sg-loader__status' ) }
			>{ `${ status }...` }</div>
		</div>
	);
};

export default Loader;
