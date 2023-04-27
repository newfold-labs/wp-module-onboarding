import { __, sprintf } from '@wordpress/i18n';
import CommonLayout from '../../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../../components/NewfoldLargeCard';
import {
	SIDEBAR_LEARN_MORE,
	VIEW_NAV_GET_STARTED,
} from '../../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import CardHeader from '../../../../../components/CardHeader';
import NavCardButton from '../../../../../components/Button/NavCardButton';
import NeedHelpTag from '../../../../../components/NeedHelpTag';
import content from '../content.json';
import { translations } from '../../../../../utils/locales/translations';
import Animate from '../../../../../components/Animate';

const StepPrimarySetup = () => {
	const {
		setDrawerActiveView,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
		setSidebarActiveView,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	const { currentStep, currentData } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerSuppressed( true );
		setDrawerActiveView( VIEW_NAV_GET_STARTED );
		setIsHeaderNavigationEnabled( true );
		changePrimaryCategory( currentData?.data?.siteType?.primary ?? "" );

		if(currentData?.data?.siteType?.label === 'custom'){
			changePrimaryCategory("");
			setInputFieldValue( currentData?.data?.siteType?.primary );
		}
	}, [] );

	const [ primaryCategory, changePrimaryCategory ] = useState( "" );
	const [ inputFieldValue, setInputFieldValue ] = useState( '' );

	const selectedPrimaryCategoryInStore = currentData?.data?.siteType?.primary;

	/**
	 * Function which saves data in redux when category name is selected via chips
	 *
	 * @param  input
	 */
	const handleCategoryClick = ( primType ) => {
		changePrimaryCategory( primType );
		setInputFieldValue( '' );
		const currentDataCopy = currentData;
		currentDataCopy.data.siteType.primary = primType;
		setCurrentOnboardingData( currentDataCopy );
	};

	/**
	 * Function which saves data in redux when category name is put-in via input box
	 *
	 * @param  input
	 */
	const categoryInput = ( input ) => {
		changePrimaryCategory( "" );
		setInputFieldValue( input?.target?.value );
		const currentDataCopy = currentData;
		currentDataCopy.data.siteType.label = "custom";
		currentDataCopy.data.siteType.primary = input?.target?.value;
		setCurrentOnboardingData( currentDataCopy );
	};

	const primarySiteTypeChips = () => {
		let primaryChipList = [];
		
		let types = content?.categories?.types;
		for ( let typeKey in types ) {
			primaryChipList.push(
				<div
					key={ types[typeKey]?.slug }
					className={ `${
						types[typeKey].slug === primaryCategory
							? 'chosenPrimaryCategory '
							: ''
					}nfd-card-pri-category` }
					onClick={ ( e ) =>
						handleCategoryClick( types[typeKey].slug )
					}
				>
					<div className="nfd-card-pri-category-wrapper">
						<span
							className={ `nfd-card-pri-category-wrapper-icon ${
								types[typeKey].slug === primaryCategory
									? 'nfd-card-pri-category-wrapper-icon-selected '
									: ''
							}` }
							style={ {
								backgroundImage:
									`url(${types[typeKey]?.icon})`
							} }
						></span>
						<span className="categName">
							{ types[typeKey]?.label }
						</span>
					</div>
				</div>
			)
		}

		return primaryChipList;
	}

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className="nfd-card-heading center">
					<CardHeader
						heading={ __(
							currentStep?.heading,
							'wp-module-onboarding'
						) }
						subHeading={ sprintf(
							__( content.subHeading, 'wp-module-onboarding' ),
							translations( 'SITE' )
						) }
						question={ __(
							currentStep?.subheading,
							'wp-module-onboarding'
						) }
					/>
				</div>
				<Animate
					type="fade-in-disabled"
					after={
						content.categories &&
						selectedPrimaryCategoryInStore !== null
					}
				>
					<div className="nfd-setup-primary-categories">
						{ primarySiteTypeChips() }
					</div>
					<div className="nfd-setup-primary-second">
						<div className="nfd-setup-primary-second-top">
							<p className="tellus-text">or tell us here:</p>
							<input
								type="search"
								onChange={ ( e ) => categoryInput( e ) }
								className="tellus-input"
								placeholder={ sprintf(
									__(
										content.placeholderSiteTypeInput,
										'wp-module-onboarding'
									),
									translations( 'site' )
								) }
								value={ inputFieldValue }
							/>
						</div>
					</div>
				</Animate>
				<NavCardButton
					text={ __( content.buttonText ) }
					disabled={ content.categories === null }
				/>
				<NeedHelpTag />
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepPrimarySetup;
