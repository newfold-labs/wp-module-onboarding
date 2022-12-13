/**
* Common Tab Component
*
* @returns Tab
*/

const Tab = ({ title, text, imgType, className }) => {
    return (
        <div className={className}>
            <div className="tab-text">
                <h4>{title}</h4>
                {text}
            </div>
            <div className="tab-image">
                <div className={imgType}></div>
            </div>
        </div>

    );
};

export default Tab;
