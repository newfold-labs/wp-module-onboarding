/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
import React from '@wordpress/element';

const QuickReplySuggestions = ({ suggestions, onClick }) => {

	return (
		<div className="quick-reply-wrapper">
			{suggestions.map((suggestion, index) => (
				<div
					className="quick-reply-suggestion"
					key={index}
					onClick={() => onClick(suggestion)}
				>
					{suggestion}
				</div>
			))}
		</div>
	);
};

export default QuickReplySuggestions;
