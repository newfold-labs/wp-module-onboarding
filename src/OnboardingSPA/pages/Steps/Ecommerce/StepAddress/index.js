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
import { useWPSettings } from '../useWPSettings';
import { EcommerceStateHandler } from '../../../../components/StateHandlers';

const StepAddress = () => {
	const isLargeViewport = useViewportMatch( 'medium' );
	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsDrawerSuppressed,
		setSidebarActiveView,
		setCurrentOnboardingData,
	} = useDispatch(nfdOnboardingStore);

	useEffect(() => {
		if (isLargeViewport) {
			setIsDrawerOpened(true);
		}
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerSuppressed(false);
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
			'woocommerce_default_country'
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
		if ( states.length == 0 ) {
			state = ""   // edge case to handle when the user goes back to onboarding and changes from a country with state to no state
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
        <EcommerceStateHandler>
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
					>
						<div className='nfd-card-heading center onboarding-ecommerce-step'>
							<CardHeader
								heading={__(content.stepAddressHeading, 'wp-module-onboarding')}
								subHeading={__(
									content.stepAddressSubHeading,
									'wp-module-onboarding'
								)}
							/>
							{settings === null && <p>Loading your details...</p>}
						</div>
						<div className='store-address-form'>
							<div>
								<label data-required>
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
							<div>
								<label data-required>
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
							<div className='sm:col-layout md:row-layout full-address-fields' style={{"--fields":`${states.length === 0 || settings === null  ? 2 : 3}`}}>
								<div>
									<label data-required>
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
								<div>
									<label data-required>
										{__('State', 'wp-module-onboarding')}
									</label>
										<select
											type='text'
											name='state'
											required
											defaultValue={selectedCountry==defaultCountry?defaultState:""}
											{...fieldProps}
										>
											<option key={""} value={""} selected />
											{states.map((state) => (
												<option key={state.code} value={state.code}>
													{state.name}
												</option>
											))}
										</select>
								</div>
								)}
								<div>
									<label data-required>
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
							<em style={{ display: 'inline' }}>* required</em>
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
        </EcommerceStateHandler>
	);
};

export default StepAddress;
