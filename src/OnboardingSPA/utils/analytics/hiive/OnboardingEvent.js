import { HiiveEvent } from '@newfold-labs/js-utility-ui-analytics';
import { getLabelKeyFromAction } from '.';
import { CATEGORY } from './constants';

export class OnboardingEvent extends HiiveEvent {
	constructor( action, value, additionalData, page, category = CATEGORY ) {
		const labelKey = getLabelKeyFromAction( action );
		super(
			category,
			action,
			{
				label_key: labelKey,
				[ labelKey ]: value,
				...additionalData,
				page: page ? page : window.location.href,
			},
			category
		);
	}
}
