import { __ } from '@wordpress/i18n';

function RegeneratingSiteCard( { progress } ) {
	return (
		<div className="regenerating-site-card">
			<h3>{ __( 'Regenerating Site', 'text-domain' ) }</h3>
			<div className="progress-bar">
				<div
					className="progress-bar__fill"
					style={ { width: `${ progress }%` } }
				></div>
			</div>
		</div>
	);
}

export default RegeneratingSiteCard;
