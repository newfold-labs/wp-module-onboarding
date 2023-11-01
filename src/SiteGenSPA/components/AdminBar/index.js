import { __ } from '@wordpress/i18n';
import { Icon, wordpress } from '@wordpress/icons';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';

const AdminBar = () => {
	const [ userData, setUserData ] = useState( null );

	useEffect( () => {
		apiFetch( { path: '/wp/v2/users/me' } )
			.then( ( data ) => {
				setUserData( data );
			} )
			.catch( ( error ) => {
				// eslint-disable-next-line no-console
				console.error( 'Error fetching user data:', error );
			} );
	}, [] );

	if ( ! userData ) {
		return null;
	}

	return (
		<div className="nfd-sitegen-admin-bar">
			<div className="nfd-admin-bar-wplogo">
				<Icon icon={ wordpress } />
				<span>{ __( 'WordPress', 'wp-module-onboarding' ) }</span>
			</div>
			<div className="nfd-sitegen-admin-bar-profile">
				<span className="nfd-admin-bar-greeting">
					<span>
						{ __( 'Howdy!', 'wp-module-onboarding' ) },{ ' ' }
						{ userData.name }
					</span>
				</span>
				<div className="nfd-admin-bar-avatar">
					<img
						src={ userData.avatar_urls[ '24' ] }
						alt={ userData.name }
					/>
				</div>
			</div>
		</div>
	);
};

export default AdminBar;
