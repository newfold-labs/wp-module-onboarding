import { __ } from '@wordpress/i18n'; 
/**
 * A Mini Preview Section.
 *
 * @returns
 */
const MiniPreview = ({ title, desc, icon }) => {
    var iconPreview = icon == "" || icon == undefined ? '--default-logo-icon' : icon;
    var titlePreview = title == "" ? 'Aurelia Shop' : title?.substring(0, 20);
    var descPreview = desc == "" ? 'Aurelia Shop sells customized jewelry inspired to the beauty of the Sea.' : desc;
    var urlPreview = title == "" ? 'https://aureliashop.com' : titleToUrl(title);
    
    function titleToUrl(title) {
        return `https://${title?.substring(0, 20).toLowerCase().replace(/\s/g, '').replace(/\W/g, '')}.com`;
    }
    
    return (
        <div>
            <h4 className="mini-preview">Preview</h4>
            <div className="browser-container">
                <div className="browser-row-title">
                    <div className="browser-row-title_buttons">
                        <span className="browser-dot" style={{ background: '#ED594A' }}></span>
                        <span className="browser-dot" style={{ background: '#FDD800' }}></span>
                        <span className="browser-dot" style={{ background: '#5AC05A' }}></span>
                    </div>
                    <div className="browser-row-title_bar">
                        { (icon == 0 || icon == undefined) && (<div className="browser-icon" style={{ content: 'var(--default-logo-icon)'}}></div>)}
                        { (icon != 0 && icon != undefined) && (<img
                            className="browser-icon"
                            src={iconPreview.url}
                            alt="Thumb"
                        />)}
                        <div className="browser-row-title_bar-text">{__(
                            titlePreview?.substring(0, 18),
                            'wp-module-onboarding'
                        )}</div>
                    </div>
                </div>
                <div className="browser-row-search">
                    <div className="browser-row-search__icons">
                        <div className="browser-icon" style={{ backgroundImage: 'var(--back-icon)' }}></div>
                        <div className="browser-icon" style={{ backgroundImage: 'var(--forward-icon)' }}></div>
                        <div className="browser-icon" style={{ backgroundImage: 'var(--reload-icon)' }}></div>
                    </div>
                    <div className="browser-row-search__search-box">
                        <input className="browser-row-search__search-box_input" type="text" value={__(
                            urlPreview,
                            'wp-module-onboarding'
                        )}></input>
                    </div>
                    <div className="browser-row-search__more">
                        <div className="browser-icon" style={{ backgroundImage: 'var(--more-icon)' }}></div>
                    </div>
                </div>
                <div className="browser-content">
                    <div className="browser-content_top-row">
                        <h4 className="browser-content_top-row-name">{__(
                            titlePreview,
                            'wp-module-onboarding'
                        )}</h4>
                        <a className="browser-content_top-row-link">{__(
                            urlPreview,
                            'wp-module-onboarding'
                        )}</a>
                    </div>
                    <h5 className="browser-content_desc">
                        {__(
                            descPreview,
                            'wp-module-onboarding'
                        )}
                    </h5>
                    <div className="browser-content_social">
                        <div className="browser-content_social_icon" style={{ fill: 'red', backgroundImage: 'var(--facebook-colored-icon)' }} />
                        <div className="browser-content_social_icon" style={{ backgroundImage: 'var(--twitter-colored-icon)' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiniPreview;
