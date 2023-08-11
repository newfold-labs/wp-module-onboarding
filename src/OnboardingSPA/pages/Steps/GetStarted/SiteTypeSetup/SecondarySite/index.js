import CommonLayout from '../../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../../components/NewfoldLargeCard';
import {
	SIDEBAR_LEARN_MORE,
	VIEW_NAV_GET_STARTED,
} from '../../../../../../constants';
import getContents from '../contents';
import { store as nfdOnboardingStore } from '../../../../../store';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import CardHeader from '../../../../../components/CardHeader';
import NavCardButton from '../../../../../components/Button/NavCardButton';
import NeedHelpTag from '../../../../../components/NeedHelpTag';
import Animate from '../../../../../components/Animate';
import { getSiteClassification } from '../../../../../utils/api/siteClassification';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../../../utils/analytics/hiive';
import {
	ACTION_PRIMARY_TYPE_SET,
	ACTION_SECONDARY_TYPE_SET,
} from '../../../../../utils/analytics/hiive/constants';

const StepPrimarySetup = () => {
	const {
		setDrawerActiveView,
		setSidebarActiveView,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerSuppressed( true );
		setDrawerActiveView( VIEW_NAV_GET_STARTED );
		setIsHeaderNavigationEnabled( true );
		getSiteClassificationData();
	}, [] );

	const content = getContents();
	const [ custom, setCustom ] = useState( false );
	const [ siteClassification, setSiteClassification ] = useState();
	const [ primaryTypesList, setPrimaryTypeList ] = useState();
	const [ primaryCategory, setPrimaryCategory ] = useState();
	const [ secondaryCategory, setSecondaryCategory ] = useState( '' );
	// Timeout after which a custom input analytics event will be sent.
	const [ typingTimeout, setTypingTimeout ] = useState();

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	/**
	 * Function which fetches the Site Classifications
	 *
	 */
	const getSiteClassificationData = async () => {
		const siteClassificationData = await getSiteClassification();

		// First Key from the Data is the default Primary value
		const defaultPrimaryType = Object.keys(
			siteClassificationData?.body?.types
		)[ 0 ];

		setPrimaryCategory( defaultPrimaryType );
		setSiteClassification( siteClassificationData?.body );
		const primaryTypeList = Object.keys(
			siteClassificationData?.body?.types
		);
		setPrimaryTypeList( primaryTypeList );

		// Incase old user comes again with data, we need to save it
		if ( typeof currentData?.data?.siteType?.primary === 'string' ) {
			const primaryValue = currentData?.data?.siteType?.primary;
			currentData.data.siteType.primary = {
				refers: 'custom',
				value: primaryValue,
			};
			setCurrentOnboardingData( currentData );
		}

		if ( typeof currentData?.data?.siteType?.secondary === 'string' ) {
			const secondaryValue = currentData?.data?.siteType?.secondary;
			currentData.data.siteType.secondary = {
				refers: 'custom',
				value: secondaryValue,
			};
			setCurrentOnboardingData( currentData );
		}

		setSecondaryCategory(
			currentData?.data?.siteType?.secondary?.value ?? ''
		);
		if ( currentData?.data?.siteType?.primary?.value !== '' ) {
			// Determining if primary is Custom
			const isNotPrimaryCustom =
				currentData?.data?.siteType?.primary?.refers !== 'custom';

			if ( isNotPrimaryCustom ) {
				setPrimaryCategory(
					currentData?.data?.siteType?.primary?.value
				);
			} else {
				setPrimaryCategory( defaultPrimaryType );
				categoryInput( currentData?.data?.siteType?.secondary?.value );
			}
		}

		// Primary is valid and secondary is custom
		if ( currentData?.data?.siteType?.secondary?.refers === 'custom' ) {
			categoryInput( currentData?.data?.siteType?.secondary?.value );
		}
	};

	/**
	 * Function which saves data in redux when category name is put-in via input box
	 *
	 * @param {string} value
	 */
	const categoryInput = ( value ) => {
		setCustom( true );
		currentData.data.siteType.secondary.refers = 'custom';
		currentData.data.siteType.secondary.value = value;
		setCurrentOnboardingData( currentData );
		if ( '' !== secondaryCategory && secondaryCategory !== value ) {
			clearTimeout( typingTimeout );
			setTypingTimeout(
				setTimeout( () => {
					trackOnboardingEvent(
						new OnboardingEvent( ACTION_SECONDARY_TYPE_SET, value )
					);
				}, 1000 )
			);
		}
		setSecondaryCategory( value );
	};

	/**
	 * Function which saves data in redux when category name is chosen via categories displayed
	 *
	 * @param {string} secType
	 */
	const handleCategoryClick = ( secType ) => {
		if (
			secondaryCategory === secType &&
			currentData.data.siteType.primary.value === primaryCategory
		) {
			return true;
		}
		setCustom( false );
		setSecondaryCategory( secType );
		currentData.data.siteType.secondary.refers = 'slug';
		if ( currentData.data.siteType.primary.value !== primaryCategory ) {
			currentData.data.siteType.primary.refers = 'slug';
			currentData.data.siteType.primary.value = primaryCategory;
			trackOnboardingEvent(
				new OnboardingEvent( ACTION_PRIMARY_TYPE_SET, primaryCategory )
			);
		}
		currentData.data.siteType.secondary.value = secType;
		setCurrentOnboardingData( currentData );
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_SECONDARY_TYPE_SET, secType )
		);
	};

	const changePrimaryType = ( direction ) => {
		const idx = primaryTypesList.findIndex(
			( val ) => primaryCategory === val
		);
		let primaryType;
		switch ( direction ) {
			case 'back':
				// idx = ( (idx - 1 + N) % N )
				primaryType =
					primaryTypesList[
						( idx - 1 + primaryTypesList.length ) %
							primaryTypesList.length
					];
				setPrimaryCategory( primaryType );
				break;
			case 'next':
				// idx = ( (idx + 1 ) % N )
				primaryType =
					primaryTypesList[ ( idx + 1 ) % primaryTypesList.length ];
				setPrimaryCategory( primaryType );
				break;
		}
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_PRIMARY_TYPE_SET, primaryType )
		);
	};

	const secondarySiteTypeChips = () => {
		const types =
			siteClassification?.types[ primaryCategory ]?.secondaryTypes;
		return Object.keys( types ).map( ( type, idx ) => {
			return (
				<div
					key={ types[ type ]?.slug }
					role="button"
					tabIndex={ idx + 1 }
					className={ `${
						types[ type ].slug === secondaryCategory && ! custom
							? 'chosenSecondaryCategory '
							: ''
					}nfd-card-sec-category` }
					onClick={ () => handleCategoryClick( types[ type ].slug ) }
					onKeyDown={ () =>
						handleCategoryClick( types[ type ].slug )
					}
				>
					<span className="categName">{ types[ type ]?.label }</span>
				</div>
			);
		} );
	};

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className="nfd-card-heading center">
					<CardHeader
						heading={ content.heading }
						subHeading={ content.subheading }
						question={ content.question }
					/>
				</div>
				<Animate type="fade-in-disabled" after={ siteClassification }>
					<div className="nfd-setup-secondary-categories">
						<div className="nfd-card-sec-category-wrapper">
							{ siteClassification && (
								<div className="category-scrolling-wrapper">
									{ primaryTypesList &&
										primaryTypesList.length > 1 && (
											<div className="category-scrolling-wrapper__left-btn">
												<span
													className="category-scrolling-wrapper__left-btn-icon"
													onClick={ () =>
														changePrimaryType(
															'back'
														)
													}
													onKeyUp={ () =>
														changePrimaryType(
															'back'
														)
													}
													role="button"
													tabIndex={ 0 }
													style={ {
														backgroundImage:
															'var(--chevron-left-icon)',
													} }
												/>
											</div>
										) }
									<div className="category-scrolling-wrapper__type">
										<span
											className="category-scrolling-wrapper__type-icon"
											style={ {
												backgroundImage: `url(${ siteClassification?.types[ primaryCategory ]?.icon })`,
											} }
										/>
										<p className="category-scrolling-wrapper__type-text">
											{ ` ${ siteClassification?.types[ primaryCategory ]?.label }` }
										</p>
									</div>
									{ primaryTypesList &&
										primaryTypesList.length > 1 && (
											<div className="category-scrolling-wrapper__right-btn">
												<span
													className="category-scrolling-wrapper__right-btn-icon"
													onClick={ () =>
														changePrimaryType(
															'next'
														)
													}
													onKeyUp={ () =>
														changePrimaryType(
															'next'
														)
													}
													role="button"
													tabIndex={ 0 }
													style={ {
														backgroundImage:
															'var(--chevron-right-icon)',
													} }
												/>
											</div>
										) }
								</div>
							) }
						</div>
						<div className="subCategoriesSection">
							{ siteClassification && secondarySiteTypeChips() }
						</div>
						<div className="nfd-setup-primary-custom">
							<div className="nfd-setup-primary-custom__tellus-text">
								{ content.customInputLabel }
							</div>
							<input
								type="search"
								onChange={ ( e ) =>
									categoryInput( e?.target?.value )
								}
								className="nfd-setup-primary-custom__tellus-input"
								placeholder={
									content.customInputPlaceholderText
								}
								value={ custom ? secondaryCategory : '' }
							/>
						</div>
					</div>
				</Animate>
				<NavCardButton text={ content.buttonText } />
				<NeedHelpTag />
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepPrimarySetup;
