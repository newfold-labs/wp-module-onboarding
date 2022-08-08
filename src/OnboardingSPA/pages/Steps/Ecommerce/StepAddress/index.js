import { useViewportMatch } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useNavigate } from 'react-router-dom';
import { VIEW_NAV_ECOMMERCE_STORE_INFO } from '../../../../../constants';
import CardHeader from '../../../../components/CardHeader';
import CommonLayout from '../../../../components/Layouts/Common';
import NeedHelpTag from '../../../../components/NeedHelpTag';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import { store as nfdOnboardingStore } from '../../../../store';
import {
	fetchWCCountries,
	updateWCOnboarding,
	updateWCOptions
} from '../../../../utils/api/ecommerce';
import content from '../content.json';

const StepAddress = () => {
	const isLargeViewport = useViewportMatch( 'medium' );
	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsDrawerSuppressed,
		setIsSidebarOpened,
		setCurrentOnboardingData,
	} = useDispatch(nfdOnboardingStore);

	let [countries, setCountries] = useState([]);
	useEffect(() => {
		if (isLargeViewport) {
			setIsDrawerOpened(true);
		}
		setIsSidebarOpened(false);
		setIsDrawerSuppressed(false);
		setDrawerActiveView(VIEW_NAV_ECOMMERCE_STORE_INFO);

		fetchWCCountries().then((countries) => setCountries(countries));
	}, []);

	const navigate = useNavigate();

	let currentData = useSelect((select) =>
		select(nfdOnboardingStore).getCurrentOnboardingData()
	);

	function handleFieldChange(event) {
		setCurrentOnboardingData({
			storeAddress: {
				...(currentData.storeAddress ?? {}),
				[event.target.name]: event.target.value,
			},
		});
	}
	const eventHandlers = {
		onChange: handleFieldChange,
		onBlur: handleFieldChange,
	};
	let selectedCountry = currentData.storeAddress?.country ?? 'US';
	let states =
		countries?.find((country) => country.code === selectedCountry)?.states ??
		[];
	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className='nfd-onboarding-experience-step onboarding-ecommerce-step'>
					<form
						onSubmit={async (event) => {
							event.preventDefault();
							event.stopPropagation();
							let { country, state, ...wcAddress } = currentData.storeAddress;
							await updateWCOptions({
								...wcAddress,
								woocommerce_default_country: `${country}:${state}`,
								...(currentData.taxInfo?.saveTaxData && {
									wc_connect_taxes_enabled: 'yes',
									woocommerce_calc_taxes: 'yes',
								}),
							});
							await updateWCOnboarding({ completed: true });
							navigate(
								currentData.taxInfo?.saveTaxData
									? '/ecommerce/step/products'
									: '/ecommerce/step/tax'
							);
						}}
					>
						<div className='nfd-card-heading center onboarding-ecommerce-step'>
							<CardHeader
								heading={__(content.stepAddressHeading)}
								subHeading={__(content.stepAddressSubHeading)}
							/>
							{countries.length === 0 ? 'Loading...' : null}
						</div>
						<div className='store-address-form'>
							<div>
								<label>Address line 1</label>
								<input
									name='woocommerce_store_address'
									type='text'
									required
									defaultValue={
										currentData.storeAddress?.woocommerce_store_address
									}
									{...eventHandlers}
								/>
							</div>
							<div>
								<label>Address line 2</label>
								<input
									name='woocommerce_store_address_2'
									type='text'
									defaultValue={
										currentData.storeAddress?.woocommerce_store_address_2
									}
									{...eventHandlers}
								/>
							</div>
							<div>
								<label>City</label>
								<input
									name='woocommerce_store_city'
									type='text'
									required
									defaultValue={
										currentData.storeAddress?.woocommerce_store_city
									}
									{...eventHandlers}
								/>
							</div>
							<div>
								<label>State</label>
								{states.length === 0 ? (
									<input type='text' name='state' required {...eventHandlers} />
								) : (
									<select
										type='text'
										name='state'
										required
										defaultValue={currentData.storeAddress?.state}
										{...eventHandlers}
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
								<label>Postal Code</label>
								<input
									name='woocommerce_store_postcode'
									type='zip'
									required
									defaultValue={
										currentData.storeAddress?.woocommerce_store_postcode
									}
									{...eventHandlers}
								/>
							</div>
							<div>
								<label>Country</label>
								{countries.length === 0 ? (
									<input type='text' disabled />
								) : (
									<select
										type='text'
										name='country'
										required
										defaultValue={selectedCountry}
										{...eventHandlers}
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
							type='submit'
						>
							{__(content.buttonText)}
						</button>
					</form>
					<NeedHelpTag />
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepAddress;
