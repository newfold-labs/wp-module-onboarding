import { Step } from "./Step";

export class PseudoStep extends Step {
    constructor( { path, title, icon, drawerView, sidebars, data } ) {
        super({ path, title, Component: null, icon, drawerView, sidebars, data } )
    }
}