// Wordpress
import { useEffect, useState } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';

// Third part
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { kebabCase } from 'lodash';

// Components
import Header from '../../Header';
import Content from '../../Content';
import Drawer from '../../Drawer';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
import NewfoldInterfaceSkeleton from '../index';
import { ThemeProvider } from '../../ThemeContextProvider';
import { stepTheFork } from '../../../steps/TheFork/step';
import { stepSiteGenMigration } from '../../../steps/SiteGen/Migration/step';

// classes
import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';
import themeToggleHOC from '../themeToggleHOC';
import { init as initializePlugins } from '../../../utils/api/plugins';
import { init as initializeThemes } from '../../../utils/api/themes';
import { trigger as cronTrigger } from '../../../utils/api/cronTrigger';

// Misc.
import { setFlow } from '../../../utils/api/flow';
import { design as designChapter } from '../../../chapters/design';
import {
	getSettings,
	setSettings,
	initialize as initializeSettings,
} from '../../../utils/api/settings';
import { isEmpty, updateWPSettings } from '../../../utils/api/ecommerce';
import { store as nfdOnboardingStore } from '../../../store';
import { getQueryParam } from '../../../utils';
import { API_REQUEST } from '../../../../constants';
import {
	getChapterFromId,
	getChaptersFromTopPriorityAndExperienceLevel,
	stateToStore,
} from '../../../chapters/utils';
import { resolveGetDataForFlow, getInitialChapters } from '../../../data/flows';
import {
	OnboardingEvent,
	trackOnboardingEvent,
	sendOnboardingEvent,
} from '../../../utils/analytics/hiive';
import { injectInAllSteps } from '../../../data/flows/utils';
import {
	ACTION_ONBOARDING_CHAPTER_COMPLETE,
	ACTION_ONBOARDING_CHAPTER_STARTED,
	ACTION_ONBOARDING_STARTED,
	ACTION_FEATURE_ADDED,
	ACTION_LOGO_ADDED,
	ACTION_SITE_TITLE_SET,
	ACTION_SOCIAL_ADDED,
	ACTION_STARTER_PAGES_SELECTED,
	ACTION_TAGLINE_SET,
	ACTION_MIGRATION_INITIATED,
	ACTION_PAGEVIEW,
	CATEGORY,
	ACTION_MFE_MIGRATION_INITIATED,
} from '../../../utils/analytics/hiive/constants';

import { socialMediaStoreToState } from '../../SocialMediaForm/utils';

