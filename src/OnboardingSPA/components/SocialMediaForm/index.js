import { useState, useEffect } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

const SocialMediaForm = ({ socialData, setSocialData }) => {
    const [isActive, setIsActive] = useState(false);
    const [facebook, setFacebook] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");
    const [youtube, setYouTube] = useState("");
    const [linkedin, setLinkedIn] = useState("");
    const [yelp, setYelp] = useState("");
    const [tiktok, setTikTok] = useState("");

    var socialMediaData = {
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

    const handleAccordion = (e) => {
        setIsActive(!isActive);
    }

    const handleChange = (value, social) => {
        switch(social){
            case 'facebook': 
                setFacebook(value);
                socialMediaData.facebook_site = value;
                break;
            case 'twitter':
                setTwitter(value);
                socialMediaData.twitter_site = value;
                break;
            case 'instagram':
                setInstagram(value);
                socialMediaData.instagram_url = value;
                break;
            case 'youtube':
                setYouTube(value);
                socialMediaData.youtube_url = value;
                break;
            case 'linkedin':
                setLinkedIn(value);
                socialMediaData.linkedin_url = value;
                break;
            case 'yelp':
                setYelp(value);
                socialMediaData.other_social_urls["yelp_url"] = value;
                break;
            case 'tiktok':
                setTikTok(value);
                socialMediaData.other_social_urls["tiktok_url"] = value;
                break;
        }
        setSocialData(socialMediaData);
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
                <TextControl className="social-form__box" type="text" placeholder="https://www.facebok.com/aurelia" value={facebook} onChange={(value) => { handleChange(value, 'facebook') }} />
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--twitter-icon)' }}/>
                    <div className="social-form__label_name">Twitter</div>
                </label>
                <TextControl className="social-form__box" type="text" value={twitter} onChange={(value) => { handleChange(value, 'twitter') }} />
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--instagram-icon)' }}/>
                    <div className="social-form__label_name">Instagram</div>
                </label>
                <TextControl className="social-form__box" type="text" value={instagram} onChange={(value) => { handleChange(value, 'instagram') }} />
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--youtube-icon)' }}/>
                    <div className="social-form__label_name">YouTube</div>
                </label>
                <TextControl className="social-form__box" type="text" value={youtube} onChange={(value) => { handleChange(value, 'youtube') }} />
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--linkedin-icon)' }}/>
                    <div className="social-form__label_name">LinkedIn</div>
                </label>
                <TextControl className="social-form__box" type="text" value={linkedin} onChange={(value) => { handleChange(value, 'linkedin') }} />
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--yelp-icon)' }}/>
                    <div className="social-form__label_name">Yelp</div>
                </label>
                <TextControl className="social-form__box" type="text" value={yelp} onChange={(value) => { handleChange(value, 'yelp') }} />
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--tiktok-icon)' }}/>
                    <div className="social-form__label_name">TikTok</div>
                </label>
                <TextControl className="social-form__box" type="text" value={tiktok} onChange={(value) => { handleChange(value, 'tiktok') }} />
            </form>
        </div>
    );
};

export default SocialMediaForm;
