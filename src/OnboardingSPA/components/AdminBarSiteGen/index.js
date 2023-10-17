
import { __ } from '@wordpress/i18n';
import './stylesheet.scss';

const AdminBarSiteGen = ( {} ) => {

	return (
		  (
			<div className="nfd-admin-bar-site-gen">
				<div className="nfd-admin-top-bar ">
					<div>
						<div>
							<span className="nfd-admin-bar-logo">WordPress</span>
						</div>
						<div>
							<span className="nfd-admin-bar-greeting">Howdy, Maya Jiménez</span>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default AdminBarSiteGen;
