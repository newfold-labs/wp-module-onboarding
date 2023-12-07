import { getRandomColorPalette } from '../sitemeta/siteMeta';
import one from './1.json';
import two from './2.json';
import three from './3.json';
import four from './4.json';
const getHomepages = () => {
	return [ one, two, three ];
};

const getRandom = ( homepage ) => {
	if ( homepage?.favorite ) {
		homepage.slug = homepage.slug + '-copy';
		homepage.title = homepage.title + ' Copy';
		homepage.favorite = false;
		homepage.color = getRandomColorPalette( homepage?.color?.slug );
		return homepage;
	}
	four.color = getRandomColorPalette( homepage?.color?.slug );
	return four;
};

export { getHomepages, getRandom };
