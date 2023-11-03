import { addThemeSuffix } from '../../utils/helper';
import { Icon, chevronRight } from '@wordpress/icons';

const CardWithOptions = ( { title, options, skip, setSelection } ) => {
	const buildOptions = () => {
		return options.map( ( data, idx ) => {
			return (
				<div
					key={ idx }
					role="button"
					tabIndex={ 0 }
					className={ addThemeSuffix( 'nfd-sg-card__data__option' ) }
					onClick={ () => {
						setSelection( idx );
					} }
					onKeyDown={ () => {
						setSelection( idx );
					} }
				>
					<div
						className={ addThemeSuffix(
							'nfd-sg-card__data__option__left'
						) }
					>
						<div
							className={ addThemeSuffix(
								'nfd-sg-card__data__option__left_top'
							) }
						>
							{ data.title }
						</div>
						<div
							className={ addThemeSuffix(
								'nfd-sg-card__data__option__left_bottom'
							) }
						>
							{ data.desc }
						</div>
					</div>
					<Icon
						className={ addThemeSuffix(
							'nfd-sg-card__data__option__right'
						) }
						icon={ chevronRight }
					/>
				</div>
			);
		} );
	};

	return (
		<div className={ addThemeSuffix( 'nfd-sg-card' ) }>
			<div className={ addThemeSuffix( 'nfd-sg-card__title' ) }>
				{ title }
			</div>
			<div className={ addThemeSuffix( 'nfd-sg-card__data' ) }>
				{ buildOptions() }
			</div>
			<div
				role="button"
				tabIndex={ 0 }
				className={ addThemeSuffix( 'nfd-sg-card__skip' ) }
				onClick={ () => {
					setSelection( -1 );
				} }
				onKeyDown={ () => {
					setSelection( -1 );
				} }
			>
				{ skip }
			</div>
		</div>
	);
};

export default CardWithOptions;
