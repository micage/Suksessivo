import Button from './Button';
import { Div, Span } from "./Elements";

const _Create = (args) => {
    args = typeof args === 'object' ? args : {};

    let buttons = [];

    if (Array.isArray(args.children)) {
        args.children.forEach( (child, i) => {
            // is it a button? check type or className? or what?
            if (child.Type === 'Button') {

            }
            if (child instanceof Button) {

            }
        });
    }

    let self = Div(args);
    self.Type = 'ButtonBar';
    self.classList.add(self.Type);
    return self;
};

export default _Create;
