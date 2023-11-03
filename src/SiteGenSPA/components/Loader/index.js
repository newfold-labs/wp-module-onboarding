import getContents from './contents';
import { addThemeSuffix } from '../../utils/helper';
import { useEffect, useState } from '@wordpress/element';

const Loader = () => {
	let statusIdx = 0;
	const content = getContents();
	const [ percentage, setPercentage ] = useState( 0 );
	const [ status, setStatus ] = useState( content.status[ statusIdx ].title );

	const checkStatus = async () => {
		// Make fake API Call to get the status.
		if ( percentage !== 100 ) setPercentage( ( t ) => t + 10 );
	};

	useEffect( () => {
		const statusTimer = setInterval( () => {
			checkStatus();
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
					className={ addThemeSuffix(
						'nfd-sg-loader__progress_bars'
					) }
				>
					<div
						className={ addThemeSuffix(
							'nfd-sg-loader__progress_bars_bg'
						) }
					/>
					<div
						className={ addThemeSuffix(
							'nfd-sg-loader__progress_bars_bar'
						) }
						style={ { width: `${ percentage }%` } }
					/>
				</div>
			</div>
			<div
				className={ addThemeSuffix( 'nfd-sg-loader__status' ) }
			>{ `${ status }...` }</div>
		</div>
	);
};

export default Loader;
