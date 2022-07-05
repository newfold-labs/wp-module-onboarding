import { useState, useEffect } from '@wordpress/element';

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

    const handleChange = (e, social) => {
        switch(social){
            case 'facebook': 
                setFacebook(e.target.value);
                socialMediaData.facebook_site = e.target.value;
                break;
            case 'twitter':
                setTwitter(e.target.value);
                socialMediaData.twitter_site = e.target.value;
                break;
            case 'instagram':
                setInstagram(e.target.value);
                socialMediaData.instagram_url = e.target.value;
                break;
            case 'youtube':
                setYouTube(e.target.value);
                socialMediaData.youtube_url = e.target.value;
                break;
            case 'linkedin':
                setLinkedIn(e.target.value);
                socialMediaData.linkedin_url = e.target.value;
                break;
            case 'yelp':
                setYelp(e.target.value);
                socialMediaData.other_social_urls["yelp_url"] = e.target.value;
                break;
            case 'tiktok':
                setTikTok(e.target.value);
                socialMediaData.other_social_urls["tiktok_url"] = e.target.value;
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
                <input className="social-form__box" type="text" placeholder="https://www.facebok.com/aurelia" value={facebook} onChange={(e) => { handleChange(e, 'facebook') }} /><br />
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--twitter-icon)' }}/>
                    <div className="social-form__label_name">Twitter</div>
                </label>
                <input className="social-form__box" type="text" value={twitter} onChange={(e) => { handleChange(e, 'twitter') }} /><br />
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--instagram-icon)' }}/>
                    <div className="social-form__label_name">Instagram</div>
                </label>
                <input className="social-form__box" type="text" value={instagram} onChange={(e) => { handleChange(e, 'instagram') }} /><br />
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--youtube-icon)' }}/>
                    <div className="social-form__label_name">YouTube</div>
                </label>
                <input className="social-form__box" type="text" value={youtube} onChange={(e) => { handleChange(e, 'youtube') }} /><br />
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--linkedin-icon)' }}/>
                    <div className="social-form__label_name">LinkedIn</div>
                </label>
                <input className="social-form__box" type="text" value={linkedin} onChange={(e) => { handleChange(e, 'linkedin') }} /><br />
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--yelp-icon)' }}/>
                    <div className="social-form__label_name">Yelp</div>
                </label>
                <input className="social-form__box" type="text" value={yelp} onChange={(e) => { handleChange(e, 'yelp') }} /><br />
                <label className='social-form__label' >
                    <div className="social-form__label_icon" style={{ backgroundImage: 'var(--tiktok-icon)' }}/>
                    <div className="social-form__label_name">TikTok</div>
                </label>
                <input className="social-form__box" type="text" value={tiktok} onChange={(e) => { handleChange(e, 'tiktok') }} /><br />
            </form>
        </div>
    );
};

export default SocialMediaForm;
