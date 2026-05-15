/**
 * External dependencies
 */
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

/**
 * WordPress dependencies
 */
import { useRef, useCallback, useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useTypewriter from '@/hooks/useTypewriter';

const PLACEHOLDER_PREFIX = __( 'I want to build', 'wp-module-onboarding' );
const EXAMPLES = [
	__( 'a photography portfolio with a booking page and gallery\u2026', 'wp-module-onboarding' ),
	__( 'an online bakery with a menu and custom order form\u2026', 'wp-module-onboarding' ),
	__( 'a travel blog with a newsletter signup\u2026', 'wp-module-onboarding' ),
	__( 'a fitness coaching site with class schedules and pricing\u2026', 'wp-module-onboarding' ),
	__( 'a restaurant site with an online menu and reservations\u2026', 'wp-module-onboarding' ),
];

/**
 * PromptCard component
 *
 * @param {Object}   props              - The component props.
 * @param {string}   props.value        - The value of the input.
 * @param {Function} props.onChange     - The function to call when the input changes.
 * @param {Function} props.onSubmit     - The function to call when the input is submitted.
 * @param {boolean}  props.isSubmitting - Whether the input is submitting.
 * @return {JSX.Element} The PromptCard component.
 */
const PromptCard = ( { value, onChange, onSubmit, isSubmitting } ) => {
	const textareaRef = useRef( null );
	const placeholder = useTypewriter( EXAMPLES, { enabled: ! value, prefix: PLACEHOLDER_PREFIX } );
	const [ canScrollDown, setCanScrollDown ] = useState( false );

	useEffect( () => {
		textareaRef.current?.focus();
	}, [] );

	const checkScroll = useCallback( ( el ) => {
		if ( ! el ) {
			return;
		}
		setCanScrollDown( el.scrollHeight - el.scrollTop - el.clientHeight > 4 );
	}, [] );

	const handleInput = useCallback(
		( e ) => {
			onChange( e.target.value );
			const el = e.target;
			el.style.height = 'auto';
			el.style.height = Math.min( el.scrollHeight, 240 ) + 'px';
			checkScroll( el );
		},
		[ onChange, checkScroll ]
	);

	const handleKeyDown = useCallback(
		( e ) => {
			if ( ( e.metaKey || e.ctrlKey ) && e.key === 'Enter' && value.trim() ) {
				e.preventDefault();
				onSubmit();
			}
		},
		[ value, onSubmit ]
	);

	const hasValue = value.trim().length > 0;

	return (
		<div
			className="nfd-prompt-card nfd-bg-white nfd-rounded-2xl nfd-w-full nfd-overflow-hidden nfd-border nfd-border-solid nfd-shadow-[0_0_0_6px_rgba(23,108,223,0.08)] nfd-border-[rgba(23,108,223,0.35)]"
		>
			<div className="nfd-relative">
				<textarea
					ref={ textareaRef }
					value={ value }
					onChange={ handleInput }
					onKeyDown={ handleKeyDown }
					onScroll={ ( e ) => checkScroll( e.target ) }
					placeholder={ placeholder }
					disabled={ isSubmitting }
					className="nfd-w-full nfd-min-h-[120px] nfd-max-h-[240px] nfd-pt-5 nfd-px-5 nfd-pb-3 nfd-border-0 nfd-outline-none nfd-resize-none nfd-text-base nfd-leading-7 nfd-font-normal nfd-text-[rgb(31,31,31)] nfd-bg-transparent nfd-box-border nfd-antialiased nfd-[overflow-wrap:anywhere]"
				/>
				{ canScrollDown && <div className="nfd-absolute nfd-bottom-0 nfd-left-0 nfd-right-0 nfd-h-10 nfd-bg-gradient-to-b nfd-from-transparent nfd-to-white nfd-pointer-events-none nfd-z-[1]" /> }
			</div>
			<div className="nfd-flex nfd-justify-end nfd-items-center nfd-px-3 nfd-pt-2 nfd-pb-3">
				<motion.div
					className={ `nfd-relative nfd-rounded-full nfd-transition-transform nfd-duration-300 ${
						hasValue ? 'nfd-scale-100 nfd-cursor-pointer' : 'nfd-scale-[0.95]'
					}` }
					whileHover={ hasValue ? { scale: 1.03 } : {} }
					whileTap={ hasValue ? { scale: 0.97 } : {} }
				>
					<button
						onClick={ onSubmit }
						disabled={ ! hasValue || isSubmitting }
						className={ `nfd-font-medium nfd-relative nfd-z-[1] nfd-text-[15px] nfd-w-full nfd-flex nfd-items-center nfd-gap-2 nfd-pl-3.5 nfd-pr-5 nfd-py-2.5 nfd-rounded-full nfd-border-0 nfd-text-white nfd-transition-colors ${
							hasValue
								? 'nfd-bg-primary nfd-cursor-pointer'
								: 'nfd-bg-blue-200 nfd-cursor-not-allowed'
						}` }
						aria-label={ __( 'Build now', 'wp-module-onboarding' ) }
					>
						<Sparkles size={ 16 } />
						<span>{ __( 'Build now', 'wp-module-onboarding' ) }</span>
					</button>
				</motion.div>
			</div>
		</div>
	);
};

export default PromptCard;
