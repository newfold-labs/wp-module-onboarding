import { RadioControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useNavigate } from 'react-router-dom';
import { VIEW_NAV_ECOMMERCE_STORE_INFO } from '../../../../../constants';
import NavCardButton from '../../../../components/Button/NavCardButton';
import CardHeader from '../../../../components/CardHeader';
import CommonLayout from '../../../../components/Layouts/Common';
import NeedHelpTag from '../../../../components/NeedHelpTag';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import { store as nfdOnboardingStore } from '../../../../store';
import { fetchWCOnboarding, updateWCOptions } from '../../../../utils/api/ecommerce';
import content from '../content.json';

const StepTax = () => {
	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsSidebarOpened,
		setCurrentOnboardingData,
	} = useDispatch(nfdOnboardingStore);
	const navigate = useNavigate();

	let currentData = useSelect((select) =>
		select(nfdOnboardingStore).getCurrentOnboardingData()
	);

	const [isStoreDetailsFilled, setStoreDetailsFilled] = useState(undefined);
	const getStoreDeatilsFilledInfo = async () => {
		const onboardingResponse = await fetchWCOnboarding();
		let [onboardingTask] = onboardingResponse ?? [];
		const storeDetailsInfo = (onboardingTask?.tasks ?? []).find(
			(task) => task.id == 'store_details'
		);
		setStoreDetailsFilled(storeDetailsInfo?.isComplete);
	};
	useEffect(() => {
		getStoreDeatilsFilledInfo();
		setIsSidebarOpened(false);
		setIsDrawerOpened(true);
		setDrawerActiveView(VIEW_NAV_ECOMMERCE_STORE_INFO);
	}, []);

	const handleButtonClick = async () => {
		if (currentData.taxInfo?.selectTaxOption == 1 && !isStoreDetailsFilled) {
			setCurrentOnboardingData({
				taxInfo: {
					...currentData.taxInfo,
					saveTaxData: true,
				},
			});
			navigate('/ecommerce/step/address');
			return;
		}
		await updateWCOptions(
			content.stepTaxOptions.find(
				(e) => currentData.taxInfo?.selectTaxOption === e.value
			)?.data
		);
		navigate('/ecommerce/step/products');
	};

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className='nfd-onboarding-experience-step'>
					<div className='nfd-card-heading center onboarding-ecommerce-step'>
						<CardHeader
							heading={__(content.stepTaxHeading)}
							subHeading={__(content.stepTaxSubHeading)}
							question={__(content.question)}
						/>
					</div>
					<RadioControl
						className='nfd-onboarding-experience-step-tabs components-radio-control__input radio-control-tax-step'
						selected={currentData.taxInfo?.selectTaxOption}
						options={content.stepTaxOptions.map((option) => {
							return {
								label: __(option.content),
								value: __(option.value),
							};
						})}
						onChange={(value) => {
							setCurrentOnboardingData({
								taxInfo: {
									...currentData.taxInfo,
									selectTaxOption: value,
									saveTaxData: value == "1" && !isStoreDetailsFilled
								},
							})
						}}
					/>
					<NavCardButton
						text={ __( 'Continue Setup' ) }
						disabled={
							isStoreDetailsFilled === undefined ||
							currentData.taxInfo?.selectTaxOption === undefined
						}
					/>
					<NeedHelpTag/>
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepTax;
