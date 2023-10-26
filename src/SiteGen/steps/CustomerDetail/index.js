import getContents from './contents';
import { useState } from '@wordpress/element';
import TextInput from '../../components/TextInput';
import AIHeading from '../../components/AIHeading';
import NextButton from '../../components/Navigation/NextButton';
import CommonLayout from '../../../OnboardingSPA/components/Layouts/Common';
import { addThemeSuffix } from '../../utils/helper';

const CustomerDetail = () => {
	const content = getContents();
	const [ customerInput, setCustomerInput ] = useState();

	return (
		<CommonLayout isCentered>
			<div className={ addThemeSuffix( 'nfd-sg-customer-detail' ) }>
				<AIHeading title={ content.heading } />
				<TextInput
					placeholder={ content.inputPlaceholder }
					hint={ content.inputHint }
					height={ '40px' }
					customerInput={ customerInput }
					setCustomerInput={ setCustomerInput }
				/>
				<div className={ addThemeSuffix( 'nfd-sg-customer-detail-endrow' ) }>
					<NextButton />
				</div>
			</div>
		</CommonLayout>
	);
};

export default CustomerDetail;
