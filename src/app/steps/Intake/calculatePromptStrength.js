/**
 * Calculate the strength of the prompt.
 *
 * @param {string} prompt - The prompt text to evaluate
 * @return {Object} The strength of the prompt.
 *         {number} score - Numeric score from 0-3 representing prompt strength
 *         {string} strength - Text representation of strength: 'VERY_WEAK', 'WEAK', 'MEDIUM', or 'HIGH'
 */
const calculatePromptStrength = ( prompt ) => {
	const result = {
		score: 0,
		strength: 'VERY_WEAK',
	};

	if ( ! prompt || typeof prompt !== 'string' ) {
		return result;
	}

	const promptCharCount = prompt.length;
	if ( promptCharCount > 200 ) {
		// Greater than 200 characters
		result.score = 3;
		result.strength = 'HIGH';
	} else if ( promptCharCount > 150 ) {
		// Greater than 150 characters
		result.score = 2;
		result.strength = 'MEDIUM';
	} else if ( promptCharCount > 100 ) {
		// Greater than 100 characters
		result.score = 1;
		result.strength = 'WEAK';
	}

	// Less than 100 characters
	return result;
};

export default calculatePromptStrength;
