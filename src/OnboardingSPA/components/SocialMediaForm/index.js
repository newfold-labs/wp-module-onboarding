import Tooltip from './../Tooltip'
import _ from 'lodash';
import { useState, useEffect } from '@wordpress/element';

const SocialMediaForm = ({ socialData, setSocialData, setIsValidSocials }) => {
    const [isActive, setIsActive] = useState(false);
    const [facebook, setFacebook] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");
    const [youtube, setYouTube] = useState("");
    const [linkedin, setLinkedIn] = useState("");
    const [yelp, setYelp] = useState("");
    const [tiktok, setTikTok] = useState("");

    const [activeError, setActiveError] = useState([]);

    const SocialMediaSites = {
        FACEBOOK: 'facebook',
        TWITTER: 'twitter',
        INSTAGRAM: 'instagram',
        YOUTUBE: 'youtube',
        LINKEDIN: 'linkedin',
        YELP: 'yelp',
        TIKTOK: 'tiktok',
    }

    var socialMediaDB = {
        "facebook_site": facebook,
        "twitter_site": twitter,
        "instagram_url": instagram,
        "youtube_url": youtube,
        "linkedin_url": linkedin,
        "other_social_urls": {
            "yelp_url": yelp,
            "tiktok_url": tiktok,
        }
    }

    useEffect(() => {
        setFacebook(socialData?.facebook_site ?? "");
        setTwitter(socialData?.twitter_site ?? "");
        setInstagram(socialData?.instagram_url ?? "");
        setYouTube(socialData?.youtube_url ?? "");
        setLinkedIn(socialData?.linkedin_url ?? "");
        if (Object.keys(socialData).includes("other_social_urls"))
        {
            const otherURLS = socialData.other_social_urls;
            if (Object.keys(otherURLS).includes("yelp_url"))
                setYelp(otherURLS["yelp_url"] ?? "");

            if (Object.keys(otherURLS).includes("tiktok_url"))
                setTikTok(otherURLS["tiktok_url"] ?? "");
        }

    }, [socialData]);

    const isValidUrl = (urlString) => {
        let url;
        try {
            url = new URL(urlString);
        }
        catch (e) {
            return false;
        }

        if (url.protocol !== "http:" && url.protocol !== "https:")
            return false;

        return true;
    }

    const checkValidUrl = function(socialInput, data) {

        if (!isValidUrl(data))
        {
            if (!activeError.includes(socialInput))
                setActiveError([...activeError, socialInput]);
        }
        else {
            var activeErrorFiltered = activeError.filter(function (item) {
                return item !== socialInput
            })
            setActiveError(activeErrorFiltered);
        }

        if (!data){
            var activeErrorFiltered = activeError.filter(function (item) {
                return item !== socialInput
            })
            setActiveError(activeErrorFiltered);
        }

        if (activeError.length == 0)
            setIsValidSocials(true);
        else
            setIsValidSocials(false);
    }

    const checkValidUrlDebounce = _.debounce(checkValidUrl, 1000);

    const handleAccordion = (e) => {
        setIsActive(!isActive);
    }

    const handleChange = (e, social) => {
        const value = e.target.value;
        switch(social){
            case SocialMediaSites.FACEBOOK:
                checkValidUrlDebounce(SocialMediaSites.FACEBOOK, value);
                setFacebook(value);
                socialMediaDB.facebook_site = value;
                break;
            case SocialMediaSites.TWITTER:
                checkValidUrlDebounce(SocialMediaSites.TWITTER, value);
                setTwitter(value);
                socialMediaDB.twitter_site = value;
                break;
            case SocialMediaSites.INSTAGRAM:
                checkValidUrlDebounce(SocialMediaSites.INSTAGRAM, value);
                setInstagram(value);
                socialMediaDB.instagram_url = value;
                break;
            case SocialMediaSites.YOUTUBE:
                checkValidUrlDebounce(SocialMediaSites.YOUTUBE, value);
                setYouTube(value);
                socialMediaDB.youtube_url = value;
                break;
            case SocialMediaSites.LINKEDIN:
                checkValidUrlDebounce(SocialMediaSites.LINKEDIN, value);
                setLinkedIn(value);
                socialMediaDB.linkedin_url = value;
                break;
            case SocialMediaSites.YELP:
                checkValidUrlDebounce(SocialMediaSites.YELP, value)
                setYelp(value);
                socialMediaDB.other_social_urls["yelp_url"] = value;
                break;
            case SocialMediaSites.TIKTOK:
                checkValidUrlDebounce(SocialMediaSites.TIKTOK, value);
                setTikTok(value);
                socialMediaDB.other_social_urls["tiktok_url"] = value;
                break;
        }
        setSocialData(socialMediaDB);
    }

    return (
        <div className="social-form">
            <div className="social-form__top-row" onClick={(e) => { handleAccordion(e)}}>
                <div className="social-form__top-row_heading">Social Media</div>
                <div className={`social-form__top-row_icon ${isActive ? 'social-form__top-row_icon_opened' : ''}`}></div>
            </div>
            <form style={{ display: isActive ? '' : 'none'}} onSubmit={(e) => { handleSubmit(e) }}>
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--facebook-icon)' }}/>
                    <div className="social-form__label_name">Facebook</div>
                </label>
                <Tooltip content={activeError.includes(SocialMediaSites.FACEBOOK) ? `Please enter a valid ${SocialMediaSites.FACEBOOK} URL` : 'hide'} direction="top">
                    <input className={`${ activeError.includes(SocialMediaSites.FACEBOOK) ? "social-form__box-error": "social-form__box"}`} type="url" placeholder="https://www.facebook.com/aurelia" value={facebook} onChange={(value) => { handleChange(value, SocialMediaSites.FACEBOOK) }} />
                </Tooltip>
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--twitter-icon)' }}/>
                    <div className="social-form__label_name">Twitter</div>
                </label>
                <Tooltip content={activeError.includes(SocialMediaSites.TWITTER) ? `Please enter a valid ${SocialMediaSites.TWITTER} URL` : 'hide'} direction="top">
                <input className={`${activeError.includes(SocialMediaSites.TWITTER) ? "social-form__box-error": "social-form__box"}`} type="url" value={twitter} onChange={(e) => { handleChange(e, SocialMediaSites.TWITTER) }} />
                </Tooltip>
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--instagram-icon)' }}/>
                    <div className="social-form__label_name">Instagram</div>
                </label>
                <Tooltip content={activeError.includes(SocialMediaSites.INSTAGRAM) ? `Please enter a valid ${SocialMediaSites.INSTAGRAM} URL` : 'hide'} direction="top">
                    <input className={`${activeError.includes(SocialMediaSites.INSTAGRAM) ? "social-form__box-error" : "social-form__box"}`} type="url" value={instagram} onChange={(e) => { handleChange(e, SocialMediaSites.INSTAGRAM) }} />
                </Tooltip>
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--youtube-icon)' }}/>
                    <div className="social-form__label_name">YouTube</div>
                </label>
                <Tooltip content={activeError.includes(SocialMediaSites.YOUTUBE) ? `Please enter a valid ${SocialMediaSites.YOUTUBE} URL` : 'hide'} direction="top">
                <input className={`${activeError.includes(SocialMediaSites.YOUTUBE) ? "social-form__box-error": "social-form__box"}`} type="url" value={youtube} onChange={(e) => { handleChange(e, SocialMediaSites.YOUTUBE) }} />
                </Tooltip>
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--linkedin-icon)' }}/>
                    <div className="social-form__label_name">LinkedIn</div>
                </label>
                <Tooltip content={activeError.includes(SocialMediaSites.LINKEDIN) ? `Please enter a valid ${SocialMediaSites.LINKEDIN} URL` : 'hide'} direction="top">
                <input className={`${activeError.includes(SocialMediaSites.LINKEDIN) ? "social-form__box-error": "social-form__box"}`} type="url" value={linkedin} onChange={(e) => { handleChange(e, SocialMediaSites.LINKEDIN) }} />
                </Tooltip>
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--yelp-icon)' }}/>
                    <div className="social-form__label_name">Yelp</div>
                </label>
                <Tooltip content={activeError.includes(SocialMediaSites.YELP) ? `Please enter a valid ${SocialMediaSites.YELP} URL` : 'hide'} direction="top">
                <input className={`${activeError.includes(SocialMediaSites.YELP) ? "social-form__box-error": "social-form__box"}`} type="url" value={yelp} onChange={(e) => { handleChange(e, SocialMediaSites.YELP) }} />
                </Tooltip>
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--tiktok-icon)' }}/>
                    <div className="social-form__label_name">TikTok</div>
                </label>
                <Tooltip content={activeError.includes(SocialMediaSites.TIKTOK) ? `Please enter a valid ${SocialMediaSites.TIKTOK} URL` : 'hide'} direction="top">
                <input className={`${activeError.includes(SocialMediaSites.TIKTOK) ? "social-form__box-error": "social-form__box"}`} type="url" value={tiktok} onChange={(e) => { handleChange(e, SocialMediaSites.TIKTOK) }} />
            </Tooltip>
            </form>
        </div>
    );
};

export default SocialMediaForm;
