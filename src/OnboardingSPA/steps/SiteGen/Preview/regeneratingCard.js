import { __ } from '@wordpress/i18n';

function RegeneratingSiteCard( { count = 1, isRegenerating } ) {
	const cards = [];
	for ( let i = 0; i < count; i++ ) {
		cards.push(
			<div key={ i } className="regenerating-site-card-wrap">
				<div className="regenerating-site-card">
					<p className="regenerating-site-card__title">
						{ isRegenerating
							? __( 'Regenerating Site', 'wp-module-onboarding' )
							: __( 'Generating Site', 'wp-module-onboarding' ) }
					</p>
					<div className="regenerating-site-card__progress-bar">
						<div className="regenerating-site-card__progress-bar__fill"></div>
					</div>
				</div>
			</div>
		);
	}

	return <>{ cards }</>;
}

export default RegeneratingSiteCard;
