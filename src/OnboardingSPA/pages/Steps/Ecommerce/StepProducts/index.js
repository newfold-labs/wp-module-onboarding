import CommonLayout from '../../../../components/Layouts/Common';
import { useEffect } from '@wordpress/element';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import { store as nfdOnboardingStore } from '../../../../store';
import { useDispatch, useSelect } from '@wordpress/data';

import { VIEW_NAV_ECOMMERCE_STORE_INFO } from '../../../../../constants';
import CardHeader from '../../../../components/CardHeader';
import NavCardButton from '../../../../components/Button/NavCardButton';
import { __ } from '@wordpress/i18n';
import content from '../content.json';
import { CheckboxControl, RadioControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { resolve } from '../../../../utils/api/resolve';


const StepProducts = () => {

	const { setDrawerActiveView, setIsDrawerOpened, setIsSidebarOpened, setCurrentOnboardingData } =
		useDispatch(nfdOnboardingStore);

	let currentData = useSelect((select) =>
		select(nfdOnboardingStore).getCurrentOnboardingData()
	);

	useEffect(() => {
		setIsSidebarOpened(false);
		setIsDrawerOpened(true);
		setDrawerActiveView(VIEW_NAV_ECOMMERCE_STORE_INFO);
	}, []);

	const getPluginInstall = async (data) => {
		return await resolve(apiFetch({ path: `/newfold-ecommerce/v1/plugins/install`, method: 'POST', data }).then());
	}

	const saveData = async (data) => {
		return await resolve(apiFetch({ path: `/wc-admin/onboarding/profile`, method: 'POST', data }).then());
	}

	const handleCheckbox = async (val) => {
		setCurrentOnboardingData({
			productInfo: {
				...currentData.productInfo,
				"productTypes": { ...currentData.productInfo?.productTypes, ...val }
			}
		})

	}

	const getPluginName = (productType) => {
		switch (productType) {
			case "Physical products": return "yith_wcap_panel";
			case "Book rooms, houses or rent products": return "yith_wcbk_panel";
			default: return null;
		}
	}

	const handleButtonClick = async () => {
		Object.entries(currentData.productInfo?.productTypes).forEach(async ([key, val]) => {
			if (val) {
				const data = { plugin: getPluginName(key) };
				data.plugin && await getPluginInstall(data);
			}
		})
		if (Number(currentData.productInfo?.productCount) >= 51) {
			const yithPlugin = ["yith_wcas_panel", "yith_wcan_panel"];
			yithPlugin.forEach(async val => await getPluginInstall({ plugin: val }))
		}
		const wcData = { completed: true, productType: currentData.productInfo?.productTypes, productCount: currentData.productInfo?.productCount }
		await saveData(wcData);
	}

	return (
		<CommonLayout isCentered>
			<NewfoldLargeCard>
				<div className="nfd-onboarding-experience-step onboarding-product-step onboarding-ecommerce-step">
					<div className="nfd-card-heading center">
						<CardHeader
							heading={__(content.stepProductsHeading)}
							subHeading={__(content.stepProductsSubHeading)}
						/>
					</div>
					<div className='nfd-product-step-options'>
						{content.productOptions.map(product =>
							<CheckboxControl
								checked={currentData.productInfo?.productTypes[product.content]}
								label={product.content}
								onChange={e => handleCheckbox({ [product.content]: e })}
							/>)}
					</div>
					<div className='step-product-numbers'>
						<span style={{ fontSize: "16px" }}>{__(content.stepProductsQuestion)}</span>
						<RadioControl
							className='components-radio-control__input'
							selected={currentData.productInfo?.productCount}
							options={content.stepProductNumbers.map((option) => {
								return {
									label: __(option.content),
									value: __(option.value),
								};
							})}
							onChange={(value) => setCurrentOnboardingData({
								productInfo: {
									...currentData.productInfo,
									"productCount": value
								},
							})}
						/>
					</div>
					<NavCardButton
						text={__(content.buttonText)}
						onClick={handleButtonClick}
					/>
					{/* <NeedHelpTag /> */}
					<p>
						<em>
							Need help? <a>Hire our experts</a>
						</em>
					</p>
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepProducts;
