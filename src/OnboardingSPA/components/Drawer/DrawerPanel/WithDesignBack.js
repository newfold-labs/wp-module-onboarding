import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { chevronLeft } from '@wordpress/icons';

const WithDesignBack = ( { children } ) => {
	return (
		<div className="is-drawer-fade">
			<Button
				className="nfd-onboarding-drawer__panel-back"
				variant="tertiary"
				icon={ chevronLeft }
				onClick={ () => setDrawerActiveView( VIEW_NAV_DESIGN ) }
			>
				{ __( 'Design', 'wp-module-onboarding' ) }
			</Button>
			{ children }
		</div>
	);
};

export default WithDesignBack;
