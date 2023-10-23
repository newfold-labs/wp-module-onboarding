import { __ } from '@wordpress/i18n';
import { Icon, wordpress } from '@wordpress/icons';

const AdminBarSiteGen = () => {
	return (
		<div className="nfd-sitegen-admin-bar">
			<div className="nfd-admin-bar-wplogo">
				<Icon icon={ wordpress } />
				<span>{ __( 'WordPress', 'wp-module-onboarding' ) }</span>
			</div>
			<div className="nfd-sitegen-admin-bar-profile">
				<span className="nfd-admin-bar-greeting">
					Howdy, Maya Jiménez
				</span>
				<div className="nfd-admin-bar-avatar"></div>
			</div>
		</div>
	);
};

export default AdminBarSiteGen;
