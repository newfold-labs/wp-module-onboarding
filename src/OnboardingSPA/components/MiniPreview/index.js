import { memo, useState, useEffect } from '@wordpress/element';

import getContents from './contents';

const MiniPreview = ( {
	title,
	desc,
	icon,
	socialData,
	isSocialFormOpen,
	setIsSocialFormOpen,
} ) => {
	const content = getContents();
	const titlePreview = title === '' ? content.defaultTitle : title;
	const descPreview = desc === '' ? content.defaultDesc : desc;
	const urlPreview = title === '' ? content.defaultUrl : titleToUrl();

	const [ facebook, setFacebook ] = useState( '' );
	const [ twitter, setTwitter ] = useState( '' );
	const [ instagram, setInstagram ] = useState( '' );
	const [ youtube, setYouTube ] = useState( '' );
	const [ linkedin, setLinkedIn ] = useState( '' );
	const [ yelp, setYelp ] = useState( '' );
	const [ tiktok, setTikTok ] = useState( '' );

	useEffect( () => {
		setFacebook( socialData?.facebook_site ?? '' );
		setTwitter( socialData?.twitter_site ?? '' );
		setInstagram( socialData?.instagram_url ?? '' );
		setYouTube( socialData?.youtube_url ?? '' );
		setLinkedIn( socialData?.linkedin_url ?? '' );
		if (
			socialData &&
			Object.keys( socialData ).includes( 'other_social_urls' )
		) {
			const otherURLS = socialData.other_social_urls;
			if ( Object.keys( otherURLS ).includes( 'yelp_url' ) ) {
				setYelp( otherURLS.yelp_url ?? '' );
			}

			if ( Object.keys( otherURLS ).includes( 'tiktok_url' ) ) {
				setTikTok( otherURLS.tiktok_url ?? '' );
			}
		}
	}, [ socialData ] );

	const isValidUrl = ( urlString ) => {
		let url;
		try {
			url = new URL( urlString );
		} catch ( e ) {
			return false;
		}

		if ( url.protocol !== 'http:' && url.protocol !== 'https:' ) {
			return false;
		}
		return true;
	};

	const socialDataset = [
		{ url: facebook, image: 'var(--facebook-icon)' },
		{ url: twitter, image: 'var(--twitter-icon)' },
		{ url: instagram, image: 'var(--instagram-icon)' },
		{ url: youtube, image: 'var(--youtube-icon)' },
		{ url: linkedin, image: 'var(--linkedin-icon)' },
		{ url: yelp, image: 'var(--yelp-icon)' },
		{ url: tiktok, image: 'var(--tiktok-icon)' },
	];

	function titleToUrl() {
		return `https://${ title
			?.toLowerCase()
			.replace( /\s/g, '' )
			.replace( /\W/g, '' ) }.com`;
	}

	function socialIconList() {
		return socialDataset.map( ( socialInfo, idx ) => {
			return (
				<div
					key={ socialInfo.image }
					tabIndex={ idx + 1 }
					role="button"
					onClick={ () => setIsSocialFormOpen( ! isSocialFormOpen ) }
					onKeyDown={ () =>
						setIsSocialFormOpen( ! isSocialFormOpen )
					}
					className={ `browser-content_social_icon ${
						socialInfo.url
							? isValidUrl( socialInfo.url ) || '--invalid-url'
							: '--no-url'
					}` }
					style={ { backgroundImage: socialInfo.image } }
				/>
			);
		} );
	}

	return (
		<div>
			<h4 className="mini-preview">Preview</h4>
			<div className="browser-container">
				<div className="browser-row-title">
					<div className="browser-row-title_main">
						<div className="browser-row-title_buttons">
							<span
								className="browser-dot"
								style={ { background: '#ED594A' } }
							></span>
							<span
								className="browser-dot"
								style={ { background: '#FDD800' } }
							></span>
							<span
								className="browser-dot"
								style={ { background: '#5AC05A' } }
							></span>
						</div>
					</div>
					<div className="browser-row-title_bar">
						<div className="browser-row-title_bar_before">
							<div className="browser-row-title_bar_before-curve"></div>
						</div>
						<div className="browser-row-title_bar_main">
							{ ( icon === undefined || icon?.id === 0 ) && (
								<div
									className="browser-icon-title"
									style={ {
										content: 'var(--default-logo-icon)',
									} }
								></div>
							) }
							{ icon !== undefined && icon?.id !== 0 && (
								<img
									className="browser-icon-title"
									src={ icon?.url }
									alt="Thumb"
								/>
							) }
							<div className="browser-row-title_bar_main-text">
								{ titlePreview?.substring( 0, 20 ) }
							</div>
							<div className="browser-row-title_bar_main-cross">
								x
							</div>
						</div>
						<div className="browser-row-title_bar_after">
							<div className="browser-row-title_bar_after-curve"></div>
						</div>
					</div>
				</div>
				<div className="browser-row-search">
					<div className="browser-row-search__icons">
						<div
							className="browser-icon"
							style={ { backgroundImage: 'var(--back-icon)' } }
						></div>
						<div
							className="browser-icon"
							style={ { backgroundImage: 'var(--forward-icon)' } }
						></div>
						<div
							className="browser-icon"
							style={ { backgroundImage: 'var(--reload-icon)' } }
						></div>
					</div>
					<div className="browser-row-search__search-box">
						<input
							className="browser-row-search__search-box_input"
							type="text"
							onChange={ () => {} }
							value={ urlPreview }
						></input>
					</div>
					<div className="browser-row-search__more">
						<div
							className="browser-icon"
							style={ { backgroundImage: 'var(--more-icon)' } }
						></div>
					</div>
				</div>
				<div className="browser-content">
					<div className="browser-content_top-row">
						<h4 className="browser-content_top-row-name">
							{ titlePreview }
						</h4>
						<span className="browser-content_top-row-link">
							{ urlPreview }
						</span>
					</div>
					<h5 className="browser-content_desc">{ descPreview }</h5>
					<div className="browser-content_social">
						{ socialIconList() }
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo( MiniPreview );
