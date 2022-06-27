/**
 * A Mini Preview Section.
 *
 * @returns
 */
const MiniPreview = ({ title, desc, icon, isImageSelected }) => {

    var iconPreview = icon == "" ? '--reload-icon' : icon;
    var titlePreview = title == "" ? 'Shop Name' : title.substring(0, 20);
    var descPreview = desc == "" ? 'About your Shop' : desc;
    var urlPreview = title == "" ? 'https://yourshopname.com' : `https://${title.substring(0, 20).toLowerCase().replace(/\s/g, '').replace(/\W/g, '')}.com`;
    console.log('Boom', isImageSelected, iconPreview);
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
                        {!isImageSelected && (<div className="browser-icon" style={{ backgroundImage: `var(${iconPreview})` }}></div>)}
                        { isImageSelected && (<img
                            className="browser-icon"
                            src={URL.createObjectURL(iconPreview)}
                            alt="Thumb"
                        />)}
                        <div className="browser-row-title_bar-text">{titlePreview}</div>
                    </div>
                </div>
                <div className="browser-row-search">
                    <div className="browser-row-search__icons">
                        <div className="browser-icon" style={{ backgroundImage: 'var(--back-icon)' }}></div>
                        <div className="browser-icon" style={{ backgroundImage: 'var(--forward-icon)' }}></div>
                        <div className="browser-icon" style={{ backgroundImage: 'var(--reload-icon)' }}></div>
                    </div>
                    <div className="browser-row-search__search-box">
                        <input className="browser-row-search__search-box_input" type="text" value={urlPreview}></input>
                    </div>
                    <div className="browser-row-search__more">
                        <div className="browser-icon" style={{ backgroundImage: 'var(--more-icon)' }}></div>
                    </div>
                </div>
                <div className="browser-content">
                    <div className="browser-content_top-row">
                        <h4 className="browser-content_top-row-name">{titlePreview}</h4>
                        <a className="browser-content_top-row-link">{urlPreview}</a>
                    </div>
                    <h5 className="browser-content_desc">
                        {descPreview}
                    </h5>
                    <div className="browser-content_social">
                        <div className="browser-content_social_icon" style={{ backgroundImage: 'var(--facebook-icon)' }} />
                        <div className="browser-content_social_icon" style={{ backgroundImage: 'var(--facebook-icon)' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiniPreview;