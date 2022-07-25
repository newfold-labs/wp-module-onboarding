/**
* Common Tab Component
*
* @returns Tab
*/

const Tab = ({ title, text, imgType, className }) => {
    return (
        <div class={className}>
            <div class="content-text">
                <h4>{title}</h4>
                {text}
            </div>
            <div class={imgType}></div>
        </div>

    );
};

export default Tab;
