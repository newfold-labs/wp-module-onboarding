import { PanelBody } from '@wordpress/components';

const Content = () => {
	return (
		<PanelBody
			className="nfd-onboarding-sidebar-learn-more__get-started-welcome--content"
			initialOpen={ true }
		>
			<p className="nfd-onboarding-sidebar-learn-more__get-started-welcome--content__heading">
				WordPress is free website software
			</p>
			<p className="nfd-onboarding-sidebar-learn-more__get-started-welcome--content__description">
				When you set up this new WordPress store, you’re joining
				millions of other store owners who publish their website’s pages
				and features using the community-built, free, open-source
				software.
			</p>
			<p className="nfd-onboarding-sidebar-learn-more__get-started-welcome--content__heading">
				Bluehost is your website partner
			</p>
			<p className="nfd-onboarding-sidebar-learn-more__get-started-welcome--content__description">
				A WordPress store hosted by Bluehost has tons of exclusive, easy
				and powerful solutions and addons to help you get farther,
				faster with your WordPress -- we put our expertise, partnerships
				and solutions to work for you.
			</p>
			<div className="nfd-onboarding-sidebar-learn-more__get-started-welcome--content__links">
				<button className="nfd-onboarding-sidebar-learn-more__get-started-welcome--content__links__experts">
					1-1 Expert Solutions & Coaching
				</button>
				<button className="nfd-onboarding-sidebar-learn-more__get-started-welcome--content__links__full-service">
					Hire Our Full-Service Creative Team{ ' ' }
				</button>
				<a
					href="#"
					className="nfd-onboarding-sidebar-learn-more__get-started-welcome--content__links__support"
				>
					Technical Support
				</a>
			</div>
		</PanelBody>
	);
};

export default Content;
