/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

/**
 * Custom hook to manage editor rendering mode
 * @return {Object} Editor control functions and state
 */
export const useEditorControls = () => {
	const { setRenderingMode } = useDispatch( editorStore );

	const renderingMode = useSelect( ( select ) => {
		const editor = select( editorStore );
		return editor?.getRenderingMode ? editor.getRenderingMode() : null;
	}, [] );

	return {
		setShowTemplate: () => {
			if ( setRenderingMode && renderingMode !== 'template-locked' ) {
				setRenderingMode( 'template-locked' );
				return true;
			}
			return false;
		},
	};
};
