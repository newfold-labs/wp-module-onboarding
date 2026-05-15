/**
 * External dependencies
 */
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

/**
 * WordPress dependencies
 */
import { useRef, useCallback, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */

/**
 * ChatInput component
 *
 * @param {Object}   props           - The component props.
 * @param {string}   props.value     - The value of the input.
 * @param {Function} props.onChange  - The function to call when the input changes.
 * @param {Function} props.onSubmit  - The function to call when the input is submitted.
 * @param {boolean}  props.isWaiting - Whether the input is waiting for a response.
 * @return {JSX.Element} The ChatInput component.
 */
const ChatInput = ( { value, onChange, onSubmit, isWaiting } ) => {
	const textareaRef = useRef( null );
	const hasValue = value.trim().length > 0;

	useEffect( () => {
		if ( ! isWaiting ) {
			textareaRef.current?.focus();
		}
	}, [ isWaiting ] );

	const handleInput = useCallback(
		( e ) => {
			onChange( e.target.value );
			const el = e.target;
			el.style.height = 'auto';
			el.style.height = Math.min( el.scrollHeight, 120 ) + 'px';
		},
		[ onChange ]
	);

	const handleKeyDown = useCallback(
		( e ) => {
			if ( e.key === 'Enter' && ! e.shiftKey && hasValue && ! isWaiting ) {
				e.preventDefault();
				onSubmit();
			}
		},
		[ hasValue, isWaiting, onSubmit ]
	);

	return (
		<div
			className="nfd-prompt-card nfd-rounded-2xl nfd-w-full nfd-overflow-hidden nfd-border nfd-border-solid nfd-transition-all nfd-bg-white nfd-shadow-[0_0_0_6px_rgba(23,108,223,0.12)] nfd-border-[rgba(23,108,223,0.35)]"
		>
			<div className="nfd-flex nfd-items-end nfd-gap-2 nfd-px-3 nfd-py-2">
				<textarea
					ref={ textareaRef }
					value={ value }
					onChange={ handleInput }
					onKeyDown={ handleKeyDown }
					placeholder={ isWaiting
						? __( 'Waiting for response…', 'wp-module-onboarding' )
						: __( 'Type your reply…', 'wp-module-onboarding' )
					}
					disabled={ isWaiting }
					rows={ 2 }
					className={ `nfd-flex-1 nfd-min-h-[64px] nfd-max-h-[120px] nfd-py-3 nfd-px-2 nfd-border-0 nfd-outline-none nfd-resize-none nfd-text-base nfd-leading-7 nfd-font-normal nfd-text-[rgb(31,31,31)] nfd-bg-transparent nfd-box-border nfd-antialiased nfd-[overflow-wrap:anywhere] nfd-overflow-y-auto${ isWaiting ? ' placeholder:nfd-text-[rgba(0,0,0,0.15)]' : '' }` }
				/>
				<motion.div
					className={ `nfd-relative nfd-rounded-full nfd-self-end ${
						hasValue && ! isWaiting ? 'nfd-cursor-pointer' : ''
					}` }
					whileHover={ hasValue && ! isWaiting ? { scale: 1.03 } : {} }
					whileTap={ hasValue && ! isWaiting ? { scale: 0.97 } : {} }
				>
					<button
						onClick={ onSubmit }
						disabled={ ! hasValue || isWaiting }
						className={ `nfd-relative nfd-z-[1] nfd-w-[30px] nfd-h-[30px] nfd-text-[0px] nfd-flex nfd-items-center nfd-justify-center nfd-p-1.5 nfd-rounded-full nfd-border-0 nfd-text-white nfd-transition-transform nfd-duration-200 ${
							hasValue && ! isWaiting
								? 'nfd-bg-primary nfd-cursor-pointer nfd-scale-110'
								: 'nfd-bg-blue-200 nfd-cursor-not-allowed'
						}` }
						aria-label={ __( 'Send message', 'wp-module-onboarding' ) }
					>
						<ArrowUp size={ 18 } />
					</button>
				</motion.div>
			</div>
		</div>
	);
};

export default ChatInput;
