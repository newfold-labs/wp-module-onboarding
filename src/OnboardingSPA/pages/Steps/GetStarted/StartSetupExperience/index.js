import CommonLayout from '../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import CardHeader from '../../../../components/CardHeader';
import NavCardButton from '../../../../components/Button/NavCardButton';
import GenericHtml from '../../../../components/GenericHtml';
import content from './content.json';
import { RadioControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { VIEW_NAV_GET_STARTED } from '../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../store';
import { useDispatch } from '@wordpress/data';
import { getFlow, setFlow } from '../../../../utils/api/flow';
import { __ } from '@wordpress/i18n';

/**
 * Start Setup: WordPress Experience Comfort Level.
 *
 * @return
 */

const StartSetupExperience = () => {
	const [isLoaded, setisLoaded] = useState(false);
	const [wpComfortLevel, setWpComfortLevel] = useState();

	const { setDrawerActiveView, setIsDrawerOpened } = useDispatch(
		nfdOnboardingStore
	);

	useEffect(() => {
		setIsDrawerOpened(true);
		setDrawerActiveView(VIEW_NAV_GET_STARTED);
	}, []);

	function createSaveData() {
		return {
			data: {
				wpComfortLevel,
			},
		};
	}

	useEffect(() => {
		async function getFlowData() {
			const data = await getFlow();
			setWpComfortLevel(data?.body?.data.wpComfortLevel || '0');
			setisLoaded(true);
		}
		if (!isLoaded) {
			getFlowData();
		}
	}, [isLoaded]);

	useEffect(() => {
		const saveData = async () => {
			const result = await setFlow(createSaveData());
		};
		if (isLoaded) saveData();
	}, [wpComfortLevel]);

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className="nfd-onboarding-experience-step">
					<div className="nfd-card-heading center">
						<CardHeader
							heading={__(content.cardHeading)}
							subHeading={__(content.subHeading)}
							question={__(content.question)}
						/>
					</div>
					<RadioControl
						className="nfd-onboarding-experience-step-tabs components-radio-control__input"
						selected={wpComfortLevel}
						options={					
							content.options.map(( option ) => {
								return {
									label: __(option.content), 
									value: __(option.value),
								}
							})
						}
						onChange={(value) => setWpComfortLevel(value)}
					/>
					<NavCardButton
						text={__(content.buttonText)}
						disabled={wpComfortLevel == '0'}
					/>
					<GenericHtml content={__(content.needHelpText)} />
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StartSetupExperience;
