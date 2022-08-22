import { CheckboxControl, RadioControl } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { VIEW_NAV_ECOMMERCE_STORE_INFO } from '../../../../../constants';
import NavCardButton from '../../../../components/Button/NavCardButton';
import CardHeader from '../../../../components/CardHeader';
import CommonLayout from '../../../../components/Layouts/Common';
import NeedHelpTag from '../../../../components/NeedHelpTag';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import { store as nfdOnboardingStore } from '../../../../store';
import content from '../content.json';

const StepProducts = () => {
	const isLargeViewport = useViewportMatch( 'medium' );
	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsDrawerSuppressed,
		setIsSidebarOpened,
		setCurrentOnboardingFLowData,
	} = useDispatch(nfdOnboardingStore);

	let flowData = useSelect((select) =>
		select(nfdOnboardingStore).getCurrentOnboardingFlowData()
	);
	let productInfo = flowData.storeDetails.productInfo;
	useEffect(() => {
		if (isLargeViewport) {
			setIsDrawerOpened(true);
		}
		setIsSidebarOpened(false);
		setIsDrawerSuppressed(false);
		setDrawerActiveView(VIEW_NAV_ECOMMERCE_STORE_INFO);
	}, []);

	const handleCheckbox = (value, checked) =>
		setCurrentOnboardingFLowData({
			storeDetails: {
				...flowData.storeDetails,
				productInfo: {
					...productInfo,
					product_types: checked
						? [...productInfo?.product_types, value]
						: productInfo?.product_types.filter((product) => product !== value),
				},
			},
		});

	const handleProductCount = (count) =>
		setCurrentOnboardingFLowData({
			storeDetails: {
				...flowData.storeDetails,
				productInfo: { ...productInfo, product_count: count },
			},
		});


	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className='nfd-onboarding-experience-step onboarding-product-step onboarding-ecommerce-step'>
					<div className='nfd-card-heading center'>
						<CardHeader
							heading={__(content.stepProductsHeading, 'wp-module-onboarding')}
							subHeading={__(content.stepProductsSubHeading, 'wp-module-onboarding')}
						/>
					</div>
					<div className='nfd-product-step-options'>
						{content.productOptions.map((product) => (
							<CheckboxControl
								key={product.value}
								checked={productInfo.product_types.includes(
									product.value
								)}
								label={product.content}
								onChange={(e) => handleCheckbox(product.value, e)}
							/>
						))}
					</div>
					<div className='step-product-numbers'>
						<span style={{ fontSize: '16px' }}>
							{__(content.stepProductsQuestion, 'wp-module-onboarding')}
						</span>
						<RadioControl
							className='components-radio-control__input'
							selected={productInfo?.product_count}
							options={content.stepProductNumbers.map((option) => {
								return {
									label: __(option.content, 'wp-module-onboarding'),
									value: __(option.value, 'wp-module-onboarding'),
								};
							})}
							onChange={handleProductCount}
						/>
					</div>
					<NavCardButton text={__(content.buttonText, 'wp-module-onboarding')} />
					<NeedHelpTag />
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepProducts;
