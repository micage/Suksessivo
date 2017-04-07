import styles from "./ScrollBar.less";
import "../UI/Splitter";
import { Div, Span } from "./Elements";

/**
 * Tab is a child of TabView
 * a Tab is not already a HTMLElement but a template to create one
 */

const _Create = (args) => {
    // just loop through and let the TabView do the work
    // this way a Tab can only be created inside a TabView

    let self = {};
    Object.assign(self, args);
    self.class = self.class ? self.class + ' Tab' : 'Tab';

    // let self = Div(defaults);
    self.Type = 'Tab';

    return self;
};

export default _Create;
