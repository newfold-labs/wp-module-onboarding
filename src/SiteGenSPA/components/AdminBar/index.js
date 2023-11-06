import { __ } from '@wordpress/i18n';
import { Icon, wordpress } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../OnboardingSPA/store';

const AdminBar = () => {
	const { currentUserInfo } = useSelect( ( select ) => {
		return {
			currentUserInfo:
				select( nfdOnboardingStore ).getCurrentUserDetails(),
		};
	}, [] );

	if ( ! currentUserInfo ) {
		return null;
	}

	return (
		<div className="nfd-sitegen-admin-bar">
			<div className="nfd-admin-bar-wplogo">
				<Icon icon={ wordpress } />
				<span>{ __( 'WordPress', 'wp-module-onboarding' ) }</span>
			</div>
			<div className="nfd-sitegen-admin-bar-profile">
				<span className="nfd-admin-bar-greeting">
					<span>
						{ __( 'Howdy!', 'wp-module-onboarding' ) },{ ' ' }
						{ currentUserInfo.displayName }
					</span>
				</span>
				<div className="nfd-admin-bar-avatar">
					<img
						src={ currentUserInfo.avatarUrl }
						alt={ currentUserInfo.displayName }
					/>
				</div>
			</div>
		</div>
	);
};

export default AdminBar;
