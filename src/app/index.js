/**
 * WordPress dependencies
 */
import { FullscreenMode } from '@wordpress/interface';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { AnimatePresence } from 'motion/react';

/**
 * Internal dependencies
 */
import '@/styles/app.scss';
import bluehostLogo from '../Brands/bluehost/bluehost-logo.svg';
import useChat from '@/hooks/useChat';
import PromptView from '@/views/PromptView';
import ChatView from '@/views/ChatView';
import MigrationView from '@/views/MigrationView';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_PAGEVIEW } from '@/utils/analytics/hiive/constants';

const App = () => {
	useEffect( () => {
		sendOnboardingEvent( new OnboardingEvent( ACTION_PAGEVIEW ) );
	}, [] );

	const {
		mode,
		prompt,
		setPrompt,
		messages,
		messagesEndRef,
		chatInput,
		setChatInput,
		isWaiting,
		inputEnabled,
		showMigration,
		handlePromptSubmit,
		handleChatSubmit,
		handleRetry,
		handleRestart,
		handleMigrate,
		handleMigrationBack,
	} = useChat();

	return (
		<>
			<FullscreenMode isActive={ true } />
			<div
				className={ `nfd-onboarding-bg nfd-flex nfd-flex-col nfd-w-full nfd-box-border nfd-relative ${
					mode === 'chat' ? 'nfd-h-screen nfd-overflow-hidden' : 'nfd-min-h-screen'
				}` }
			>
				<div className="nfd-absolute nfd-top-6 nfd-left-8 nfd-z-10">
					<a href="https://www.bluehost.com" target="_blank" rel="noopener noreferrer">
						<img
							src={ bluehostLogo }
							alt={ __( 'Bluehost logo', 'wp-module-onboarding' ) }
							className="nfd-h-7 nfd-w-auto"
						/>
					</a>
				</div>

				<AnimatePresence mode="wait">
					{ mode === 'prompt' && (
						<PromptView
							prompt={ prompt }
							setPrompt={ setPrompt }
							onSubmit={ handlePromptSubmit }
							onMigrate={ handleMigrate }
							showMigration={ showMigration }
						/>
					) }
					{ mode === 'chat' && (
						<ChatView
							messages={ messages }
							messagesEndRef={ messagesEndRef }
							chatInput={ chatInput }
							setChatInput={ setChatInput }
							onSubmit={ handleChatSubmit }
							isWaiting={ isWaiting }
							inputEnabled={ inputEnabled }
							onRetry={ handleRetry }
							onRestart={ handleRestart }
						/>
					) }
					{ mode === 'migration' && (
						<MigrationView onBack={ handleMigrationBack } />
					) }
				</AnimatePresence>

				<p className="nfd-text-xs nfd-text-balance nfd-font-normal nfd-leading-4 nfd-tracking-wide nfd-text-[rgb(68,71,70)] nfd-text-center [-webkit-font-smoothing:antialiased] nfd-absolute nfd-bottom-6 nfd-left-0 nfd-right-0 nfd-m-0 nfd-px-4 nfd-z-10">
					{ __(
						'AI-generated sites may need refinement. You can customize everything later.',
						'wp-module-onboarding'
					) }
				</p>
			</div>
		</>
	);
};

export default App;
