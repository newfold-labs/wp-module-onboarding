/**
 * Common Tab Component
 *
 * @return Tab
 */

import Animate from '../Animate';

const Tab = ( { title, text, imgType, className, animationName } ) => {
	return (
		<div className={ className }>
			<div className="tab-text">
				<h4>{ title }</h4>
				{ text }
			</div>
			<div className="tab-image">
				<div className="tab-img">
					<Animate type={ animationName }>
						<div className={ imgType }></div>
					</Animate>
				</div>
			</div>
		</div>
	);
};

export default Tab;
