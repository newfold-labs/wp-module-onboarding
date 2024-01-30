import { memo } from '@wordpress/element';
import OrbAnimation from '../../OrbAnimation';
const AIHeading = ( { title } ) => {
	return (
		<div className={ 'ai-heading' }>
			<OrbAnimation height={ `50px` } />
			<div className={ 'ai-heading--title' }>{ title }</div>
		</div>
	);
};

export default memo( AIHeading );
