import { __ } from '@wordpress/i18n';

const AdminBarSiteGen = ({ }) => {

    return (
        (
            <div className="nfd-admin-bar-sitegen">
                <div>
                    <span className="nfd-admin-bar-logo">WordPress</span>
                </div>
                <div>
                    <span className="nfd-admin-bar-greeting">Howdy, Maya Jiménez</span>
                </div>
            </div>
        )
    );
};

export default AdminBarSiteGen;