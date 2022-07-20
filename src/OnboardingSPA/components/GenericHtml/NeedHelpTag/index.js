import { store as nfdOnboardingStore } from '../../../store';
import GenericHtml from '../../GenericHtml';

import { select } from '@wordpress/data';
import { addQueryArgs } from '@wordpress/url';
import { __ } from '@wordpress/i18n';

/**
 * Need Help Label and URL rendering component
 * Pass any Label and URL redirect which we want as is to display on the UI
 * @param content
 * @returns NeedHelpTag
 */

// function needHelpUrl() {
//   const brand = select(nfdOnboardingStore).getHireExpertsUrl();
//   const helpLink = addQueryArgs(brand.defaultLink, brand.utmParameters);
//   return helpLink;
// }

const NeedHelpTag = ({question, urlLabel}) => {
    const hireExpertsUrl = select(nfdOnboardingStore).getHireExpertsUrl();
	return (
    <GenericHtml
        content = {__(question) + "<a href=" + hireExpertsUrl + " target={'_blank'}>" + __(urlLabel) + "</a>"}
      />  
	);
};

export default NeedHelpTag;