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
import { getSiteClassifications } from '../../../../../utils/api/site-classifications';

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
		getSiteClassificationsData();
	}, [] );

	const [ siteClassData, setSiteClassData ] = useState();
	const [ primaryCategory, changePrimaryCategory ] = useState( '' );
	const [ inputFieldValue, setInputFieldValue ] = useState( '' );

	/**
	 * Function which fetches the Site Classifications
	 *
	 */
	const getSiteClassificationsData = async () => {
		const siteClassificationsData = await getSiteClassifications();
		setSiteClassData( siteClassificationsData?.body );
		changePrimaryCategory( currentData?.data?.siteType?.primary ?? '' );

		if ( currentData?.data?.siteType?.labelPri === 'custom' ) {
			changePrimaryCategory( '' );
			setInputFieldValue( currentData?.data?.siteType?.primary );
		}
	};

	/**
	 * Function which saves data in redux when category name is selected via chips
	 *
	 * @param {string} primType
	 */
	const handleCategoryClick = ( primType ) => {
		changePrimaryCategory( primType );
		setInputFieldValue( '' );
		const currentDataCopy = currentData;
		currentDataCopy.data.siteType.labelPri = '';
		currentDataCopy.data.siteType.primary = primType;
		setCurrentOnboardingData( currentDataCopy );
	};

	/**
	 * Function which saves data in redux when category name is put-in via input box
	 *
	 * @param {string} input
	 */
	const categoryInput = ( input ) => {
		changePrimaryCategory( '' );
		setInputFieldValue( input?.target?.value );
		const currentDataCopy = currentData;
		currentDataCopy.data.siteType.labelPri = 'custom';
		currentDataCopy.data.siteType.primary = input?.target?.value;
		setCurrentOnboardingData( currentDataCopy );
	};

	const primarySiteTypeChips = () => {
		let idx = 0;
		const primaryChipList = [];

		const types = siteClassData?.types;
		for ( const typeKey in types ) {
			primaryChipList.push(
				<div
					key={ types[ typeKey ]?.slug }
					tabIndex={ idx + 1 }
					role="button"
					className={ `${
						types[ typeKey ].slug === primaryCategory
							? 'chosenPrimaryCategory '
							: ''
					}nfd-card-pri-category` }
					onClick={ () =>
						handleCategoryClick( types[ typeKey ].slug )
					}
					onKeyDown={ () =>
						handleCategoryClick( types[ typeKey ].slug )
					}
				>
					<div className="nfd-card-pri-category-wrapper">
						<span
							className={ `nfd-card-pri-category-wrapper-icon ${
								types[ typeKey ].slug === primaryCategory
									? 'nfd-card-pri-category-wrapper-icon-selected '
									: ''
							}` }
							style={ {
								backgroundImage: `url(${ types[ typeKey ]?.icon })`,
							} }
						></span>
						<span className="categName">
							{ types[ typeKey ]?.label }
						</span>
					</div>
				</div>
			);
			idx++;
		}

		return primaryChipList;
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
				<Animate type="fade-in-disabled" after={ siteClassData }>
					<div className="nfd-setup-primary-categories">
						{ siteClassData && primarySiteTypeChips() }
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
					// disabled={ contents.categories === null }
				/>
				<NeedHelpTag />
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepPrimarySetup;
