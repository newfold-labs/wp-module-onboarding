import { useDispatch, useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import CommonLayout from "../../../../components/Layouts/Common";
import NewfoldLargeCard from "../../../../components/NewfoldLargeCard";
import { store as nfdOnboardingStore } from "../../../../store";

import apiFetch from "@wordpress/api-fetch";
import { CheckboxControl, RadioControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
	VIEW_NAV_ECOMMERCE_STORE_INFO,
	YITH_BOOKING_PLUGIN,
	YITH_PRODUCT_FILTER_PLUGIN,
	YITH_SEARCH_PLUGIN,
	YITH_SHIPPO_PLUGIN
} from "../../../../../constants";
import NavCardButton from "../../../../components/Button/NavCardButton";
import CardHeader from "../../../../components/CardHeader";
import { installYithPlugin, updateWCOnboarding } from "../../../../utils/api/ecommerce";
import { resolve } from "../../../../utils/api/resolve";
import content from "../content.json";

const StepProducts = () => {
	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsSidebarOpened,
		setCurrentOnboardingData,
	} = useDispatch(nfdOnboardingStore);

	let currentData = useSelect((select) =>
		select(nfdOnboardingStore).getCurrentOnboardingData()
	);

	useEffect(() => {
		setIsSidebarOpened(false);
		setIsDrawerOpened(true);
		setDrawerActiveView(VIEW_NAV_ECOMMERCE_STORE_INFO);
		setCurrentOnboardingData({ productInfo: { product_types: [] } });
	}, []);

	const getPluginInstall = async (data) => {
		return await resolve(
			apiFetch({
				path: `/newfold-ecommerce/v1/plugins/install`,
				method: "POST",
				data,
			})
		);
	};

	const handleCheckbox = (value, checked) => {
		setCurrentOnboardingData({
			productInfo: {
				...currentData.productInfo,
				product_types: checked
					? [...currentData.productInfo?.product_types, value]
					: currentData.productInfo.product_types.filter(
							(product) => product !== value
					  ),
			},
		});
	};

	const getPluginName = (productType) => {
		switch (productType) {
			case "physical":
				return YITH_SHIPPO_PLUGIN;
			case "bookings":
				return YITH_BOOKING_PLUGIN;
			default:
				return null;
		}
	};

	const handleButtonClick = async () => {
		currentData.productInfo?.product_types.forEach(async (product) => {
			const data = { plugin: getPluginName(product) };
			data.plugin && (await getPluginInstall(data));
		});

		if (
			currentData.productInfo?.product_count !== "0" &&
			currentData.productInfo?.product_count !== "1-10"
		) {
			await installYithPlugin(YITH_SEARCH_PLUGIN);
			await installYithPlugin(YITH_PRODUCT_FILTER_PLUGIN);
		}
		const wcData = {
			completed: true,
			product_types: currentData.productInfo?.product_types,
			product_count: currentData.productInfo?.product_count,
		};
		await updateWCOnboarding(wcData);
	};

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
					<div className="nfd-product-step-options">
						{content.productOptions.map((product) => (
							<CheckboxControl
								checked={
									currentData.productInfo?.product_types.indexOf(
										product.value
									) !== -1
								}
								label={product.content}
								onChange={(e) => handleCheckbox(product.value, e)}
							/>
						))}
					</div>
					<div className="step-product-numbers">
						<span style={{ fontSize: "16px" }}>
							{__(content.stepProductsQuestion)}
						</span>
						<RadioControl
							className="components-radio-control__input"
							selected={currentData.productInfo?.product_count}
							options={content.stepProductNumbers.map((option) => {
								return {
									label: __(option.content),
									value: __(option.value),
								};
							})}
							onChange={(value) =>
								setCurrentOnboardingData({
									productInfo: {
										...currentData.productInfo,
										product_count: value,
									},
								})
							}
						/>
					</div>
					<NavCardButton
						text={__(content.buttonText)}
						onClick={handleButtonClick}
					/>
					<p>
						<em>
							Need help?{" "}
							<a href="admin.php?page=bluehost#/marketplace/services/blue-sky">
								Hire our experts
							</a>
						</em>
					</p>
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepProducts;