const SiteBuild = () => {
	const location = useLocation();
	const isLargeViewport = useViewportMatch('medium');
	const pathname = kebabCase(location.pathname);

	const {
		isDrawerOpen,
		newfoldBrand,
		onboardingFlow,
		currentData,
		currentStep,
		lastChapter,
		socialData,
		firstStep,
		allSteps,
		experienceLevel,
		topPriority,
		brandConfig,
		initialize,
		pluginInstallHash,
		instaWpMigrationUrl,
	} = useSelect(
		(select) => {
			return {
				isDrawerOpen: select(nfdOnboardingStore).isDrawerOpened(),
				newfoldBrand: select(nfdOnboardingStore).getNewfoldBrand(),
				onboardingFlow: select(nfdOnboardingStore).getOnboardingFlow(),
				currentData:
					select(nfdOnboardingStore).getCurrentOnboardingData(),
				socialData:
					select(nfdOnboardingStore).getOnboardingSocialData(),
				firstStep: select(nfdOnboardingStore).getFirstStep(),
				allSteps: select(nfdOnboardingStore).getAllSteps(),
				topPriority: select(nfdOnboardingStore).getTopPriority(),
				experienceLevel:
					select(nfdOnboardingStore).getExperienceLevel(),
				currentStep: select(nfdOnboardingStore).getCurrentStep(),
				lastChapter: select(nfdOnboardingStore).getCurrentChapter(),
				brandConfig: select(nfdOnboardingStore).getNewfoldBrandConfig(),
				initialize: select(nfdOnboardingStore).getInitialize(),
				pluginInstallHash:
					select(nfdOnboardingStore).getPluginInstallHash(),
				instaWpMigrationUrl:
					select(nfdOnboardingStore).getinstaWpMigrationUrl(),
			};
		},
		[location.pathname]
	);

	const [isRequestPlaced, setIsRequestPlaced] = useState(false);
	const [didVisitBasicInfo, setDidVisitBasicInfo] = useState(false);
	const [didVisitEcommerce, setDidVisitEcommerce] = useState(false);
	const [isMfeMigrationInitiated, setIsMfeMigrationInitiated] =
		useState(false);
	const {
		setActiveChapter,
		flushQueue,
		enqueueRequest,
		setOnboardingSocialData,
		updateAllSteps,
		updateRoutes,
		updateTopSteps,
		updateDesignRoutes,
		setCurrentOnboardingData,
	} = useDispatch(nfdOnboardingStore);

	async function syncSocialSettings() {
		const initialData = await getSettings();
		const result = await setSettings(socialData);
		setDidVisitBasicInfo(false);
		if (result?.error !== null) {
			return initialData?.body;
		}
		return result?.body;
	}

	async function syncStoreDetails() {
		const { address } = currentData.storeDetails;
		let payload = {};
		if (address !== undefined) {
			delete address.country;
			delete address.state;
			payload = address;
		}
		// if ( tax !== undefined ) {
		// 	delete tax.option;
		// 	delete tax.isStoreDetailsFilled;
		// 	payload = { ...payload, ...tax };
		// }
		if (!isEmpty(payload)) {
			await updateWPSettings(payload);
		}
		delete currentData.storeDetails.address;
		delete currentData.storeDetails.tax;
		setDidVisitEcommerce(false);
	}

	async function syncStoreToDB() {
		// The First Welcome Step doesn't have any Store changes
		const isFirstStep = location?.pathname === firstStep?.path;
		if (currentData && !isFirstStep) {
			if (!isRequestPlaced) {
				setIsRequestPlaced(true);

				if (didVisitEcommerce) {
					await syncStoreDetails();
				}

				// If Social Data is changed then sync it
				if (didVisitBasicInfo) {
					const socialDataResp = await syncSocialSettings();

					// If Social Data is changed then Sync that also to the store
					if (socialDataResp) {
						setOnboardingSocialData(socialDataResp);
					}
				}
				flushQueue();
				enqueueRequest(API_REQUEST.SET_FLOW, () =>
					setFlow(currentData)
				);
				setIsRequestPlaced(false);
			}
		}

		// Check if the Basic Info page was visited
		if (location?.pathname.includes('basic-info')) {
			setDidVisitBasicInfo(true);
		}
		if (location?.pathname.includes('ecommerce')) {
			setDidVisitEcommerce(true);
		}
	}

	function handleConditionalDesignStepsRoutes() {
		if (
			location?.pathname.includes('colors') ||
			location?.pathname.includes('typography')
		) {
			const updates = injectInAllSteps(
				allSteps,
				designChapter.conditionalSteps
			);
			updateAllSteps(updates.allSteps);
			if (!currentData.data.customDesign) {
				currentData.data.customDesign = true;
				setCurrentOnboardingData(currentData);
			}
		}
	}

	const handlePreviousStepTracking = () => {
		const previousStep = window.nfdOnboarding?.previousStep;
		if (typeof previousStep !== 'object') {
			window.nfdOnboarding.previousStep = {
				path: location.pathname,
				url: window.location.href,
			};
			HiiveAnalytics.dispatchEvents(CATEGORY);
			return;
		}

		const previousStepPath = previousStep.path;
		const previousStepURL = previousStep.url;

		if (previousStepPath.includes('basic-info')) {
			const siteTitle = currentData.data.blogName;
			const siteDescription = currentData.data.blogDescription;
			const siteLogo = currentData.data.siteLogo.url;
			if (siteTitle) {
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_SITE_TITLE_SET,
						siteTitle,
						{},
						previousStepURL
					)
				);
			}

			if (siteDescription) {
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_TAGLINE_SET,
						siteDescription,
						{},
						previousStepURL
					)
				);
			}

			if (siteLogo) {
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_LOGO_ADDED,
						undefined,
						{},
						previousStepURL
					)
				);
			}

			const platforms = Object.keys(socialMediaStoreToState(socialData));
			if (platforms.length) {
				platforms.forEach((platform) => {
					trackOnboardingEvent(
						new OnboardingEvent(
							ACTION_SOCIAL_ADDED,
							platform,
							{},
							previousStepURL
						)
					);
				});
			}
		}

		if (previousStepPath.includes('site-pages')) {
			const sitePages = currentData.data.sitePages?.other;
			if (!sitePages || false === sitePages) {
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_STARTER_PAGES_SELECTED,
						[],
						{
							count: 0,
						},
						previousStepURL
					)
				);
			} else {
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_STARTER_PAGES_SELECTED,
						sitePages.map((sitePage) => sitePage.key),
						{
							count: sitePages.length,
						},
						previousStepURL
					)
				);
			}
		}

		if (previousStepPath.includes('site-features')) {
			const siteFeatures = currentData.data.siteFeatures;
			for (const siteFeature in siteFeatures) {
				if (false !== siteFeatures[siteFeature]) {
					trackOnboardingEvent(
						new OnboardingEvent(
							ACTION_FEATURE_ADDED,
							siteFeature,
							{},
							previousStepURL
						)
					);
				}
			}
		}

		window.nfdOnboarding.previousStep = {
			path: location.pathname,
			url: window.location.href,
		};

		HiiveAnalytics.dispatchEvents(CATEGORY);
	};

	const trackChapters = () => {
		console.count('tracking');
		trackInstaWpMigrationEvent();
		if (location.pathname === firstStep.path) {
			trackOnboardingEvent(
				new OnboardingEvent(ACTION_ONBOARDING_STARTED)
			);
		}

		const currentChapter = currentStep?.chapter;

		if (lastChapter !== currentChapter) {
			if (lastChapter) {
				if (currentData.data.chapters[lastChapter]) {
					currentData.data.chapters[lastChapter].completed = true;
				}
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_ONBOARDING_CHAPTER_COMPLETE,
						lastChapter
					)
				);
			}

			if (currentChapter) {
				if (currentData.data.chapters[currentChapter]) {
					currentData.data.chapters[currentChapter].completed = false;
				}
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_ONBOARDING_CHAPTER_STARTED,
						currentChapter
					)
				);
			}

			setActiveChapter(currentChapter);
		}

		if (currentChapter && currentData.data.chapters[currentChapter]) {
			currentData.data.chapters[currentChapter].lastStep =
				currentStep?.path ?? '';
		}
	};

	const trackInstaWpMigrationEvent = () => {
		if (currentStep?.path === stepSiteGenMigration?.path) {
			if (instaWpMigrationUrl) {
				sendOnboardingEvent(
					new OnboardingEvent(
						isMfeMigrationInitiated
							? ACTION_MFE_MIGRATION_INITIATED
							: ACTION_MIGRATION_INITIATED,
						instaWpMigrationUrl
					)
				);
			}
		}
	};

	useEffect(() => {
		trackChapters();
	}, [currentStep]);

	// Track Migration Initated Event in the Migration Step.
	useEffect(() => {
		getSettings().then((res) =>
			setIsMfeMigrationInitiated(res.nfd_migrate_site)
		);
		trackInstaWpMigrationEvent();
	}, [instaWpMigrationUrl]);

	const prioritizeFlow = () => {
		const currentFlow = window.nfdOnboarding.currentFlow;
		const initialChapters = getInitialChapters(currentFlow);
		const chapterQueryArg = getQueryParam('chapter');

		let chapters;
		if (chapterQueryArg) {
			chapters = getChapterFromId(chapterQueryArg);
		} else {
			chapters = getChaptersFromTopPriorityAndExperienceLevel(
				initialChapters,
				topPriority,
				experienceLevel
			);
		}

		const getData = resolveGetDataForFlow(currentFlow);
		const data = getData(chapters, chapterQueryArg);

		currentData.data.chapters = stateToStore(
			initialChapters,
			currentData.data.chapters,
			currentStep
		);

		setCurrentOnboardingData(currentData);
		updateAllSteps(data.steps);
		updateTopSteps(data.topSteps);
		updateRoutes(data.routes);
		updateDesignRoutes(data.designRoutes);
	};

	useEffect(() => {
		if (initialize) {
			initializePlugins(pluginInstallHash);
			initializeThemes();
			initializeSettings();
			setInterval(cronTrigger, 45000);
		}
	}, [initialize]);

	useEffect(() => {
		if (false !== brandConfig?.prioritization) {
			return prioritizeFlow();
		}
	}, [experienceLevel, topPriority]);

	useEffect(() => {
		document.body.classList.add(`nfd-brand-${newfoldBrand}`);
	}, [newfoldBrand]);

	useEffect(() => {
		syncStoreToDB();
		handlePreviousStepTracking();
		handleConditionalDesignStepsRoutes();
	}, [location.pathname, onboardingFlow]);

	useEffect(() => {
		sendOnboardingEvent(new OnboardingEvent(ACTION_PAGEVIEW));
	}, [location.pathname]);

	const isForkStep =
		currentStep === stepTheFork ||
		currentStep === stepSiteGenMigration ||
		window.nfdOnboarding.currentFlow === 'sitegen';
	// wrapping the NewfoldInterfaceSkeleton with the HOC to make 'theme' available
	const ThemedNewfoldInterfaceSkeleton = themeToggleHOC(
		NewfoldInterfaceSkeleton,
		'nfd-onboarding-sitegen-dark',
		'nfd-onboarding-sitegen-light',
		isForkStep
	);

	const commonSkeletonProps = {
		className: classNames(
			'nfd-onboarding-skeleton',
			`brand-${newfoldBrand}`,
			`path-${pathname}`,
			{ 'is-drawer-open': isDrawerOpen },
			{ 'is-large-viewport': isLargeViewport },
			{ 'is-small-viewport': !isLargeViewport },
			{ 'nfd-onboarding-skeleton--sitegen': isForkStep }
		),
		header: <Header />,
		drawer: <Drawer />,
		content: <Content />,
		sidebar: <Sidebar />,
		footer: isForkStep ? <Footer /> : null,
	};

	const renderSkeleton = (Component) =>
		isForkStep ? (
			<ThemeProvider>
				<Component {...commonSkeletonProps} />
			</ThemeProvider>
		) : (
			<Component {...commonSkeletonProps} />
		);

	return isForkStep
		? renderSkeleton(ThemedNewfoldInterfaceSkeleton)
		: renderSkeleton(NewfoldInterfaceSkeleton);
};

export default SiteBuild;
