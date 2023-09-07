import { __ } from "@wordpress/i18n";
// eslint-disable-next-line import/no-extraneous-dependencies
import { filter } from "lodash";

import { CHAPTER_DESIGN } from "../../constants";
import { stepDesignColors } from "../steps/DesignColors/step";
import { stepDesignThemeStylesMenu } from "../steps/DesignThemeStyles/Menu/step.js";
import { stepDesignThemeStylesPreview } from "../steps/DesignThemeStyles/Preview/step";
import { stepDesignTypography } from "../steps/DesignTypography/step";
import { Chapter } from "../data/models/Chapter";
import { layoutContent } from "./layoutContent";
import { Step } from "../data/models/Step";
import ChapterInterstitialLoader from "../components/Loaders/Chapter/Interstitial";
import { DEFAULT_FLOW } from "../data/flows/constants";

const interstitialStep = new Step(
	{
		path: `/${DEFAULT_FLOW}/step/interstitial/${CHAPTER_DESIGN}`,
		Component: ChapterInterstitialLoader
	}
)

const steps = [
	stepDesignThemeStylesMenu,
	stepDesignThemeStylesPreview,
]

const conditionalSteps = [
	stepDesignColors,
	stepDesignTypography
]

const initialSteps = filter( [ ...steps, ...conditionalSteps, ...layoutContent.steps ], ( step ) => {
	return (
		step.path.includes( '/step/design/' ) &&
		! step.path.includes( '/theme-styles/preview' )
	);
} );



export const design = new Chapter(
	{
		id: CHAPTER_DESIGN,
		name: __( 'Design', 'wp-module-onboarding' ),
		steps,
		conditionalSteps,
		initialSteps,
		interstitialSteps: [ interstitialStep ],
	}
)