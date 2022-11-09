import { useState } from '@wordpress/element';

import { LivePreview } from "..";

const SelectableCardWithTitleAndDescription = (
    {
        className = 'live-preview--selectable-card--title-description',
        selected = false,
        blockGrammer,
        viewportWidth = 1500,
        styling = 'large',
        previewSettings,
        onClick = false,
        skeletonLoadingTime = 2500,
    }
) => {
    const [ loadingParent, setIsLoadingParent ] = useState( true );

    return (
		<div
			className={ `${ className }` }
			onClick={ typeof onClick === 'function' && ( () => {
				if ( ! loadingParent ) {
					onClick();
				}
			} ) }
		>
			<div className={ `${ className }__live-preview-container` }>
				<LivePreview
					styling={ styling }
					blockGrammer={ blockGrammer }
					viewportWidth={ viewportWidth }
					previewSettings={ previewSettings }
					setIsLoadingParent={ setIsLoadingParent }
					skeletonLoadingTime={ skeletonLoadingTime }
				/>
			</div>
		</div>
	);
}

export default SelectableCardWithTitleAndDescription;