// eslint-disable-next-line import/no-extraneous-dependencies
import { filter } from 'lodash';

import { addAfterChapter } from '../data/flows/utils';
import { commerce } from './commerce';
import { demographic } from './demographic';
import { design } from './design';
import { features } from './features';
import { layoutContent } from './layoutContent';

const chapters = [ demographic, commerce, design, layoutContent, features ];

const getTopPriorityChapter = ( topPriority ) => {
	const topPriorityToChapterMap = {
		publishing: layoutContent,
		selling: commerce,
		designing: design,
	};

	return topPriorityToChapterMap[ topPriority ]
		? topPriorityToChapterMap[ topPriority ]
		: layoutContent;
};

export const getChaptersFromTopPriorityAndExperienceLevel = (
	initialChapters,
	topPriority,
	experienceLevel
) => {
	const topPriorityChapter = getTopPriorityChapter( topPriority );
	let finalChapters;
	switch ( experienceLevel ) {
		case '1':
			finalChapters = filter( initialChapters, ( chapter ) => {
				return chapter.id !== topPriorityChapter.id;
			} );
			finalChapters = addAfterChapter(
				finalChapters,
				demographic,
				topPriorityChapter
			);
			break;
		case '3':
			finalChapters = filter( initialChapters, ( chapter ) => {
				return (
					chapter.id !== topPriorityChapter.id &&
					( chapter.id === features.id ||
						chapter.id === demographic.id )
				);
			} );
			finalChapters = addAfterChapter(
				finalChapters,
				demographic,
				topPriorityChapter
			);
			break;
		case '5':
			finalChapters = filter( initialChapters, ( chapter ) => {
				return (
					chapter.id !== topPriorityChapter.id &&
					( chapter.id === features.id ||
						chapter.id === demographic.id )
				);
			} );
			break;
		default:
			finalChapters = filter( initialChapters, ( chapter ) => {
				return chapter.id !== topPriorityChapter.id;
			} );
			finalChapters = addAfterChapter(
				finalChapters,
				demographic,
				topPriorityChapter
			);
	}

	return finalChapters;
};

export const getChapterFromId = ( id ) => {
	return chapters.filter( ( chapter ) => {
		return chapter.id === id;
	} );
};

export const stateToStore = ( state, store, currentStep ) => {
	const dataToBeStored = {};
	state.forEach( ( chapter ) => {
		if ( store[ chapter.id ] ) {
			return ( dataToBeStored[ chapter.id ] = store[ chapter.id ] );
		}

		return ( dataToBeStored[ chapter.id ] = {
			completed: false,
			firstStep: chapter.steps[ 0 ].path,
			lastStep:
				currentStep?.chapter === chapter.id && currentStep?.path
					? currentStep?.path
					: '',
		} );
	} );

	return dataToBeStored;
};
