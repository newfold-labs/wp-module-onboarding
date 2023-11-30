import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

import getContents from './contents';
import Animate from '../../../components/Animate';
import { HEADER_SITEGEN } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import AIHeading from '../../../components/Heading/AIHeading';
import CommonLayout from '../../../components/Layouts/Common';
import TextInputSiteGen from '../../../components/TextInput/TextInputSiteGen';
import NextButtonSiteGen from '../../../components/Button/NextButtonSiteGen';

const SiteGenSiteDetails = () => {
	const content = getContents();
	const [ customerInput, setCustomerInput ] = useState();
	const [ isWalkthrough, setIsWalkthrough ] = useState( true );

	const [ formData, setFormData ] = useState( {
		hasBusinessName: null,
		websiteType: '',
		likeWritingStyle: null,
		uniqueAboutBusiness: '',
	} );

	const handleInputChange = ( field, value ) => {
		setFormData( {
			...formData,
			[ field ]: value,
		} );
	};

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );

		if ( currentData.sitegen.siteDetails?.prompt !== '' ) {
			setCustomerInput( currentData.sitegen.siteDetails.prompt );
		}
	}, [] );

	const checkAndNavigate = () => {
		currentData.sitegen.siteDetails.prompt = customerInput;
		setCurrentOnboardingData( currentData );
		// console.log( 'Navigate to the next screen!' );
	};

	const handleClick = () => {
		setIsWalkthrough( true );
	};
	return (
		<CommonLayout isCentered>
			<Animate type={ 'fade-in' }>
				{ isWalkthrough ? (
					<div className={ 'nfd-sg-site-details' }>
						<AIHeading title={ content.heading } />
						<div className={ 'nfd-sg-site-details-rows' }>
							<label>
								1. Do you have a business name or website title?
							</label>
							<br></br>
							<div>
								<button
									onClick={ () =>
										handleInputChange(
											'hasBusinessName',
											'yes'
										)
									}
								>
									Yes
								</button>
								<button
									onClick={ () =>
										handleInputChange(
											'hasBusinessName',
											'no'
										)
									}
								>
									No
								</button>
							</div>
						</div>

						<div className={ 'nfd-sg-site-details-rows' }>
							<label>
								2. What type of website are you making?
							</label>
							<br></br>
							<input
								type="text"
								value={ formData.websiteType }
								onChange={ ( e ) =>
									handleInputChange(
										'websiteType',
										e.target.value
									)
								}
							/>
						</div>

						<div className={ 'nfd-sg-site-details-rows' }>
							<label>
								3. Which writing style do you like better?
							</label>
							<div>
								<button
									className={
										'nfd-sg-site-details-rows-write-style'
									}
									onClick={ ( e ) =>
										handleInputChange(
											'hasBusinessName',
											e.target.value
										)
									}
								>
									We craft awesome goodies!
								</button>
								<button
									className={
										'nfd-sg-site-details-rows-write-style'
									}
									onClick={ ( e ) =>
										handleInputChange(
											'hasBusinessName',
											e.target.value
										)
									}
								>
									We manufacture quality products
								</button>
							</div>
						</div>

						<div className={ 'nfd-sg-site-details-rows' }>
							<label>
								4. Is there anything unique about your business
								or brand?
							</label>
							<br></br>
							<textarea
								value={ formData.uniqueAboutBusiness }
								onChange={ ( e ) =>
									handleInputChange(
										'uniqueAboutBusiness',
										e.target.value
									)
								}
							/>
						</div>
						<div className={ 'nfd-sg-site-details-endrow' }>
							<NextButtonSiteGen
								className={ 'nfd-sg-site-details--next-btn' }
								text={ content.buttonText }
								callback={ checkAndNavigate }
							/>
						</div>
					</div>
				) : (
					<div className={ 'nfd-sg-site-details' }>
						<AIHeading title={ content.heading } />
						<TextInputSiteGen
							placeholder={ content.inputPlaceholder }
							hint={ content.inputHint }
							height={ '40px' }
							customerInput={ customerInput }
							setCustomerInput={ setCustomerInput }
						/>
						<div className={ 'nfd-sg-site-details-endrow' }>
							<NextButtonSiteGen
								className={ 'nfd-sg-site-details--next-btn' }
								text={ content.buttonText }
								callback={ checkAndNavigate }
							/>
						</div>
						<div className={ 'nfd-sg-site-details-walkThrough' }>
							<p
								className={
									'nfd-sg-site-details--walkThroughText'
								}
							>
								{ content.walkThroughText }
								<button onClick={ handleClick }>
									click here
								</button>
							</p>
						</div>
					</div>
				) }
			</Animate>
		</CommonLayout>
	);
};

export default SiteGenSiteDetails;
