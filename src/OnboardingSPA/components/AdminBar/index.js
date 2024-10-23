import { __ } from '@wordpress/i18n';
import { Dashicon } from '@wordpress/components';
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
		<div className="nfd-onboarding-header__admin-bar">
			<div className="nfd-onboarding-header__admin-bar__wplogo">
				<Dashicon icon="wordpress" />
				<span>{ __( 'WordPress', 'wp-module-onboarding' ) }</span>
			</div>
			<div className="nfd-onboarding-header__admin-bar__profile">
				<span className="nfd-onboarding-header__admin-bar__profile__greeting">
					<span>
						{ __( 'Howdy! ', 'wp-module-onboarding' ) }
						{ currentUserInfo.displayName }
					</span>
				</span>
				<div className="nfd-onboarding-header__admin-bar__profile__avatar">
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
