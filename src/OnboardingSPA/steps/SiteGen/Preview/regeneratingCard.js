import { __ } from '@wordpress/i18n';
import { ReactComponent as FavouriteIconStroked } from '../../../static/icons/sitegen/heart-stroked.svg';

function RegeneratingSiteCard( { previewVersion, progress } ) {
	return (
		<div className="regenerating-site-card-wrap">
			<div className="regenerating-site-card">
				<p className="regenerating-site-card__title">
					{ __( 'Regenerating Site', 'wp-module-onboarding' ) }
				</p>
				<div className="regenerating-site-card__progress-bar">
					<div
						className="regenerating-site-card__progress-bar__fill"
						style={ { width: `${ progress }%` } }
					></div>
				</div>
			</div>
			<div className="regenerating-site-card__version">
				<FavouriteIconStroked />
				{ __( 'version0-1_copy', 'wp-module-onboarding' ) }
			</div>
		</div>
	);
}

export default RegeneratingSiteCard;
