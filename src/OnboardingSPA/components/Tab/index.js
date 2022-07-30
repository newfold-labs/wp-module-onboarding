/**
* Common Tab Component
*
* @returns Tab
*/

const Tab = ({ title, text, imgType, className }) => {
    return (
        <div className={className}>
            <div className="content-text">
                <h4>{title}</h4>
                {text}
            </div>
            <div className={imgType}></div>
        </div>

    );
};

export default Tab;
