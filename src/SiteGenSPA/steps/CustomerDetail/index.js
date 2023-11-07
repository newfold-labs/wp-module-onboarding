import getContents from './contents';
import { useState } from '@wordpress/element';
import TextInput from '../../components/TextInput';
import AIHeading from '../../components/AIHeading';
import NextButton from '../../components/Navigation/NextButton';
import CommonLayout from '../../../Shared/Layouts/Common';
import { addThemeSuffix } from '../../utils/helper';

const CustomerDetail = () => {
	const content = getContents();
	const [ customerInput, setCustomerInput ] = useState();

	const checkAndNavigate = () => {
		// console.log( customerInput );
		// console.log( 'Navigate to the next screen!' );
	};

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
				<div
					className={ addThemeSuffix(
						'nfd-sg-customer-detail-endrow'
					) }
				>
					<NextButton callback={ checkAndNavigate } />
				</div>
			</div>
		</CommonLayout>
	);
};

export default CustomerDetail;
