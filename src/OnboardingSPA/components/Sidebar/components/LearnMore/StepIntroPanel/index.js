import { PanelBody, PanelRow } from '@wordpress/components';

import { Icon } from '@wordpress/icons';

const StepIntroPanel = ( {
	baseClassName = 'nfd-onboarding-sidebar-learn-more--step-intro-panel',
	heading,
	subheading,
	icon,
} ) => {
	return (
		<PanelBody className={ baseClassName }>
			<PanelRow>
				<div className={ `${ baseClassName }__container` }>
					<div className={ `${ baseClassName }__container__icon` }>
						{ <Icon icon={ icon } /> }
					</div>
					<div className={ `${ baseClassName }__container__text` }>
						<p
							className={ `${ baseClassName }__container__text__heading` }
						>
							<strong>{ heading }</strong>
						</p>
						<p
							className={ `${ baseClassName }__container__text__subheading` }
						>
							{ subheading }
						</p>
					</div>
				</div>
			</PanelRow>
		</PanelBody>
	);
};

export default StepIntroPanel;
