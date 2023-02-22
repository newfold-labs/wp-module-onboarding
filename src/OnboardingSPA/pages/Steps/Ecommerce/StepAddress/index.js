import { useViewportMatch } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useNavigate } from 'react-router-dom';
import { SIDEBAR_LEARN_MORE, VIEW_NAV_ECOMMERCE_STORE_INFO } from '../../../../../constants';
import CardHeader from '../../../../components/CardHeader';
import CommonLayout from '../../../../components/Layouts/Common';
import NeedHelpTag from '../../../../components/NeedHelpTag';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import { store as nfdOnboardingStore } from '../../../../store';
import content from '../content.json';
import countries from '../countries.json';
import currencies from '../currencies.json';
import { useWPSettings } from '../useWPSettings';
import Animate from '../../../../components/Animate';
import { EcommerceStateHandler } from '../../../../components/StateHandlers';

const StepAddress = () => {
	const isLargeViewport = useViewportMatch('medium');
	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsDrawerSuppressed,
		setSidebarActiveView,
		setCurrentOnboardingData,
		setIsHeaderNavigationEnabled
	} = useDispatch(nfdOnboardingStore);

	const setNavigationState = () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setIsDrawerSuppressed( false );
		setIsHeaderNavigationEnabled( true );
	}

	useEffect(() => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setDrawerActiveView(VIEW_NAV_ECOMMERCE_STORE_INFO);
	}, []);

	const navigate = useNavigate();

	let currentData = useSelect((select) =>
		select(nfdOnboardingStore).getCurrentOnboardingData()
	);

	const settings = useWPSettings();
	useEffect(() => {
		let addressKeys = [
			'woocommerce_store_address',
			'woocommerce_store_city',
			'woocommerce_store_postcode',
			'woocommerce_default_country',
			'woocommerce_currency',
			'woocommerce_email_from_address',
		];
		if (settings !== null && currentData.storeDetails.address === undefined) {
			setCurrentOnboardingData({
				storeDetails: {
					...currentData.storeDetails,
					address: {
						...(currentData.storeDetails.address ?? {}),
						...addressKeys.reduce(
							(address, key) => ({ ...address, [key]: settings[key] }),
							{}
						),
					},
				},
			});
		}
	}, [settings, currentData.storeDetails]);

	let { address } = currentData.storeDetails;
	const fieldProps = {
		disabled: settings === null,
		onChange: handleFieldChange,
		onBlur: handleFieldChange,
	};
	let defaultPlace =
		address?.woocommerce_default_country ??
		settings?.woocommerce_default_country ??
		'US:AZ';
	let [defaultCountry, defaultState] = defaultPlace.split(':');
	let selectedCountry = address?.country ?? defaultCountry;
	let states =
		countries?.find((country) => country.code === selectedCountry)?.states ??
		[];
	function handleFieldChange(event) {
		let fieldName = event.target.name;
		let newValue = event.target.value;
		let { country = selectedCountry, state } = address;
		if (country === defaultCountry && state === undefined) {
			state = defaultState;
		}
		if (states.length == 0) {
			state = ''; // edge case to handle when the user goes back to onboarding and changes from a country with state to no state
		}
		let place = '';
		if (['country', 'state'].includes(fieldName)) {
			place =
				fieldName === 'country'
					? state
						? `${newValue}:${state}`
						: newValue
					: `${country}:${newValue}`;
		}
		setCurrentOnboardingData({
			storeDetails: {
				...currentData.storeDetails,
				address: {
					...currentData.storeDetails.address,
					[fieldName]: newValue,
					...(place !== '' && {
						woocommerce_default_country: place,
					}),
				},
			},
		});
	}
	return (
        <EcommerceStateHandler navigationStateCallback={ setNavigationState }>
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard className='ecommerce-step nfd-ecommerce-address-step'>
				<div className='onboarding-ecommerce-step'>
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
						style={{ display: 'grid', justifyItems: 'center' }}
					>
						<div className='nfd-card-heading center onboarding-ecommerce-step'>
							<CardHeader
								heading={__(content.stepAddressHeading, 'wp-module-onboarding')}
								subHeading={__(
									content.stepAddressSubHeading,
									'wp-module-onboarding'
								)}
							/>
						</div>
						<Animate type={ 'fade-in-disabled' } after={ settings }>
							<div className={'store-address-form'}>
								<div data-name='country'>
									<label aria-required>
										{__('Where is your store based?', 'wp-module-onboarding')}
									</label>
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
								<div data-name='woocommerce_store_address'>
									<label aria-required>
										{__('Address', 'wp-module-onboarding')}
									</label>
									<input
										name='woocommerce_store_address'
										type='text'
										required
										defaultValue={address?.woocommerce_store_address}
										{...fieldProps}
									/>
								</div>
								<div
									data-name='full-address'
									data-state-empty={states.length === 0}
								>
									<div data-name='woocommerce_store_city'>
										<label aria-required>
											{__('City', 'wp-module-onboarding')}
										</label>
										<input
											name='woocommerce_store_city'
											type='text'
											required
											defaultValue={address?.woocommerce_store_city}
											{...fieldProps}
										/>
									</div>
									{states.length === 0 || settings === null ? null : (
										<div data-name='state'>
											<label aria-required>
												{__('State', 'wp-module-onboarding')}
											</label>
											<select
												type='text'
												name='state'
												required
												defaultValue={
													selectedCountry == defaultCountry ? defaultState : ''
												}
												{...fieldProps}
											>
												<option key={''} value={''} selected />
												{states.map((state) => (
													<option key={state.code} value={state.code}>
														{state.name}
													</option>
												))}
											</select>
										</div>
									)}
									<div data-name='woocommerce_store_postcode'>
										<label aria-required>
											{__('Postal Code', 'wp-module-onboarding')}
										</label>
										<input
											name='woocommerce_store_postcode'
											type='text'
											required
											defaultValue={address?.woocommerce_store_postcode}
											{...fieldProps}
										/>
									</div>
								</div>
								<div>
									<label aria-required>
										{__('Email', 'wp-module-onboarding')}
									</label>
									<input
										name='woocommerce_email_from_address'
										type='email'
										required
										defaultValue={address?.woocommerce_email_from_address}
										{...fieldProps}
									/>
								</div>
								<div>
									<label>
										{__(
											'What currency do you want to display in your store?',
											'wp-module-onboarding'
										)}
									</label>
									<select
										type='text'
										name='woocommerce_currency'
										value={address?.woocommerce_currency}
										{...fieldProps}
									>
										{Object.entries(currencies).map(([code, currency]) => (
											<option
												key={code}
												value={code}
												dangerouslySetInnerHTML={{ __html: currency }}
											/>
										))}
									</select>
								</div>
								<em style={{ display: 'inline' }}>* required</em>
							</div>
						</Animate>
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
        </EcommerceStateHandler>
	);
};

export default StepAddress;
