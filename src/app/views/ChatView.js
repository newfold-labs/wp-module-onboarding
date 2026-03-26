import { motion } from 'motion/react';
import ChatMessage from '@/components/chat/ChatMessage.jsx';
import ChatInput from '@/components/chat/ChatInput.jsx';
import ActionButton from '@/components/chat/ActionButton.jsx';
import TaskProgress from '@/components/progress/TaskProgress.jsx';
import PublishProgress from '@/components/progress/PublishProgress.jsx';

const ChatView = ( {
	messages,
	messagesEndRef,
	chatInput,
	setChatInput,
	onSubmit,
	isWaiting,
	inputEnabled,
	onRetry,
	onRestart,
} ) => {
	const isDisabled = ! inputEnabled || isWaiting;

	return (
		<motion.div
			key="chat"
			initial={ { opacity: 0, y: 30 } }
			animate={ { opacity: 1, y: 0 } }
			transition={ { duration: 0.4, ease: 'easeOut' } }
			className="nfd-flex nfd-flex-1 nfd-flex-col nfd-w-full nfd-max-w-[min(710px,100%)] nfd-mx-auto nfd-px-5 nfd-pb-16 nfd-pt-20 nfd-min-h-0 nfd-box-border"
		>
			<div className="nfd-chat-messages nfd-flex-1 nfd-flex nfd-flex-col nfd-gap-4 nfd-pb-4 nfd-overflow-y-auto nfd-min-h-0 nfd-scroll-smooth">
				{ messages.map( ( msg ) => {
					if ( msg.role === 'discovery' || msg.role === 'generation' ) {
						return (
							<TaskProgress
								key={ msg.id }
								title={ msg.title }
								tasks={ msg.tasks }
							/>
						);
					}

					if ( msg.role === 'publish' ) {
						return (
							<PublishProgress
								key={ msg.id }
								generationData={ msg.generationData }
								discoveryData={ msg.discoveryData }
							/>
						);
					}

					if ( msg.action ) {
						return (
							<ChatMessage key={ msg.id } message={ msg }>
								<div className="nfd-mt-3 nfd-flex nfd-gap-2">
									{ msg.action === 'retry' && (
										<ActionButton onClick={ onRetry }>
											{ __( 'Try again', 'wp-module-onboarding' ) }
										</ActionButton>
									) }
									{ msg.action === 'restart' && (
										<ActionButton onClick={ onRestart }>
											{ __( 'Start over', 'wp-module-onboarding' ) }
										</ActionButton>
									) }
								</div>
							</ChatMessage>
						);
					}

					return <ChatMessage key={ msg.id } message={ msg } />;
				} ) }

				<div ref={ messagesEndRef } />
			</div>

			<div className="nfd-pb-2 nfd-pt-2">
				<ChatInput
					value={ chatInput }
					onChange={ setChatInput }
					onSubmit={ onSubmit }
					isWaiting={ isDisabled }
				/>
			</div>
		</motion.div>
	);
};

export default ChatView;
