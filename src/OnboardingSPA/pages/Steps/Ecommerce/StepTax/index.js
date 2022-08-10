import { RadioControl } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useNavigate } from 'react-router-dom';
import { VIEW_NAV_ECOMMERCE_STORE_INFO } from '../../../../../constants';
import CardHeader from '../../../../components/CardHeader';
import CommonLayout from '../../../../components/Layouts/Common';
import NeedHelpTag from '../../../../components/NeedHelpTag';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import { store as nfdOnboardingStore } from '../../../../store';
import content from '../content.json';
import { useWPSettings } from '../useWPSettings';

function createReverseLookup(state) {
	return (option) =>
		Object.entries(option.data).every(([key, value]) => state?.[key] === value);
}

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

	useEffect(() => {
		if (isLargeViewport) {
			setIsDrawerOpened(true);
		}
		setIsSidebarOpened(false);
		setIsDrawerSuppressed(false);
		setDrawerActiveView(VIEW_NAV_ECOMMERCE_STORE_INFO);
	}, []);

	const settings = useWPSettings();
	useEffect(() => {
		if (settings !== null) {
			let selectedTaxOption = content.stepTaxOptions.find(
				createReverseLookup(settings)
			);
			let tax = selectedTaxOption?.data ?? {};
			setCurrentOnboardingData({
				storeDetails: {
					...currentData.storeDetails,
					tax: {
						...currentData.storeDetails.tax,
						...tax,
					},
				},
			});
		}
	}, [settings]);
	let { address, tax } = currentData.storeDetails;
	let selected = content.stepTaxOptions.find(createReverseLookup(tax));
	const isStoreDetailsFilled = address?.woocommerce_store_postcode !== null;
	const handleButtonClick = () => {
		let isAddressNeeded = selected?.value === "1" && !isStoreDetailsFilled;
		navigate(
			isAddressNeeded ? '/ecommerce/step/address' : '/ecommerce/step/products'
		);
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
						{settings === null && <p>Loading...</p>}
					</div>
					<RadioControl
						className='nfd-onboarding-experience-step-tabs components-radio-control__input radio-control-tax-step'
						selected={selected?.value}
						options={content.stepTaxOptions.map((option) => {
							return {
								label: __(option.content, 'wp-module-onboarding'),
								value: option.value,
							};
						})}
						onChange={(value) => {
							let selectedOption = content.stepTaxOptions.find(
								(option) => option.value === value
							);
							setCurrentOnboardingData({
								storeDetails: {
									...currentData.storeDetails,
									tax: selectedOption.data,
								},
							});
						}}
					/>
					<button
						className='nfd-nav-card-button nfd-card-button'
						disabled={settings === null || selected === undefined}
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
