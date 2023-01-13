/**
 * A Animator to show animation
 *
 * @param {string} type              The Animation to be shown.
 * @param {string} children          The children to be rendered out.
 * @param {number} after             The variable to look after for before showing the animation, by default true to show the children right away.
 *
 */
const Animate = ({ type, after = true, children }) => {

    /**
     * @param {GetAnimateOptions} options
     *
     * @return {string | void} ClassName that applies the animations
    */
    function getAnimateClassName() {

        let classname = '';
        const prefix = 'animate';

        switch ( type ) {

            // Add animation types and appropriate CSS
            case 'fade-in':
                classname = prefix.concat('__fade-in');
                break;
        }

        return classname;
    }

    return !after ? (
        <div className='animate__blank'>
            {children}
        </div>
    ) : (
        <div className={getAnimateClassName()}>
            {children}
        </div>
    );
};

export default Animate;
