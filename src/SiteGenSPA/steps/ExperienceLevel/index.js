import getContents from './contents';
import Loader from '../../components/Loader';
import { addThemeSuffix } from '../../utils/helper';
import CommonLayout from '../../../Shared/Layouts/Common';
import CardWithOptions from '../../components/CardWithOptions';
import { useEffect, useState } from '@wordpress/element';

const ExperienceLevel = () => {
	const content = getContents();
	// Index of the selection user makes
	const [ selection, setSelection ] = useState();

	useEffect( () => {
		// undefined => not selected, 0-2 => Selections, -1 => Skip
		// console.log( 'Selection changed to', selection );
	}, [ selection ] );

	return (
		<CommonLayout isCentered>
			<div className={ addThemeSuffix( 'nfd-sg-experience-level' ) }>
				<Loader />
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

export default ExperienceLevel;
