/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from "@wordpress/data";
import {
	BlockEditorProvider,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import AutoHeightBlockPreview from "./auto";
import { useGlobalStylesOutput } from '../../utils/global-styles/use-global-styles-output';
import { parse } from "@wordpress/blocks";
import { useEffect, useState } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { store as nfdOnboardingStore } from "../../store";

/**
 * Renders themed WordPress block grammer.
 * [Note] Please do not remove any commented code, this will be used later to update our preview
 *
 * @property {string} blockGrammer        WordPress block grammer.
 * @property {number} viewportWidth       Set viewport width for the AutoHeightBlockPreview component.
 * @property {string} styling             The type of styling to be applied (small, large, custom).
 */
const LivePreview = ({
	blockGrammer,
	viewportWidth = 1300,
	styling = "large",
    previewSettings = false
}) => {
	const [blocks, setBlocks] = useState();
    const [settings, setSettings] = useState();
    var storedPreviewSettings

    if ( ! previewSettings ) {
        storedPreviewSettings = useSelect(
            (select) => select(nfdOnboardingStore).getPreviewSettings(),
            []
        );
    }

	const { updateSettings } = useDispatch(blockEditorStore);
	// const { updatePreviewSettings } = useDispatch(nfdOnboardingStore);

	useEffect(() => {
        if ( previewSettings ) {
            setSettings( useGlobalStylesOutput( previewSettings ) );
        } else {
            setSettings( storedPreviewSettings );
        }
		// // BlockPreview reads settings from the core/block-editor store
		// updateSettings(updatedPreviewSettings.settings);
		// updatePreviewSettings(updatedPreviewSettings.settings)
		setBlocks(parse(blockGrammer));
	}, []);

    useEffect(() => {
        if ( ! previewSettings ) {
            setSettings( storedPreviewSettings );
        }
    }, [storedPreviewSettings])


	return (
        <div className={`live-preview__container-${styling}`}>
            { settings && <BlockEditorProvider value={blocks} settings={settings.settings}>
            <AutoHeightBlockPreview
                viewportWidth={viewportWidth}
                settings={settings.settings}
            />
        </BlockEditorProvider> }
    </div>
	);
};

export default LivePreview;
