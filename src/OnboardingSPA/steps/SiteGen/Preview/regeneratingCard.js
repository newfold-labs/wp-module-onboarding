/* eslint-disable @wordpress/i18n-no-variables */
import { __ } from '@wordpress/i18n';
import { ReactComponent as FavouriteIconStroked } from '../../../static/icons/sitegen/heart-stroked.svg';
import getContents from './contents';

function RegeneratingSiteCard( { count = 1, isRegenerating } ) {
	const content = getContents();
	const cards = [];
	const generatingText = isRegenerating
		? content.regenerating
		: content.generating;
	for ( let i = 0; i < count; i++ ) {
		cards.push(
			<div key={ i } className="regenerating-site-card-wrap">
				<div className="regenerating-site-card">
					<p className="regenerating-site-card__title">
						{ __( generatingText, 'wp-module-onboarding' ) }
					</p>
					<div className="regenerating-site-card__progress-bar">
						<div className="regenerating-site-card__progress-bar__fill"></div>
					</div>
				</div>
				{ isRegenerating && (
					<div className="regenerating-site-card__version">
						<FavouriteIconStroked />
						{ __( 'version0-1_copy', 'wp-module-onboarding' ) }
					</div>
				) }
			</div>
		);
	}

	return <>{ cards }</>;
}

export default RegeneratingSiteCard;
