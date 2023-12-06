import { Fill, Dropdown } from '@wordpress/components';
import {
	HEADER_CENTER,
	HEADER_END,
	HEADER_SITEGEN,
	HEADER_START,
} from '../../../../../constants';
import { Icon, chevronDown, chevronRight, home } from '@wordpress/icons';
import { store as nfdOnboardingStore } from '../../../../store';

import { useSelect, useDispatch } from '@wordpress/data';

import { useEffect, useState } from '@wordpress/element';
import { getRandom } from '../../../../data/sitegen/homepages/homepages';

const StepSiteGenEditorHeader = () => {
	const [ homepage, setHomepage ] = useState();

	const { setCurrentOnboardingData } = useDispatch( nfdOnboardingStore );
	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const handleFavorite = () => {
		homepage.favorite = ! homepage.favorite;
		currentData.sitegen.homepages.data[ homepage.slug ] = homepage;
		setCurrentOnboardingData( currentData );
	};

	const handleRegenerate = () => {
		const newPage = getRandom( { ...homepage } );
		setHomepage( newPage );
		currentData.sitegen.homepages.data[ newPage.slug ] = newPage;
		currentData.sitegen.homepages.active = newPage;
		setCurrentOnboardingData( currentData );
	};

	const generateChildThemes = () => {};

	useEffect( () => {
		if ( currentData?.sitegen?.homepages?.active ) {
			setHomepage( currentData.sitegen.homepages.active );
		}
	}, [ currentData ] );
	return (
		<>
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_START }` }>
				<div className="nfd-onboarding-header--sitegen__editor__start">
					<div
						className="nfd-onboarding-header--sitegen__editor__start__regenerate"
						onClick={ () => handleRegenerate() }
					>
						<div
							className={ `nfd-onboarding-header--sitegen__editor__start__regenerate__icon` }
						></div>
						<div
							className={ `nfd-onboarding-header--sitegen__editor__start__regenerate__text` }
						>
							Regenerate
						</div>
					</div>
				</div>
			</Fill>
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_CENTER }` }>
				{ homepage && (
					<div className="nfd-onboarding-header--sitegen__editor__center">
						<div className="nfd-onboarding-header--sitegen__editor__center__icon"></div>
						<Dropdown
							className="nfd-onboarding-header--sitegen__editor__center__dropdown"
							renderToggle={ ( { isOpen, onToggle } ) => {
								return (
									<>
										<p
											className={ `nfd-onboarding-header--sitegen__editor__center__dropdown__favorite-icon ${
												homepage.favorite &&
												'nfd-onboarding-header--sitegen__editor__center__dropdown__favorite-icon__fill'
											}` }
											onClick={ handleFavorite }
										></p>
										<div
											className="nfd-onboarding-header--sitegen__editor__center__dropdown__info"
											onClick={ onToggle }
										>
											<p className="nfd-onboarding-header--sitegen__editor__center__dropdown__info__text">
												{ homepage.title }
											</p>
											<Icon
												className="nfd-onboarding-header--sitegen__editor__center__dropdown__info__down-icon"
												icon={ chevronDown }
											/>
										</div>
									</>
								);
							} }
							renderContent={ () => (
								<div className="nfd-onboarding-header--sitegen__editor__center__dropdown__content">
									<p className="nfd-onboarding-header--sitegen__editor__center__dropdown__content__rename">
										Rename
									</p>
									<p className="nfd-onboarding-header--sitegen__editor__center__dropdown__content__view-all">
										View All
									</p>
								</div>
							) }
						/>
					</div>
				) }
			</Fill>
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_END }` }>
				<div className="nfd-onboarding-header--sitegen__editor__end">
					<div className="nfd-onboarding-header--sitegen__editor__end__customize-button">
						<div className="nfd-onboarding-header--sitegen__editor__end__customize-button__icon"></div>
						<div className="nfd-onboarding-header--sitegen__editor__end__customize-button__text">
							Customize
						</div>
					</div>
					<div className="nfd-onboarding-header--sitegen__editor__end__save-button">
						<div
							className="nfd-onboarding-header--sitegen__editor__end__save-button__text"
							onClick={ generateChildThemes }
						>
							Save & Continue
						</div>
						<Icon
							icon={ chevronRight }
							className="nfd-onboarding-header--sitegen__editor__end__save-button__text"
						></Icon>
					</div>
				</div>
			</Fill>
		</>
	);
};

export default StepSiteGenEditorHeader;
