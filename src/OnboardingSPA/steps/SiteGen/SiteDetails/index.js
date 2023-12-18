import { useViewportMatch } from '@wordpress/compose';
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

import SiteGenSiteDetailsWalkthrough from '../SiteDetails/walkthrough';
import { getSiteDetailsQuestionare } from '../../../utils/api/siteGen';

const SiteGenSiteDetails = () => {
	const content = getContents();
	const isLargeViewport = useViewportMatch( 'small' );
	const [ customerInput, setCustomerInput ] = useState();
	const [ isWalkthrough, setIsWalkthrough ] = useState( false );
	const [ siteDetailsmeta, setSiteDetailsmeta ] = useState();
	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const {
		setFooterNavEnabled,
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
		setFooterNavEnabled( false );
	}, [] );

	useEffect( () => {
		setFooterNavEnabled( customerInput !== '' );
		currentData.sitegen.siteDetails.prompt = customerInput;
		currentData.sitegen.siteDetails.mode = 'simple';
		setCurrentOnboardingData( currentData );
	}, [ customerInput ] );

	const handleClickWalkThrough = () => {
		setIsWalkthrough( true );
	};

	useEffect( () => {
		getSiteDetails();
	}, [] );

	async function getSiteDetails() {
		try {
			let siteDetailsmetas = await getSiteDetailsQuestionare();
			siteDetailsmetas = siteDetailsmetas.body;
			setSiteDetailsmeta( siteDetailsmetas );
		} catch ( err ) {
			// eslint-disable-next-line no-console
			console.error( 'Error fetching data:', err );
		}
	}

	return (
		<CommonLayout isCentered>
			<Animate type={ 'fade-in' }>
				{ isWalkthrough ? (
					<SiteGenSiteDetailsWalkthrough
						siteDetailsmeta={ siteDetailsmeta }
					/>
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
						{ isLargeViewport && (
							<>
								<div className={ 'nfd-sg-site-details-endrow' }>
									<NextButtonSiteGen
										className={
											'nfd-sg-site-details--next-btn'
										}
										text={ content.buttonText }
										disabled={
											customerInput === undefined ||
											customerInput === ''
										}
									/>
								</div>
							</>
						) }
						<div className={ 'nfd-sg-site-details-walkThrough' }>
							{ content.walkThroughText }
							<span
								onClick={ handleClickWalkThrough }
								onKeyDown={ handleClickWalkThrough }
								role="button"
								tabIndex="0"
							>
								{ content.walkThroughlink }
							</span>
						</div>
					</div>
				) }
			</Animate>
		</CommonLayout>
	);
};

export default SiteGenSiteDetails;
