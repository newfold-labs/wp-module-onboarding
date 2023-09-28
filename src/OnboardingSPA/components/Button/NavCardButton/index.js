import { useNavigate } from 'react-router-dom';
import { useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import Button from '../../Button';

import { setFlow } from '../../../utils/api/flow';
import { pluginDashboardPage } from '../../../../constants';
import {
	OnboardingEvent,
	sendOnboardingEvent,
} from '../../../utils/analytics/hiive';
import { ACTION_ONBOARDING_COMPLETE } from '../../../utils/analytics/hiive/constants';
import { activateInitialPlugins } from '../../../utils/api/plugins';
import classNames from 'classnames';
import { Icon } from '@wordpress/icons';

/**
 * Navigation Button Component on Card
 *
 * @return
 */

const NavCardButton = ( { text, disabled, className, icon } ) => {
	const navigate = useNavigate();

	const { nextStep, currentData } = useSelect( ( select ) => {
		return {
			nextStep: select( nfdOnboardingStore ).getNextStep(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	const isLastStep = null === nextStep || false === nextStep;

	async function saveDataAndExit() {
		if ( currentData ) {
			currentData.isComplete = new Date().getTime();
			setFlow( currentData );
		}

		activateInitialPlugins();
		sendOnboardingEvent(
			new OnboardingEvent( ACTION_ONBOARDING_COMPLETE )
		);
		window.location.replace( pluginDashboardPage );
	}

	const handleBtnClick = () => {
		return isLastStep ? saveDataAndExit() : navigate( nextStep.path );
	};

	return (
		<Button
			className={ classNames( 'nfd-nav-card-button', className ) }
			text={
				<>
					<span className={ `${ className }__text` }>{ text }</span>
					{ icon && (
						<Icon
							className={ `${ className }__icon` }
							icon={ icon }
						/>
					) }
				</>
			}
			handleClick={ handleBtnClick }
			disabled={ disabled }
		/>
	);
};

export default NavCardButton;
