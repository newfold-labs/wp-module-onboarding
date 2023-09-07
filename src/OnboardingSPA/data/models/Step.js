export class Step {
    constructor( { path, title, Component, icon, drawerView, sidebars, data } ) {
        this.path = path;
        this.title = title;
        this.Component = Component;
        this.icon = icon;
        this.drawerView = drawerView;
        this.sidebars = sidebars;
        this.data = data;
    }
}