import getContents from './contents';
import { useState } from '@wordpress/element';
import TextInput from '../../components/TextInput';
import AIHeading from '../../components/AIHeading';
import CommonLayout from '../../../OnboardingSPA/components/Layouts/Common';

const CustomerDetail = () => {
	const content = getContents();
	const [ customerInput, setCustomerInput ] = useState();

	return (
		<CommonLayout isCentered>
			<div className="nfd-sg-customer-detail">
				<AIHeading title={ content.heading } />
				<TextInput
					placeholder={ content.inputPlaceholder }
					hint={ content.inputHint }
					height={ '40px' }
					customerInput={ customerInput }
					setCustomerInput={ setCustomerInput }
				/>
			</div>
		</CommonLayout>
	);
};

export default CustomerDetail;
