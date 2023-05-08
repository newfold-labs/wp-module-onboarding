import CommonLayout from '../../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../../components/NewfoldLargeCard';
import {
	SIDEBAR_LEARN_MORE,
	VIEW_NAV_GET_STARTED,
} from '../../../../../../constants';
import getContents from '../contents';
import { store as nfdOnboardingStore } from '../../../../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import CardHeader from '../../../../../components/CardHeader';
import NavCardButton from '../../../../../components/Button/NavCardButton';
import NeedHelpTag from '../../../../../components/NeedHelpTag';
import Animate from '../../../../../components/Animate';
import { getSiteClassification } from '../../../../../utils/api/siteClassification';

const StepPrimarySetup = () => {
	const {
		setDrawerActiveView,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
		setSidebarActiveView,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	const contents = getContents();
	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerSuppressed( true );
		setDrawerActiveView( VIEW_NAV_GET_STARTED );
		setIsHeaderNavigationEnabled( true );
		getSiteClassificationData();
	}, [] );

	const [ siteClassification, setSiteClassification ] = useState();
	const [ primaryCategory, setPrimaryCategory ] = useState( '' );
	const [ inputFieldValue, setInputFieldValue ] = useState( '' );

	/**
	 * Function which fetches the Site Classifications
	 *
	 */
	const getSiteClassificationData = async () => {
		const siteClassificationData = await getSiteClassification();
		setSiteClassification( siteClassificationData?.body );
		setPrimaryCategory( currentData?.data?.siteType?.primary ?? '' );

		if ( currentData?.data?.siteType?.labelPri === 'custom' ) {
			setPrimaryCategory( '' );
			setInputFieldValue( currentData?.data?.siteType?.primary );
		}
	};

	/**
	 * Function which saves data in redux when category name is selected via chips
	 *
	 * @param {string} primType
	 */
	const handleCategoryClick = ( primType ) => {
		setPrimaryCategory( primType );
		setInputFieldValue( '' );
		currentData.data.siteType.labelPri = '';
		currentData.data.siteType.primary = primType;
		setCurrentOnboardingData( currentData );
	};

	/**
	 * Function which saves data in redux when category name is put-in via input box
	 *
	 * @param {string} input
	 */
	const categoryInput = ( input ) => {
		setPrimaryCategory( '' );
		setInputFieldValue( input?.target?.value );
		currentData.data.siteType.labelPri = 'custom';
		currentData.data.siteType.primary = input?.target?.value;
		setCurrentOnboardingData( currentData );
	};

	const primarySiteTypeChips = () => {
		const types = siteClassification?.types;
		return Object.keys( types ).map( ( type, idx ) => {
			return (
				<div
					key={ types[ type ]?.slug }
					tabIndex={ idx + 1 }
					role="button"
					className={ `${
						types[ type ].slug === primaryCategory
							? 'chosenPrimaryCategory '
							: ''
					}nfd-card-pri-category` }
					onClick={ () => handleCategoryClick( types[ type ].slug ) }
					onKeyDown={ () =>
						handleCategoryClick( types[ type ].slug )
					}
				>
					<div className="nfd-card-pri-category-wrapper">
						<span
							className={ `nfd-card-pri-category-wrapper-icon ${
								types[ type ].slug === primaryCategory
									? 'nfd-card-pri-category-wrapper-icon-selected '
									: ''
							}` }
							style={ {
								backgroundImage: `url(${ types[ type ]?.icon })`,
							} }
						></span>
						<span className="categName">
							{ types[ type ]?.label }
						</span>
					</div>
				</div>
			);
		} );
	};

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className="nfd-card-heading center">
					<CardHeader
						heading={ contents.cardHeading }
						subHeading={ contents.subHeading }
						question={ contents.question }
					/>
				</div>
				<Animate type="fade-in-disabled" after={ siteClassification }>
					<div className="nfd-setup-primary-categories">
						{ siteClassification && primarySiteTypeChips() }
					</div>
					<div className="nfd-setup-primary-second">
						<div className="nfd-setup-primary-second-top">
							<p className="tellus-text">or tell us here:</p>
							<input
								type="search"
								onChange={ ( e ) => categoryInput( e ) }
								className="tellus-input"
								placeholder={
									contents.placeholderSiteTypeInput
								}
								value={ inputFieldValue }
							/>
						</div>
					</div>
				</Animate>
				<NavCardButton
					text={ contents.buttonText }
				/>
				<NeedHelpTag />
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepPrimarySetup;
