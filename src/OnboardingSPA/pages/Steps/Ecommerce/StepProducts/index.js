import { CheckboxControl, RadioControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import {
	SIDEBAR_LEARN_MORE,
	VIEW_NAV_ECOMMERCE_STORE_INFO,
} from '../../../../../constants';
import NavCardButton from '../../../../components/Button/NavCardButton';
import CardHeader from '../../../../components/CardHeader';
import CommonLayout from '../../../../components/Layouts/Common';
import NeedHelpTag from '../../../../components/NeedHelpTag';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import { store as nfdOnboardingStore } from '../../../../store';
import getContents from './contents';

const StepProducts = () => {
	const {
		setDrawerActiveView,
		setSidebarActiveView,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	const currentData = useSelect( ( select ) =>
		select( nfdOnboardingStore ).getCurrentOnboardingData()
	);
	const productInfo = currentData.storeDetails.productInfo;
	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setDrawerActiveView( VIEW_NAV_ECOMMERCE_STORE_INFO );
	}, [] );

	const handleCheckbox = ( value, checked ) =>
		setCurrentOnboardingData( {
			...currentData,
			storeDetails: {
				...currentData.storeDetails,
				productInfo: {
					...productInfo,
					product_types: checked
						? [ ...productInfo?.product_types, value ]
						: productInfo?.product_types.filter(
								( product ) => product !== value
						  ),
				},
			},
		} );

	const handleProductCount = ( count ) =>
		setCurrentOnboardingData( {
			...currentData,
			storeDetails: {
				...currentData.storeDetails,
				productInfo: { ...productInfo, product_count: count },
			},
		} );

	const content = getContents();

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard className="ecommerce-step">
				<div className="nfd-onboarding-experience-step onboarding-product-step onboarding-ecommerce-step">
					<div className="nfd-card-heading center">
						<CardHeader
							heading={ content.heading }
							subHeading={ content.subheading }
						/>
					</div>
					<div className="nfd-product-step-options">
						{ content.typeOptions.map( ( product ) => (
							<CheckboxControl
								key={ product.value }
								checked={ productInfo.product_types.includes(
									product.value
								) }
								label={ product.content }
								onChange={ ( e ) =>
									handleCheckbox( product.value, e )
								}
							/>
						) ) }
					</div>
					<div className="step-product-numbers">
						<span style={ { fontSize: '16px' } }>
							{ content.question }
						</span>
						<RadioControl
							className="components-radio-control__input"
							selected={ productInfo?.product_count }
							options={ content.numberOptions.map( ( option ) => {
								return {
									label: option.content,
									value: option.value,
								};
							} ) }
							onChange={ handleProductCount }
						/>
					</div>
					<NavCardButton text={ content.buttonText } />
					<NeedHelpTag />
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepProducts;
