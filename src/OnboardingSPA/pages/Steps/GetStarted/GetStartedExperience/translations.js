import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
 
registerBlockType( 'myguten/simple', {
    apiVersion: 2,
    title: __( 'Simple Block', 'myguten' ),
    category: 'widgets',
 
    edit: () => {
        const blockProps = useBlockProps( { style: { color: 'red' } } );
 
        return <p { ...blockProps }>{ __( 'Hello World', 'myguten' ) }</p>;
    },
 
    save: () => {
        const blockProps = useBlockProps.save( { style: { color: 'red' } } );
 
        return <p { ...blockProps }>{ __( 'Hello World', 'myguten' ) }</p>;
    },
} );