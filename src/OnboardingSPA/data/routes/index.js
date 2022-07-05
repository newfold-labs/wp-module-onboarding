import {
    routes as defaultInitialRoutes,
    steps as defaultInitialSteps,
    initialDesignSteps as defaultInitialDesignSteps,
    initialSetupSteps as defaultInitialSetupSteps,
    initialTopSteps as defaultInitialTopSteps,
} from './default-flow';

function getSelectedRoute() {
    return window.nfdOnboarding.currentFlow ?? 'wp-setup';
}

const routerMap = {
    'wp-setup': {
        'routes': defaultInitialRoutes,
        'steps': defaultInitialSteps,
        'initialTopSteps': defaultInitialTopSteps,
        'initialDesignSteps': defaultInitialDesignSteps,
        'initialSetupSteps': defaultInitialSetupSteps,
    }
}

export const routes = [
    ...routerMap[getSelectedRoute()]['routes']
]

export const steps = [
    ...routerMap[getSelectedRoute()]['steps']
]

export const initialTopSteps = () => {
    return routerMap[getSelectedRoute()]['initialTopSteps']();
};

export const initialDesignSteps = () => {
    return routerMap[getSelectedRoute()]['initialDesignSteps']();
};

export const initialSetupSteps = () => {
    return routerMap[getSelectedRoute()]['initialSetupSteps']();
};
