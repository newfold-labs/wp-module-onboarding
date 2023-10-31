import { addThemeSuffix } from '../../utils/helper';
import { Icon, chevronRight } from '@wordpress/icons';

const CardWithOptions = ( { title, options, skip } ) => {
	const buildOptions = () => {
		return options.map( ( data, idx ) => {
			return (
				<div
					key={ idx }
					className={ addThemeSuffix( 'nfd-sg-card__data__option' ) }
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
			<div className={ addThemeSuffix( 'nfd-sg-card__skip' ) }>
				{ skip }
			</div>
		</div>
	);
};

export default CardWithOptions;
