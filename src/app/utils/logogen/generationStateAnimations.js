const animations = [
	'https://bh-wp-onboarding.sfo3.cdn.digitaloceanspaces.com/logogen/generating-anim-1.gif',
	'https://bh-wp-onboarding.sfo3.cdn.digitaloceanspaces.com/logogen/generating-anim-2.gif',
	'https://bh-wp-onboarding.sfo3.cdn.digitaloceanspaces.com/logogen/generating-anim-3.gif',
	// 'https://bh-wp-onboarding.sfo3.cdn.digitaloceanspaces.com/logogen/generating-anim-4.gif',
	'https://bh-wp-onboarding.sfo3.cdn.digitaloceanspaces.com/logogen/generating-anim-5.gif',
	'https://bh-wp-onboarding.sfo3.cdn.digitaloceanspaces.com/logogen/generating-anim-6.gif',
	'https://bh-wp-onboarding.sfo3.cdn.digitaloceanspaces.com/logogen/generating-anim-7.gif',
	'https://bh-wp-onboarding.sfo3.cdn.digitaloceanspaces.com/logogen/generating-anim-8.gif',
	'https://bh-wp-onboarding.sfo3.cdn.digitaloceanspaces.com/logogen/generating-anim-9.gif',
];

/**
 * Shuffle the order of the animations.
 *
 * @param { Array } array - The array to shuffle.
 * @return { Array } The shuffled animations.
 */
const shuffleOrder = ( array ) => {
	const shuffled = [ ...array ]; // Create a copy
	for ( let i = shuffled.length - 1; i > 0; i-- ) {
		const j = Math.floor( Math.random() * ( i + 1 ) );
		[ shuffled[ i ], shuffled[ j ] ] = [ shuffled[ j ], shuffled[ i ] ];
	}
	return shuffled;
};

let shuffledAnimations = shuffleOrder( animations );
let currentIndex = 0;

/**
 * Get a unique animation from the animations array.
 *
 * @return { string } The animation URL.
 */
export const getUniqueAnimation = () => {
	const animation = shuffledAnimations[ currentIndex ];
	currentIndex = ( currentIndex + 1 ) % shuffledAnimations.length;

	// Re-shuffle when we complete a cycle
	if ( currentIndex === 0 ) {
		shuffledAnimations = shuffleOrder( animations );
	}

	return animation;
};

/**
 * Reset the animations array.
 *
 * @return { void }
 */
export const resetAnimationQueue = () => {
	shuffledAnimations = shuffleOrder( animations );
	currentIndex = 0;
};

/**
 * Prefetch the generation gif animations.
 *
 * @return { void }
 */
export const prefetch = async () => {
	return Promise.allSettled(
		animations.map( ( animationUrl ) => {
			return new Promise( ( resolve, reject ) => {
				// eslint-disable-next-line no-undef
				const img = new Image();
				img.src = animationUrl;
				img.onload = () => resolve( animationUrl );
				img.onerror = () => reject( animationUrl );
			} );
		} )
	);
};
