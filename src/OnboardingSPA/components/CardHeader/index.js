/**
 * Common Heading Component for Card Header
 * Includes one heading, one sub-heading and one question
 * More text types can be added later based on requirements
 *
 * @return CardHeader
 */

import { memo } from '@wordpress/element';

const CardHeader = ( { heading, subHeading, question } ) => {
	return (
		<div>
			{ heading && (
				<h2 className="nfd-step-card-heading">{ heading }</h2>
			) }

			{ subHeading && (
				<h3
					className={
						question
							? 'nfd-step-card-subheading-other'
							: 'nfd-step-card-subheading'
					}
				>
					{ subHeading }
				</h3>
			) }

			{ question && (
				<h3 className="nfd-step-card-question">{ question }</h3>
			) }
		</div>
	);
};

export default memo( CardHeader );
