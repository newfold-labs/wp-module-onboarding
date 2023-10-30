import { memo } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { Icon, chevronLeft } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

const Header = () => {
	return (
		<div className="nfd-sitegen-header">
			<div className="nfd-sitegen-header__step-navigation">
				<Button
					className="navigation-buttons navigation-buttons_back"
					variant="secondary"
				>
					<Icon icon={ chevronLeft } />
					{ __( 'Back', 'wp-module-onboarding' ) }
				</Button>
			</div>
		</div>
	);
};

export default memo( Header );
