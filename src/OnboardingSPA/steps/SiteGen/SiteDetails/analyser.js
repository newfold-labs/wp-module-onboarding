export const calculateAnalysisScore = ( input ) => {
	if ( ! input ) {
		return 0;
	}

	const characterCount = input.length;
	const nouns = /\w*ment\b|\w*ness\b|\w*tion\b|\w*ity\b/gm;
	const verbs = /\w*ing\b|\w*ed\b|\w*en\b|\w*ize\b|\w*fy\b/gm;
	const adjectives = /\w*y\b|\w*ful\b|\w*ive\b|\w*able\b|\w*ible\b/gm;
	const nounsRegex = new RegExp( nouns );
	const verbsRegex = new RegExp( verbs );
	const adjectivesRegex = new RegExp( adjectives );

	console.log( 'Character Count', characterCount );
	console.log( 'Nouns', input.match( nounsRegex ) );
	console.log( 'Verbs', input.match( verbsRegex ) );
	console.log( 'Adjectives', input.match( adjectivesRegex ) );
};
