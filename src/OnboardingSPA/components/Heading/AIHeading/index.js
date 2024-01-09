import { memo } from '@wordpress/element';

const AIHeading = ( { title } ) => {
	return (
		<div className={ 'ai-heading' }>
			<div className={ 'ai-heading--icon' } />
			<div className={ 'ai-heading--title' }>{ title }</div>
		</div>
	);
};

export default memo( AIHeading );
