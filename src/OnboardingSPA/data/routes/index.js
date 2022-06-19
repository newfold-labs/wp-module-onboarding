import {
    routes as defaultInitialRoutes,
    steps as defaultInitialSteps,
    initialDesignSteps as defaultInitialDesignSteps,
    initialTopSteps as defaultInitialTopSteps,
} from './default-flow';
import {
    routes as ecomInitialRoutes,
    steps as ecomInitialSteps,
    initialDesignSteps as ecomInitialDesignSteps,
    initialTopSteps as ecomInitialTopSteps,
} from './ecommerce-flow';

var selectedRoute = 'wp-setup';

function getSelectedRoute() {
    selectedRoute = window.nfdOnboarding.currentFlow;
    return selectedRoute;
}

const routerMap = {
    'wp-setup': {
        'routes': defaultInitialRoutes,
        'steps': defaultInitialSteps,
        'initialTopSteps': defaultInitialTopSteps,
        'initialDesignSteps': defaultInitialDesignSteps,
    },
    'ecommerce': {
        'routes': ecomInitialRoutes,
        'steps': ecomInitialSteps,
        'initialTopSteps': ecomInitialTopSteps,
        'initialDesignSteps': ecomInitialDesignSteps,
    },
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
