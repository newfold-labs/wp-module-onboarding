import { __ } from "@wordpress/i18n";

import { CHAPTER_LAYOUT_AND_CONTENT } from "../../constants";
import ChapterInterstitialLoader from "../components/Loaders/Chapter/Interstitial";
import { stepDesignHeaderMenu } from "../steps/DesignHeaderMenu/step";
import { stepDesignHomepageMenu } from "../steps/DesignHomepageMenu/step";
import { stepSitePages } from "../steps/SitePages/step";
import { Chapter } from "../data/models/Chapter";
import { Step } from "../data/models/Step";
import { DEFAULT_FLOW } from "../data/flows/constants";

const interstitialStep = new Step(
    {
        path: `/${DEFAULT_FLOW}/step/interstitial/${CHAPTER_LAYOUT_AND_CONTENT}`,
        Component: ChapterInterstitialLoader 
    }
)

const steps = [
	stepDesignHeaderMenu,
	stepDesignHomepageMenu,
	stepSitePages,
]

export const layoutContent = new Chapter(
    {
        id: CHAPTER_LAYOUT_AND_CONTENT,
        name: __( 'Layout & Content', 'wp-module-onboarding' ),
        steps,
        interstitialSteps: [ interstitialStep ],
    }
)