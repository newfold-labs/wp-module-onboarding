import _ from 'lodash';
import { __ } from '@wordpress/i18n'; 
import { useState, useEffect } from '@wordpress/element';

import Tooltip from './../Tooltip'

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

    const SocialMediaStates = {
        FACEBOOK: facebook,
        TWITTER: twitter,
        INSTAGRAM: instagram,
        YOUTUBE: youtube,
        LINKEDIN: linkedin,
        YELP: yelp,
        TIKTOK: tiktok,
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

    const handleChange = (e) => {
        const value = e.target.value;
        const triggerID = e.target.id;
        switch (triggerID){
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

    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    function buildSocialBoxes() {
        var socialBoxes = [];
        for (var social in SocialMediaSites){
            socialBoxes.push(
                <div key={SocialMediaSites[social]}>
                    <label className={`social-form__label social-form__label-${SocialMediaSites[social]}`} >
                        <div className="social-form__label_icon" style={{ backgroundImage: `var(--${SocialMediaSites[social]}-icon)` }} />
                        <div className="social-form__label_name">{__(toTitleCase(SocialMediaSites[social]), 'wp-module-onboarding')}</div>
                    </label>
                    <Tooltip content={activeError.includes(SocialMediaSites[social]) ? `Please enter a valid ${SocialMediaSites[social]} URL` : 'hide'} direction="top">
                        <input className={`${activeError.includes(SocialMediaSites[social]) ? "social-form__box-error" : "social-form__box"}`} type="url" id={`${SocialMediaSites[social]}`} value={SocialMediaStates[social]} onChange={(value) => { handleChange(value) }} />
                    </Tooltip>
                </div>
            );
        }
        return socialBoxes;
    }

    return (
        <div className="social-form">
            <div className="social-form__top-row" onClick={(e) => { handleAccordion(e)}}>
                <div className="social-form__top-row_heading">
                    {__(
                        "Social Media",
                        'wp-module-onboarding'
                    )}
                </div>
                <div className={`social-form__top-row_icon ${isActive ? 'social-form__top-row_icon_opened' : ''}`}></div>
            </div>
            <form className={isActive ? 'social-form__main-active' : 'social-form__main-hidden'} onSubmit={(e) => { handleSubmit(e) }}>
                {buildSocialBoxes()}
            </form>
        </div>
    );
};

export default SocialMediaForm;
