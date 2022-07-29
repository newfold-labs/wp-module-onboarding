import CommonLayout from "../../../../components/Layouts/Common";
import { useEffect, useState } from "@wordpress/element";
import NewfoldLargeCard from "../../../../components/NewfoldLargeCard";
import { store as nfdOnboardingStore } from "../../../../store";
import { useDispatch, useSelect } from "@wordpress/data";
import { VIEW_NAV_ECOMMERCE_STORE_INFO } from "../../../../../constants";
import { useNavigate } from "react-router-dom";
import content from "../content.json";
import { __ } from "@wordpress/i18n";
import { RadioControl } from "@wordpress/components";
import CardHeader from "../../../../components/CardHeader";
import apiFetch from "@wordpress/api-fetch";

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

	const [isStoreDetailsFilled, setStoreDetailsFilled] = useState(false);
	const getStoreDeatilsFilledInfo = async () => {
		await apiFetch({
			path: "/wc-admin/onboarding/tasks?ids=setup",
		}).then((onboardingResponse) => {
			let onboardingTask = onboardingResponse ? onboardingResponse[0] : null;
			const storeDetailsInfo = (
				onboardingTask ? onboardingTask.tasks : []
			).find((task) => task.id == "store_details");
			setStoreDetailsFilled(storeDetailsInfo && storeDetailsInfo.isComplete);
		});
	};
	useEffect(() => {
		getStoreDeatilsFilledInfo();
		setIsSidebarOpened(false);
		setIsDrawerOpened(true);
		setDrawerActiveView(VIEW_NAV_ECOMMERCE_STORE_INFO);
	}, []);

	const saveData = async (data) => {
		await apiFetch({
			path: `/wc-admin/options`,
			method: "POST",
			data,
		});
	};
	const handleButtonClick = async () => {
		if (currentData.taxInfo?.selectTaxOption == 1 && !isStoreDetailsFilled) {
			setCurrentOnboardingData({
				taxInfo: {
					...currentData.taxInfo,
					saveTaxData: true,
				},
			});
			navigate("/ecommerce/step/address");
			return;
		}
		await saveData(content.stepTaxOptions.find(e => currentData.taxInfo?.selectTaxOption === e.value)?.data);
		navigate("/ecommerce/step/products");
	};

	return (
		<CommonLayout isCentered>
			<NewfoldLargeCard>
				<div
					className="nfd-onboarding-experience-step"
				>
					<div className="nfd-card-heading center onboarding-ecommerce-step">
						<CardHeader
							heading={__(content.stepTaxHeading)}
							subHeading={__(content.stepTaxSubHeading)}
							question={__(content.question)}
						/>
					</div>
					<RadioControl
						className="nfd-onboarding-experience-step-tabs components-radio-control__input radio-control-tax-step"
						selected={currentData.taxInfo?.selectTaxOption}
						options={content.stepTaxOptions.map((option) => {
							return {
								label: __(option.content),
								value: __(option.value),
							};
						})}
						onChange={(value) =>
							setCurrentOnboardingData({
								taxInfo: { ...currentData.taxInfo, selectTaxOption: value },
							})
						}
					/>
					<button className="nfd-nav-card-button nfd-card-button" onClick={handleButtonClick}>
						Continue Setup
					</button>
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

export default StepTax;
