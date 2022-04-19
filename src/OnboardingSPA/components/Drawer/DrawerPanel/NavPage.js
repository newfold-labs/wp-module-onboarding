import { Icon, chevronLeft } from '@wordpress/icons';

import { Button } from '@wordpress/components';
import { VIEW_NAV_PRIMARY } from '../../../../constants';
import { __ } from '@wordpress/i18n';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';

const NavPage = () => {
	const { setDrawerActiveView } = useDispatch(nfdOnboardingStore);

	return (
		<div className="is-drawer-fade">
			<Button
				className="nfd-onboarding-drawer__panel-back"
				variant="tertiary"
				icon={chevronLeft}
				onClick={() => setDrawerActiveView(VIEW_NAV_PRIMARY)}
			>
				{__('Resume Onboarding', 'wp-module-onboarding')}
			</Button>
		</div>
	);
};

export default NavPage;
