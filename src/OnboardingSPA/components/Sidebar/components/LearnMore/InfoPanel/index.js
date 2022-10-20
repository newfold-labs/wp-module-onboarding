import { PanelBody } from '@wordpress/components';

import HeadingWithDescription from '../HeadingWithDescription';

const InfoPanel = ( {
	baseClassName = 'nfd-onboarding-sidebar-learn-more--info-panel',
	headingWithDescriptions,
} ) => {
	return (
		<PanelBody className={ baseClassName } initialOpen={ true }>
			{ headingWithDescriptions.map( ( headingWithDescription, idx ) => {
				return (
					<HeadingWithDescription
						key={ idx }
						heading={ headingWithDescription?.heading }
						description={ headingWithDescription?.description }
					/>
				);
			} ) }
		</PanelBody>
	);
};

export default InfoPanel;
