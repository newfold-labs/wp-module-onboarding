import { memo } from '@wordpress/element';
import OptionWithHeadingSubHeading from '../OptionWithHeadingSubHeading';

const CardWithOptions = ( { title, options, selection, callback } ) => {
	const buildCardOptions = () => {
		return options.map( ( data, idx ) => {
			return (
				<OptionWithHeadingSubHeading
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
			<div className={ 'nfd-sg-card__data' }>{ buildCardOptions() }</div>
		</div>
	);
};

export default memo( CardWithOptions );
