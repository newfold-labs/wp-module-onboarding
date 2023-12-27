const scoreCalculator = ( count ) => {
	switch ( count ) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};

export const calculateAnalysisScore = ( input ) => {
	// If Input not present or less than 50 Characters
	if ( ! input || input.length < 50 ) {
		return 0;
	}

	/* Number of Characters in the input
	 * Count < 100 => 0
	 * 100 < Count <= 150 => 1
	 * 150 < Count <= 200 => 2
	 * 200 < Count => 3
	*/
	const characterCount = input.length;
	// eslint-disable-next-line	no-nested-ternary
	const characterScore = characterCount > 200 ? 3 : characterCount > 150 ? 2 : characterCount > 100 ? 1 : 0;

	// Nouns often end in suffixes like "-ment," "-ness," "-tion," "-ity," etc.
	const nouns = /\w*ment\b|\w*ness\b|\w*tion\b|\w*ity\b/gm;
	const nounCount = input.match( new RegExp( nouns ) )?.length ?? 0;
	const nounsScore = scoreCalculator( nounCount );

	// Verbs often end in suffixes like "-ing," "-ed," "-en," "-ize," "-fy," etc.
	const verbs = /\w*ing\b|\w*ed\b|\w*en\b|\w*ize\b|\w*fy\b/gm;
	const verbsCount = input.match( new RegExp( verbs ) )?.length ?? 0;
	const verbsScore = scoreCalculator( verbsCount );

	// Adjectives often end in suffixes like "-y," "-ful," "-ive," "-able," "-ible," etc.
	const adjectives = /\w*y\b|\w*ful\b|\w*ive\b|\w*able\b|\w*ible\b/gm;
	const adjectiveCount = input.match( new RegExp( adjectives ) )?.length ?? 0;
	const adjectivesScore = scoreCalculator( adjectiveCount );

	return Math.min( characterScore, nounsScore, verbsScore, adjectivesScore );
};
