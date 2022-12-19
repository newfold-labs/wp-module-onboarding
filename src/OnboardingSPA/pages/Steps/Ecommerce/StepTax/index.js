import { RadioControl } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';
import { useDispatch,useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useNavigate } from 'react-router-dom';
import { SIDEBAR_LEARN_MORE, VIEW_NAV_ECOMMERCE_STORE_INFO } from '../../../../../constants';
import CardHeader from '../../../../components/CardHeader';
import CommonLayout from '../../../../components/Layouts/Common';
import NeedHelpTag from '../../../../components/NeedHelpTag';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import { EcommerceStateHandler } from '../../../../components/StateHandlers';
import { store as nfdOnboardingStore } from '../../../../store';
import content from '../content.json';
import { useWPSettings } from '../useWPSettings';
import RadioControlWithSkeleton from '../../../../components/RadioControlWithSkeleton';

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
		setSidebarActiveView,
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
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerSuppressed(false);
		setDrawerActiveView(VIEW_NAV_ECOMMERCE_STORE_INFO);
	}, []);

	const settings = useWPSettings();
	useEffect(() => {
		if (settings !== null && currentData.storeDetails.tax === undefined) {
			let selectedTaxOption = content.stepTaxOptions.find(
				createReverseLookup(settings)
			);
			let tax = selectedTaxOption?.data ?? {};
			setCurrentOnboardingData({
				storeDetails: {
					...currentData.storeDetails,
					tax: {
						...(currentData.storeDetails.tax ?? {}),
						...tax,
						option: selectedTaxOption?.value,
						isStoreDetailsFilled: settings.woocommerce_store_postcode !== null,
					},
				},
			});
		}
	}, [settings, currentData.storeDetails]);
	let { tax } = currentData.storeDetails;
	const handleButtonClick = () => {
		//Commented as auto-calculate tax option is removed for MMP
		// let isAddressNeeded = tax?.option === "1" && !tax.isStoreDetailsFilled;
		// navigate(
		// 	isAddressNeeded ? '/ecommerce/step/address' : '/ecommerce/step/products'
		// );

		navigate('/ecommerce/step/products');
	};

	const selectOption = (value) => {
		let selectedOption = content.stepTaxOptions.find(
			(option) => option.value === value
		);
		setCurrentOnboardingData({
			storeDetails: {
				...currentData.storeDetails,
				tax: {
					...selectedOption.data,
					option: selectedOption.value,
					isStoreDetailsFilled: tax?.isStoreDetailsFilled
				},
			},
		});
	}

	return (
        <EcommerceStateHandler>
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard className='ecommerce-step' >
				<div className='nfd-onboarding-experience-step onboarding-ecommerce-step'>
					<div className='nfd-card-heading center onboarding-ecommerce-step'>
						<CardHeader
							heading={__(content.stepTaxHeading, 'wp-module-onboarding')}
							subHeading={__(content.stepTaxSubHeading, 'wp-module-onboarding')}
							question={__(content.question, 'wp-module-onboarding')}
						/>
					</div>
					<RadioControlWithSkeleton
						className={"nfd-onboarding-experience-step-tabs components-radio-control__input radio-control-tax-step"}
						count={3}
						watch={settings}
						selected={tax?.option}
						data={content.stepTaxOptions}
						callback={(value) => selectOption(value)} />
					<button
						className='nfd-nav-card-button nfd-card-button'
						disabled={settings === null || tax?.option === undefined}
						onClick={handleButtonClick}
					>
						{ __( 'Continue Setup', 'wp-module-onboarding') }
					</button>
					<NeedHelpTag/>
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
        </EcommerceStateHandler>
	);
};

export default StepTax;
