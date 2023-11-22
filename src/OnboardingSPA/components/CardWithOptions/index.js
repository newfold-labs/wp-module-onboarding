import { Icon, chevronRight } from '@wordpress/icons';

const CardWithOptions = ( { title, options, skip, callback } ) => {
	const buildOptions = () => {
		return options.map( ( data, idx ) => {
			return (
				<div
					key={ idx }
					role="button"
					tabIndex={ 0 }
					className={ 'nfd-sg-card__data__option' }
					onClick={ () => {
						if ( callback && typeof callback === 'function' ) {
							callback( idx + 1 );
						}
					} }
					onKeyDown={ () => {
						if ( callback && typeof callback === 'function' ) {
							callback( idx + 1 );
						}
					} }
				>
					<div className={ 'nfd-sg-card__data__option__left' }>
						<div
							className={ 'nfd-sg-card__data__option__left_top' }
						>
							{ data.title }
						</div>
						<div
							className={
								'nfd-sg-card__data__option__left_bottom'
							}
						>
							{ data.desc }
						</div>
					</div>
					<Icon
						className={ 'nfd-sg-card__data__option__right' }
						icon={ chevronRight }
					/>
				</div>
			);
		} );
	};

	return (
		<div className={ 'nfd-sg-card' }>
			<div className={ 'nfd-sg-card__title' }>{ title }</div>
			<div className={ 'nfd-sg-card__data' }>{ buildOptions() }</div>
			<div
				role="button"
				tabIndex={ 0 }
				className={ 'nfd-sg-card__skip' }
				onClick={ () => {
					if ( callback && typeof callback === 'function' ) {
						callback( -1 );
					}
				} }
				onKeyDown={ () => {
					if ( callback && typeof callback === 'function' ) {
						callback( -1 );
					}
				} }
			>
				{ skip }
			</div>
		</div>
	);
};

export default CardWithOptions;
