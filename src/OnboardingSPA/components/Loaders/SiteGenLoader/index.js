import getContents from './contents';
import { useSelect } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { memo, useEffect, useState } from '@wordpress/element';
import { store as nfdOnboardingStore } from '../../../store';

const SiteGenLoader = ( { customNavPercentage, watcher = null } ) => {
	let statusIdx = 0;
	const content = getContents();
	const navigate = useNavigate();
	const [ percentage, setPercentage ] = useState( 0 );
	const [ status, setStatus ] = useState( content.status[ statusIdx ].title );

	const { currentData, nextStep } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			nextStep: select( nfdOnboardingStore ).getNextStep(),
		};
	} );

	useEffect( () => {
		const statusTimer = setInterval( () => {
			statusIdx += 1;
			if ( statusIdx === content.status.length ) {
				statusIdx = 0;
			}
			setStatus( content.status[ statusIdx ].title );
		}, 3000 );
		return () => {
			clearInterval( statusTimer );
		};
	}, [] );

	useEffect( () => {
		/* Divided the totalCount by 2 to complete the progress bar in the experience step */
		const percentageValue =
			( currentData?.sitegen?.siteGenMetaStatus?.currentStatus /
				( currentData?.sitegen?.siteGenMetaStatus?.totalCount) ) *
			100;
			console.log(percentageValue);
		setPercentage( percentageValue );

	}, [ currentData?.sitegen?.siteGenMetaStatus?.currentStatus ] );

	useEffect( () => {
		if ( percentage === customNavPercentage ) {
			if ( nextStep ) {
				if ( watcher !== null && watcher === false ) {
					return;
				}
				navigate( nextStep.path );
			}
		}
	}, [ percentage, watcher ] );

	return (
		<div className={ 'nfd-sg-loader' }>
			<div className={ 'nfd-sg-loader__title' }>{ content.title }</div>
			<div className={ 'nfd-sg-loader__progress' }>
				<div className={ 'nfd-sg-loader__progress_bars' }>
					<div className={ 'nfd-sg-loader__progress_bars_bg' } />
					<div
						className={ 'nfd-sg-loader__progress_bars_bar' }
						style={ { width: `${ percentage }%` } }
					/>
				</div>
			</div>
			<div
				className={ 'nfd-sg-loader__status' }
			>{ `${ status }...` }</div>
		</div>
	);
};

export default memo( SiteGenLoader );
