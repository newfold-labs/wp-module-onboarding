import { Button, PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../../../../store';
import HeadingWithDescription from '../../../../../../components/Sidebar/components/LearnMore/HeadingWithDescription';
import Illustration from '../../../../../../components/Sidebar/components/LearnMore/Illustration';
import contents from './contents';

const LearnMore = () => {
	const { brandName } = useSelect( ( select ) => {
		return {
			brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
		};
	} );
	const content = contents( brandName );

	return (
		<div className="nfd-onboarding-sidebar-learn-more__get-started-welcome">
			<Illustration
				baseClassName="nfd-onboarding-sidebar-learn-more__get-started-welcome"
				cssIcon="nfd-onboarding-sidebar-learn-more-get-started-welcome-illustration"
			/>
			<PanelBody
				className="nfd-onboarding-sidebar-learn-more__get-started-welcome--content"
				initialOpen={ true }
			>
				{ content.headingWithDescriptions.map(
					( headingWithDescription, idx ) => {
						return (
							<HeadingWithDescription
								key={ idx }
								baseClassName="nfd-onboarding-sidebar-learn-more__get-started-welcome--content"
								headingWithDescription={
									headingWithDescription
								}
							/>
						);
					}
				) }
				<div className="nfd-onboarding-sidebar-learn-more__get-started-welcome--content__links">
					<Button
						variant="primary"
						className="nfd-onboarding-sidebar-learn-more__get-started-welcome--content__links__experts"
					>
						{ content.experts.text }
					</Button>
					<Button className="nfd-onboarding-sidebar-learn-more__get-started-welcome--content__links__full-service">
						{ content.fullService.text }
					</Button>
					<a
						href="#"
						className="nfd-onboarding-sidebar-learn-more__get-started-welcome--content__links__support"
					>
						{ content.support.text }
					</a>
				</div>
			</PanelBody>
		</div>
	);
};

export default LearnMore;
