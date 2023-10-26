import { addThemeSuffix } from '../../utils/helper';

const AIHeading = ( { title } ) => {
	return (
		<div className={ addThemeSuffix( 'ai-heading' ) }>
			<div className={ addThemeSuffix( 'ai-heading--icon' ) } />
			<div className={ addThemeSuffix( 'ai-heading--title' ) }>
				{ title }
			</div>
		</div>
	);
};

export default AIHeading;
