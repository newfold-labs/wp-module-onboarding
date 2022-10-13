import { PanelBody, PanelRow } from '@wordpress/components';

import { Icon } from '@wordpress/icons';

const HeadingWithSubHeadingAndIcon = ( {
	baseClassName = 'nfd-onboarding-sidebar-learn-more--heading-with-subheading-and-icon',
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

export default HeadingWithSubHeadingAndIcon;
