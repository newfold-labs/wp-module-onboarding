import getContents from './contents';
import { addThemeSuffix } from '../../utils/helper';
import CommonLayout from '../../../Shared/Layouts/Common';
import CardWithOptions from '../../components/CardWithOptions';

const ExperienceLevel = () => {
	const content = getContents();

	return (
		<CommonLayout isCentered>
			<div className={ addThemeSuffix( 'nfd-sg-experience-level' ) }>
				<CardWithOptions
					title={ content.heading }
					options={ content.options }
					skip={ content.skip }
				/>
			</div>
		</CommonLayout>
	);
};

export default ExperienceLevel;
