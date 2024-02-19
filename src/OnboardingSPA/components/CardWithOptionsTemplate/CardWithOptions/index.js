import { OptionItem } from '../';
import { memo } from '@wordpress/element';

const CardWithOptions = ( { title, options, selection, callback } ) => {
	const buildOptions = () => {
		return options.map( ( data, idx ) => {
			return (
				<OptionItem
					key={ idx }
					idx={ idx }
					title={ data.title }
					desc={ data.desc }
					isSelected={ data.key === selection }
					callback={ callback }
				/>
			);
		} );
	};

	return (
		<div className={ 'nfd-sg-card' }>
			<div className={ 'nfd-sg-card__title' }>{ title }</div>
			<div className={ 'nfd-sg-card__data' }>{ buildOptions() }</div>
		</div>
	);
};

export default memo( CardWithOptions );
