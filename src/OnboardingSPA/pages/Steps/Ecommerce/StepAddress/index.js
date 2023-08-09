import { useViewportMatch } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import {
	SIDEBAR_LEARN_MORE,
	VIEW_NAV_ECOMMERCE_STORE_INFO,
} from '../../../../../constants';
import CardHeader from '../../../../components/CardHeader';
import CommonLayout from '../../../../components/Layouts/Common';
import NeedHelpTag from '../../../../components/NeedHelpTag';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import { store as nfdOnboardingStore } from '../../../../store';
import countries from '../countries.json';
import currencies from '../currencies.json';
import { useWPSettings as getWPSettings } from '../useWPSettings';
import Animate from '../../../../components/Animate';
import getContents from './contents';
import NavCardButton from '../../../../components/Button/NavCardButton';

const StepAddress = () => {
	const [ settings, setSettings ] = useState();
	const isLargeViewport = useViewportMatch( 'medium' );
	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsDrawerSuppressed,
		setSidebarActiveView,
		setCurrentOnboardingData,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	const getDefaultValues = ( brand ) => {
		switch ( brand ) {
			case 'crazy-domains':
				return {
					woocommerce_default_country: 'AU:NSW',
					woocommerce_currency: 'AUD',
				};
			case 'bluehost-india':
				return {
					woocommerce_default_country: 'IN:AP',
					woocommerce_currency: 'INR',
				};
			case 'bluehost':
			default:
				return {
					woocommerce_default_country: 'US:AZ',
					woocommerce_currency: 'USD',
				};
		}
	};

	/**
	 * When WC in installed, it sets a bunch of defaults related to country etc
	 * which is detected by matching a set of values.
	 *
	 * @param {Record<string, string | null>} options
	 * @return {boolean} Is default address set
	 */
	const isDefaultAddressSet = ( options ) => {
		const emptyFields = [
			'woocommerce_store_address',
			'woocommerce_store_city',
			'woocommerce_store_postcode',
		];
		const areAddressFieldsEmpty = emptyFields.every(
			( key ) => options[ key ] === null || options[ key ] === ''
		);
		const wcDefaults = [
			[ 'woocommerce_default_country', 'US:CA' ],
			[ 'woocommerce_currency', 'USD' ],
		];
		const isCountryUSA = wcDefaults.every(
			( [ key, value ] ) => options[ key ] === value
		);
		return areAddressFieldsEmpty && isCountryUSA;
	};

	const setNavigationState = () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setIsDrawerSuppressed( false );
		setIsHeaderNavigationEnabled( true );
	};

	const setWPSettings = async () => {
		const wpSettings = await getWPSettings();
		setSettings( wpSettings );
	};

	useEffect( () => {
		setNavigationState();
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setDrawerActiveView( VIEW_NAV_ECOMMERCE_STORE_INFO );
		setWPSettings();
	}, [] );

	const { currentData, newfoldBrand } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			newfoldBrand: select( nfdOnboardingStore ).getNewfoldBrand(),
		};
	}, [] );

	useEffect( () => {
		if ( settings ) {
			const addressKeys = [
				'woocommerce_store_address',
				'woocommerce_store_city',
				'woocommerce_store_postcode',
				'woocommerce_default_country',
				'woocommerce_currency',
				'woocommerce_email_from_address',
			];

			const keysWithDefaultValues = [
				'woocommerce_default_country',
				'woocommerce_currency',
			];

			if (
				settings !== null &&
				currentData.storeDetails.address === undefined
			) {
				const useDefaultValues = isDefaultAddressSet( settings );
				const addressToBeSet = { ...settings };
				const defaultValues = getDefaultValues( newfoldBrand );
				for ( const key of keysWithDefaultValues ) {
					if (
						addressToBeSet[ key ] === null ||
						addressToBeSet[ key ] === '' ||
						useDefaultValues
					) {
						addressToBeSet[ key ] = defaultValues[ key ];
					}
				}
				setCurrentOnboardingData( {
					...currentData,
					storeDetails: {
						...currentData.storeDetails,
						address: {
							...( currentData.storeDetails.address ?? {} ),
							...addressKeys.reduce(
								( address, key ) => ( {
									...address,
									[ key ]: addressToBeSet[ key ],
								} ),
								{}
							),
						},
					},
				} );
			}
		}
	}, [ settings, currentData.storeDetails, newfoldBrand ] );

	const { address } = currentData.storeDetails;
	const fieldProps = {
		disabled: address === undefined,
		onChange: handleFieldChange,
		onBlur: handleFieldChange,
	};
	const defaultPlace = address?.woocommerce_default_country ?? '';
	const [ defaultCountry, defaultState ] = defaultPlace.split( ':' );
	const selectedCountry = address?.country ?? defaultCountry;
	const states =
		countries?.find( ( country ) => country.code === selectedCountry )
			?.states ?? [];
	function handleFieldChange( event ) {
		const fieldName = event.target.name;
		const newValue = event.target.value;
		let { country = selectedCountry, state } = address;
		if ( country === defaultCountry && state === undefined ) {
			state = defaultState;
		}
		if ( states.length === 0 ) {
			state = ''; // edge case to handle when the user goes back to onboarding and changes from a country with state to no state
		}
		let place = '';
		if ( [ 'country', 'state' ].includes( fieldName ) ) {
			if ( fieldName === 'country' ) {
				place = state ? `${ newValue }:${ state }` : newValue;
			} else {
				place = `${ country }:${ newValue }`;
			}
		}
		setCurrentOnboardingData( {
			...currentData,
			storeDetails: {
				...currentData.storeDetails,
				address: {
					...currentData.storeDetails.address,
					[ fieldName ]: newValue,
					...( place !== '' && {
						woocommerce_default_country: place,
					} ),
				},
			},
		} );
	}

	const content = getContents();

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard className="ecommerce-step nfd-ecommerce-address-step">
				<div className="onboarding-ecommerce-step">
					<form
						className="onboarding-ecommerce-step"
						style={ {
							display: 'grid',
							justifyItems: 'center',
						} }
					>
						<div className="nfd-card-heading center onboarding-ecommerce-step">
							<CardHeader
								heading={ content.heading }
								subHeading={ content.subheading }
							/>
						</div>
						<Animate
							type={ 'fade-in-disabled' }
							after={ address !== undefined }
						>
							<div className={ 'store-address-form' }>
								<div data-name="country">
									<label aria-required htmlFor="country">
										{ content.countryInputLabel }
									</label>
									{ address === undefined ? (
										<input
											id="country"
											name="country"
											type="text"
											disabled
										/>
									) : (
										<select
											type="text"
											name="country"
											required
											defaultValue={ selectedCountry }
											{ ...fieldProps }
										>
											{ countries.map( ( country ) => (
												<option
													key={ country.code }
													value={ country.code }
												>
													{ country.name }
												</option>
											) ) }
										</select>
									) }
								</div>
								<div data-name="woocommerce_store_address">
									<label
										aria-required
										htmlFor="woocommerce_store_address"
									>
										{ content.addressInputLabel }
									</label>
									<input
										id="woocommerce_store_address"
										name="woocommerce_store_address"
										type="text"
										required
										defaultValue={
											address?.woocommerce_store_address
										}
										{ ...fieldProps }
									/>
								</div>
								<div
									data-name="full-address"
									data-state-empty={ states.length === 0 }
								>
									<div data-name="woocommerce_store_city">
										<label
											aria-required
											htmlFor="woocommerce_store_city"
										>
											{ content.cityInputLabel }
										</label>
										<input
											name="woocommerce_store_city"
											id="woocommerce_store_city"
											type="text"
											required
											defaultValue={
												address?.woocommerce_store_city
											}
											{ ...fieldProps }
										/>
									</div>
									{ states.length === 0 ||
									address === undefined ? null : (
										<div data-name="state">
											<label
												aria-required
												htmlFor="state"
											>
												{ content.stateInputLabel }
											</label>
											<select
												id="state"
												type="text"
												name="state"
												required
												defaultValue={
													selectedCountry ===
													defaultCountry
														? defaultState
														: ''
												}
												{ ...fieldProps }
											>
												<option
													key={ '' }
													value={ '' }
													selected
												/>
												{ states.map( ( state ) => (
													<option
														key={ state.code }
														value={ state.code }
													>
														{ state.name }
													</option>
												) ) }
											</select>
										</div>
									) }
									<div data-name="woocommerce_store_postcode">
										<label
											aria-required
											htmlFor="woocommerce_store_postcode"
										>
											{ content.postalCodeInputLabel }
										</label>
										<input
											id="woocommerce_store_postcode"
											name="woocommerce_store_postcode"
											type="text"
											required
											defaultValue={
												address?.woocommerce_store_postcode
											}
											{ ...fieldProps }
										/>
									</div>
								</div>
								<div>
									<label
										aria-required
										htmlFor="woocommerce_email_from_address"
									>
										{ content.emailInputLabel }
									</label>
									<input
										name="woocommerce_email_from_address"
										id="woocommerce_email_from_address"
										type="email"
										required
										defaultValue={
											address?.woocommerce_email_from_address
										}
										{ ...fieldProps }
									/>
								</div>
								<div>
									<label htmlFor="woocommerce_currency">
										{ content.currencyInputLabel }
									</label>
									<select
										id="woocommerce_currency"
										type="text"
										name="woocommerce_currency"
										value={ address?.woocommerce_currency }
										{ ...fieldProps }
									>
										{ Object.entries( currencies ).map(
											( [ code, currency ] ) => (
												<option
													key={ code }
													value={ code }
													dangerouslySetInnerHTML={ {
														__html: currency,
													} }
												/>
											)
										) }
									</select>
								</div>
								<em style={ { display: 'inline' } }>
									{ content.requiredText }
								</em>
							</div>
						</Animate>
						<NavCardButton
							text={ content.buttonText }
							disabled={ address === undefined }
						/>
					</form>
					<NeedHelpTag />
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepAddress;
