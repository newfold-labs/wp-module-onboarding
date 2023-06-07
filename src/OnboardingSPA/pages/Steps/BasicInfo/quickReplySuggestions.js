/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from '@wordpress/element';
import moduleAI from '@newfold-labs/wp-module-ai';

const QuickReplySuggestions = ({ suggestions, onClick }) => {
    const [aiResults, setAIResults] = useState([]);
	const getAIResult = async () => {
		try {
			const result = await moduleAI.search.getSearchResult(
				'site description',
				'onboarding'
			);
            console.log("Result", result);
			setAIResults(result.result);
		} catch (exception) {
			console.log('exception', exception);
		} finally {
			console.log('Finally block');
		}
	};

	useEffect(() => {
		getAIResult();
		return () => {};
	}, []);

	return (
        <div className="quick-reply-wrapper">
            {aiResults.map((suggestion, index) => (
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
