import { __ } from '@wordpress/i18n';
import { Icon, wordpress } from '@wordpress/icons';

const AdminBarSiteGen = ( {} ) => {
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
				<img
					alt=""
					src="http://1.gravatar.com/avatar/729ae85bf62b9917e93538db2f2688ca?s=26&amp;d=mm&amp;r=g"
					srcSet="http://1.gravatar.com/avatar/729ae85bf62b9917e93538db2f2688ca?s=52&amp;d=mm&amp;r=g 2x"
					className="avatar avatar-26 photo"
					height="20"
					width="20"
					loading="lazy"
					decoding="async"
				></img>
			</div>
		</div>
	);
};

export default AdminBarSiteGen;
