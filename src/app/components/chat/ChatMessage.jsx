/**
 * Internal dependencies
 */
import ThinkingOrb from '@/components/chat/ThinkingOrb.jsx';

/**
 * ChatMessage component
 *
 * @param {Object}      props          - The component props.
 * @param {Object}      props.message  - The message object.
 * @param {JSX.Element} props.children - The children of the message.
 * @return {JSX.Element} The ChatMessage component.
 */
const ChatMessage = ( { message, children } ) => {
	const isUser = message.role === 'user';

	if ( message.isTyping && ! message.content ) {
		return (
			<div className="nfd-flex nfd-items-center nfd-gap-6 nfd-self-start nfd-py-2 nfd-pl-3 nfd-pr-1">
				<ThinkingOrb />
			</div>
		);
	}

	return (
		<div
			className={ `nfd-chat-message nfd-text-[15px] nfd-leading-6 nfd-whitespace-pre-wrap nfd-break-words nfd-max-w-[85%] nfd-py-3 nfd-px-4 nfd-rounded-2xl nfd-antialiased nfd-box-border ${
				isUser
					? 'nfd-bg-[rgba(23,108,223,0.1)] nfd-text-[rgb(31,31,31)] nfd-self-end'
					: 'nfd-bg-white nfd-text-[rgb(31,31,31)] nfd-border nfd-border-solid nfd-border-[rgba(0,0,0,0.08)] nfd-self-start'
			}` }
		>
			<div>
				{ message.content.split( '\n' ).map( ( line, i ) => (
					<span key={ i }>
						{ i > 0 && <br /> }
						{ line }
					</span>
				) ) }
			</div>
			{ children }
		</div>
	);
};

export default ChatMessage;
