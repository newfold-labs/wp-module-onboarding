import { useNavigate } from 'react-router-dom';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

import getContents from './contents';
import { HEADER_SITEGEN } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import CardWithOptions from '../../../components/CardWithOptions';
import SiteGenLoader from '../../../components/Loaders/SiteGenLoader';

const SiteGenExperience = () => {
	const navigate = useNavigate();
	const content = getContents();
	// Index of the selection user makes
	const [ selection, setSelection ] = useState();

	const { nextStep } = useSelect( ( select ) => {
		return {
			nextStep: select( nfdOnboardingStore ).getNextStep(),
		};
	} );

	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
	} );

	useEffect( () => {
		// undefined => not selected, 0-2 => Selections, -1 => Skip
		// console.log( 'Selection changed to', selection );
		if ( selection !== undefined && nextStep ) {
			navigate( nextStep.path );
		}
	}, [ selection ] );

	return (
		<CommonLayout isCentered>
			<div className={ 'nfd-sg-experience-level' }>
				<SiteGenLoader />
				<CardWithOptions
					title={ content.heading }
					options={ content.options }
					skip={ content.skip }
					setSelection={ setSelection }
				/>
			</div>
		</CommonLayout>
	);
};

export default SiteGenExperience;
