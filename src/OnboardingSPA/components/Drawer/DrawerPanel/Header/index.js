
import { Button } from '@wordpress/components';
import { chevronLeft } from '@wordpress/icons';
const DrawerPanelHeader = ({ heading, subheading, handleClick }) => {
    return (
        <div className='nfd-onboarding-drawer__panel-header'>
        <div className='nfd-onboarding-drawer__panel-header__heading'>
            {typeof handleClick === 'function' &&             <Button
                className="nfd-onboarding-drawer__panel-header__back"
                variant="tertiary"
                icon={ chevronLeft }
                onClick={ handleClick }
            >
            </Button>}
            <h2 className='nfd-onboarding-drawer__panel-header__heading-text'>{ heading }</h2>
        </div>
        <p className='nfd-onboarding-drawer__panel-header__subheading'>{ subheading }</p>
    </div>
    )
}

export default DrawerPanelHeader;