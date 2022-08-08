import { __ } from '@wordpress/i18n';
import CommonLayout from '../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../components/NewfoldLargeCard';
import { VIEW_NAV_PRIMARY } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import CardHeader from '../../../components/CardHeader';
import Button from '../../../components/Button';
import NeedHelpTag from '../../../components/NeedHelpTag';
import content from './content.json';

const StepPrimarySetup = () => {
	const { setDrawerActiveView, setIsSidebarOpened, setIsDrawerSuppressed } = useDispatch(
		nfdOnboardingStore
	);

	useEffect( () => {
		setIsSidebarOpened( false );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_NAV_PRIMARY );
	}, [] );

	const handleClick = ( e ) => {
		console.log( 'Button Click to be handled here' );
	};

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className="nfd-card-heading center">
					<CardHeader
						heading={ __(
							content.cardHeading,
							'wp-module-onboarding'
						) }
						subHeading={ __(
							content.subHeading,
							'wp-module-onboarding'
						) }
						question={ __(
							content.question,
							'wp-module-onboarding'
						) }
					/>
				</div>
				<div className="nfd-card-button-wrapper">
					<Button
						text={ __(
							content.buttonText,
							'wp-module-onboarding'
						) }
						handleClick={ handleClick }
					/>
				</div>

				<NeedHelpTag />
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepPrimarySetup;
