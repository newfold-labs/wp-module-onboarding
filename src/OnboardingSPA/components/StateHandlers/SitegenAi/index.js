import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

import { StepLoader } from '../../Loaders';
import { store as nfdOnboardingStore } from '../../../store';
import {
	expedite,
	getThemeStatus,
	install as installTheme,
} from '../../../utils/api/themes';
import {
	THEME_STATUS_INIT,
	THEME_STATUS_INSTALLING,
	THEME_STATUS_NOT_ACTIVE,
	THEME_STATUS_ACTIVE,
	DESIGN_STEPS_THEME,
	THEME_STATUS_FAILURE,
} from '../../../../constants';
import { StepErrorState } from '../../ErrorState';
import getContents from './contents';
import ExitToWordPress from '../../ExitToWordPress';

const SitegenAiStateHandler = ( { children } ) => {
	const [ isError, setisError ] = useState( false );

	const handleRender = () => {
		if ( isError ) {
			return <StepErrorState
				title={ 'title' }
				subtitle={ 'subtitle' }
				error={ 'error' }
			/>;
		}

		return children;
	};
	return <Fragment>{ handleRender() }</Fragment>;
};

export default SitegenAiStateHandler;
