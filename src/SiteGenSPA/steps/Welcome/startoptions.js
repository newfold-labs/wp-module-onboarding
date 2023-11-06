import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from '@wordpress/element';

const StartOptions = ( { questionnaire, options } ) => {
	const navigate = useNavigate();
	const [ path, setPath ] = useState();

	useEffect( () => {
		if ( path !== undefined ) {
			navigate( path );
		}
	}, [ navigate, path ] );

	return (
		<div className="">
			<p className="nfd-sitegen-heading__questionnaire">{ questionnaire }</p>
			<div className="nfd-sitegen-options-container">
				{ options.map( ( tab, idx ) => {
					return ( <div className="nfd-sitegen-options"
						key={ idx }
						role="button"
						tabIndex={ 0 }
						onClick={ () => {
							setPath( tab.path );
						} }
						onKeyDown={ () => {
							setPath( tab.path );
						} }
					>
						<h3 className="nfd-sitegen-heading__subtitle">
							{ tab.span && ( <span className="nfd-sitegen-options__span">{ tab.span }</span> ) }
							{ tab.title }
						</h3>
						<p>{ tab.subtitle }</p>
					</div> );
				} ) }

			</div>
		</div>

	);
};

export default StartOptions;
