import { useState } from 'react';
import { Button, Drawer, TextField } from '@newfold/ui-component-library';
import { ShareIcon } from '@heroicons/react/24/solid';

const SocialAccounts = () => {
	const [ isOpen, setIsOpen ] = useState( false );
	return (
		<>
			<Button
				variant="secondary"
				onClick={ () => setIsOpen( true ) }
				className="nfd-w-fit nfd-mt-4"
			>
				{ __( 'Connect Social Accounts' ) }
				<ShareIcon className="nfd-ml-2 nfd-w-4" />
			</Button>

			<Drawer
				variant="offset"
				position="right"
				isOpen={ isOpen }
				onClose={ () => setIsOpen( false ) }
			>
				<Drawer.Panel>
					<Drawer.Header
						title={ __( 'Connect Social Accounts' ) }
					/>

					<div className="nfd-flex nfd-flex-col nfd-gap-4 nfd-min-w-80">
						<TextField
							label={ __( 'Facebook' ) }
							id="nfd-onboarding-facebook"
							placeholder="https://www.facebook.com/handle@123"
							onChange={ (e) => {console.log(e)} }
						/>
						<TextField
							label={ __( 'Twitter/X' ) }
							id="nfd-onboarding-twitter"
							placeholder="https://www.x.com/handle@123"
							onChange={ (e) => {console.log(e)} }
						/>
						<TextField
							label={ __( 'Instagram' ) }
							id="nfd-onboarding-instagram"
							placeholder="https://www.instagram.com/handle@123"
							onChange={ (e) => {console.log(e)} }
						/>
						<TextField
							label={ __( 'LinkedIn' ) }
							id="nfd-onboarding-linkedin"
							placeholder="https://www.linkedin.com/handle@123"
							onChange={ (e) => {console.log(e)} }
						/>
						<TextField
							label={ __( 'Pinterest' ) }
							id="nfd-onboarding-pinterest"
							placeholder="https://www.pinterest.com/handle@123"
							onChange={ (e) => {console.log(e)} }
						/>
						<TextField
							label={ __( 'YouTube' ) }
							id="nfd-onboarding-youtube"
							placeholder="https://www.youtube.com/handle@123"
							onChange={ (e) => {console.log(e)} }
						/>
						<TextField
							label={ __( 'TikTok' ) }
							id="nfd-onboarding-tiktok"
							placeholder="https://www.tiktok.com/handle@123"
							onChange={ (e) => {console.log(e)} }
						/>
					</div>
				</Drawer.Panel>
			</Drawer>
		</>
	);
}

export default SocialAccounts;
