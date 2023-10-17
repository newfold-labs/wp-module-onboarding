
import { __ } from '@wordpress/i18n';
import './stylesheet.scss';

const ProgressBarSiteGen = ( { current, total  } ) => {
	const percentage = (current / total) * 100;
	return (
		  (
			<div className="nfd-progress-bar-site-gen">
				<div className="nfd-progress-bar-container">
                    <div
                        className="nfd-progress-bar-fill"
                        style={ { width: `${percentage}%` } }
                    ></div>
                </div>
			</div>
		)
	);
};

export default ProgressBarSiteGen;
