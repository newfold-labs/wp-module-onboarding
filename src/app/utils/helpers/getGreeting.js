/**
 * Returns a dynamic greeting based on time of day, day of week, and user name.
 *
 * @param {string} displayName The user's WordPress display name.
 * @return {string} A greeting string.
 */
export default function getGreeting( displayName ) {
	const firstName = displayName ? displayName.split( ' ' )[ 0 ] : '';
	const now = new Date();
	const hour = now.getHours();
	const day = now.getDay(); // 0 = Sunday, 6 = Saturday

	// Time-of-day default
	let greeting;
	if ( hour >= 5 && hour <= 11 ) {
		greeting = 'Good morning';
	} else if ( hour >= 12 && hour <= 16 ) {
		greeting = 'Good afternoon';
	} else {
		greeting = 'Good evening';
	}

	// Day-of-week override (50% chance)
	if ( Math.random() < 0.5 ) {
		if ( day === 5 ) {
			greeting = 'Happy Friday';
		} else if ( day === 1 ) {
			greeting = 'Happy Monday';
		} else if ( day === 0 || day === 6 ) {
			greeting = 'Happy weekend';
		}
	}

	// Generic motivational override (~15% chance)
	const motivational = [ 'Ready to create', "Let's get started" ];

	if ( Math.random() < 0.15 ) {
		greeting = motivational[ Math.floor( Math.random() * motivational.length ) ];
	}

	if ( firstName ) {
		// "Ready to create" uses a question mark style
		if ( greeting === 'Ready to create' ) {
			return `${ greeting }, ${ firstName }?`;
		}
		return `${ greeting }, ${ firstName }`;
	}

	if ( greeting === 'Ready to create' ) {
		return `${ greeting }?`;
	}
	return greeting;
}
