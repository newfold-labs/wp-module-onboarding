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
import content from '../content.json';
import countries from '../countries.json';
import { useWPSettings } from '../useWPSettings';

const StepAddress = () => {
	const isLargeViewport = useViewportMatch( 'medium' );
	const {
		flushQueue, 
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsDrawerSuppressed,
		setIsSidebarOpened,
		setCurrentOnboardingFlowData,
	} = useDispatch(nfdOnboardingStore);

	useEffect(() => {
		flushQueue(flowData);
		if (isLargeViewport) {
			setIsDrawerOpened(true);
		}
		setIsSidebarOpened(false);
		setIsDrawerSuppressed(false);
		setDrawerActiveView(VIEW_NAV_ECOMMERCE_STORE_INFO);
	}, []);

	const navigate = useNavigate();

	let flowData = useSelect((select) =>
		select(nfdOnboardingStore).getOnboardingFlowData()
	);

	const settings = useWPSettings();
	useEffect(() => {
		let addressKeys = [
			'woocommerce_store_address',
			'woocommerce_store_address_2',
			'woocommerce_store_city',
			'woocommerce_store_postcode',
			'woocommerce_default_country'
		];
		if (settings !== null && flowData.storeDetails.address === undefined) {
			setCurrentOnboardingFlowData({
				...flowData,
				storeDetails: {
					...flowData.storeDetails,
					address: {
						...(flowData.storeDetails.address ?? {}),
						...addressKeys.reduce(
							(address, key) => ({ ...address, [key]: settings[key] }),
							{}
						),
					},
				},
			});
		}
	}, [settings, flowData.storeDetails]);

	let { address } = flowData.storeDetails;
	const fieldProps = {
		disabled: settings === null,
		onChange: handleFieldChange,
		onBlur: handleFieldChange,
	};
	let defaultPlace =
		address?.woocommerce_default_country ??
		settings?.woocommerce_default_country ??
		"US:AZ";
	let [defaultCountry, defaultState] = defaultPlace.split(":");
	let selectedCountry = address?.country ?? defaultCountry;
	let states =
		countries?.find((country) => country.code === selectedCountry)?.states ??
		[];
	function handleFieldChange(event) {
		let fieldName = event.target.name;
		let newValue = event.target.value;
		let { country = selectedCountry, state = defaultState } = address;
		let place = "";
		if (["country", "state"].includes(fieldName)) {
			place =
				fieldName === "country"
					? `${newValue}:${state}`
					: `${country}:${newValue}`;
		}
		setCurrentOnboardingFlowData({
			...flowData,
			storeDetails: {
				...flowData.storeDetails,
				address: {
					...flowData.storeDetails.address,
					[fieldName]: newValue,
					...(place !== "" && {
						woocommerce_default_country: place,
					}),
				},
			},
		});
	}
	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard className='nfd-ecommerce-address-step'>
				<div className='nfd-onboarding-experience-step onboarding-ecommerce-step'>
					<form
						className='onboarding-ecommerce-step'
						onSubmit={(event) => {
							event.preventDefault();
							event.stopPropagation();
							//Commented as auto-calculate tax option is removed for MMP

							// let selectedTaxOption = content.stepTaxOptions.find((option) =>
							// 	Object.entries(option.data).every(
							// 		([optionName, requiredValue]) =>
							// 			settings?.[optionName] === requiredValue
							// 	)
							// );
							// navigate(
							// 	selectedTaxOption === undefined
							// 		? '/ecommerce/step/tax'
							// 		: '/ecommerce/step/products'
							// );
							navigate('/ecommerce/step/tax');
						}}
					>
						<div className='nfd-card-heading center onboarding-ecommerce-step'>
							<CardHeader
								heading={__(content.stepAddressHeading, 'wp-module-onboarding')}
								subHeading={__(content.stepAddressSubHeading, 'wp-module-onboarding')}
							/>
							{settings === null && <p>Loading your details...</p>}
						</div>
						<div className='store-address-form'>
							<div>
								<label>{__('Address line 1', 'wp-module-onboarding')}</label>
								<input
									name='woocommerce_store_address'
									type='text'
									required
									defaultValue={address?.woocommerce_store_address}
									{...fieldProps}
								/>
							</div>
							<div>
								<label>{__('Address line 2', 'wp-module-onboarding')}</label>
								<input
									name='woocommerce_store_address_2'
									type='text'
									defaultValue={address?.woocommerce_store_address_2}
									{...fieldProps}
								/>
							</div>
							<div>
								<label>{__('City', 'wp-module-onboarding')}</label>
								<input
									name='woocommerce_store_city'
									type='text'
									required
									defaultValue={address?.woocommerce_store_city}
									{...fieldProps}
								/>
							</div>
							<div>
								<label>{__('State', 'wp-module-onboarding')}</label>
								{states.length === 0 || settings === null ? (
									<input type='text' name='state' disabled={settings === null} {...fieldProps} />
								) : (
									<select
										type='text'
										name='state'
										required
										defaultValue={defaultState}
										{...fieldProps}
									>
										{states.map((state) => (
											<option key={state.code} value={state.code}>
												{state.name}
											</option>
										))}
									</select>
								)}
							</div>
							<div>
								<label>{__('Postal Code', 'wp-module-onboarding')}</label>
								<input
									name='woocommerce_store_postcode'
									type='text'
									required
									defaultValue={address?.woocommerce_store_postcode}
									{...fieldProps}
								/>
							</div>
							<div>
								<label>{__('Country', 'wp-module-onboarding')}</label>
								{settings === null ? (
									<input type='text' disabled />
								) : (
									<select
										type='text'
										name='country'
										required
										defaultValue={selectedCountry}
										{...fieldProps}
									>
										{countries.map((country) => (
											<option key={country.code} value={country.code}>
												{country.name}
											</option>
										))}
									</select>
								)}
							</div>
						</div>
						<button
							className='nfd-nav-card-button nfd-card-button'
							disabled={settings === null}
							type='submit'
						>
							{__(content.buttonText, 'wp-module-onboarding')}
						</button>
					</form>
					<NeedHelpTag />
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepAddress;
