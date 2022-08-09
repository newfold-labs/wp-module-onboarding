import { RadioControl } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useNavigate } from 'react-router-dom';
import { VIEW_NAV_ECOMMERCE_STORE_INFO } from '../../../../../constants';
import CardHeader from '../../../../components/CardHeader';
import CommonLayout from '../../../../components/Layouts/Common';
import NeedHelpTag from '../../../../components/NeedHelpTag';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import { store as nfdOnboardingStore } from '../../../../store';
import { updateWCOptions } from '../../../../utils/api/ecommerce';
import content from '../content.json';

const StepTax = () => {
	const isLargeViewport = useViewportMatch( 'medium' );
	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsDrawerSuppressed,
		setIsSidebarOpened,
		setCurrentOnboardingData,
	} = useDispatch(nfdOnboardingStore);
	const navigate = useNavigate();

	let currentData = useSelect((select) =>
		select(nfdOnboardingStore).getCurrentOnboardingData()
	);

	const isStoreDetailsFilled = currentData?.storeAddress?.woocommerce_store_address !== undefined;
	useEffect(() => {
		if (isLargeViewport) {
			setIsDrawerOpened(true);
		}
		setIsSidebarOpened(false);
		setIsDrawerSuppressed(false);
		setDrawerActiveView(VIEW_NAV_ECOMMERCE_STORE_INFO);
	}, []);

	const handleButtonClick = async () => {
		let isAddressNeeded = currentData?.taxInfo?.isAddressNeeded;
		if (!isAddressNeeded) {
			await updateWCOptions(
				content.stepTaxOptions.find(
					(e) => currentData.taxInfo?.selectTaxOption === e.value
				)?.data
			);
		}
		let nextStep = isAddressNeeded
			? '/ecommerce/step/address'
			: '/ecommerce/step/products';
		navigate(nextStep);
	};

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className='nfd-onboarding-experience-step'>
					<div className='nfd-card-heading center onboarding-ecommerce-step'>
						<CardHeader
							heading={__(content.stepTaxHeading, 'wp-module-onboarding')}
							subHeading={__(content.stepTaxSubHeading, 'wp-module-onboarding')}
							question={__(content.question, 'wp-module-onboarding')}
						/>
					</div>
					<RadioControl
						className='nfd-onboarding-experience-step-tabs components-radio-control__input radio-control-tax-step'
						selected={currentData.taxInfo?.selectTaxOption}
						options={content.stepTaxOptions.map((option) => {
							return {
								label: __(option.content, 'wp-module-onboarding'),
								value: option.value,
							};
						})}
						onChange={(value) => {
							setCurrentOnboardingData({
								taxInfo: {
									...currentData.taxInfo,
									selectTaxOption: value,
									isAddressNeeded: value == "1" && !isStoreDetailsFilled
								},
							})
						}}
					/>
					<button
						className='nfd-nav-card-button nfd-card-button'
						disabled={
							isStoreDetailsFilled === undefined ||
							currentData.taxInfo?.selectTaxOption === undefined
						}
						onClick={handleButtonClick}
					>
						{ __( 'Continue Setup', 'wp-module-onboarding') }
					</button>
					<NeedHelpTag/>
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepTax;
