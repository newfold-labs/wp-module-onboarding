import { __ } from '@wordpress/i18n';

const DesignHomepageMenu = () => {
    return (
        <div style={{ padding: '0 16px' }}>
            <h2>{__('Pick a Homepage Design', 'wp-module-onboarding')}</h2>
            <p>
                {__(
                    'Panel will show a few Homepage Patterns.',
                    'wp-module-onboarding'
                )}
            </p>
        </div>
    );
};

export default DesignHomepageMenu;
