// LabeledValueSlider.js

import { Div, Span } from "./Elements";
import ScrollBar from "./ScrollBar";

let defaults = {
    min: 0.0,
    max: 1.0,
    val: 0.0,
    labelText: 'no labelText?'
};

const _Create = (args) => {

    let range = args.max - args.min;
    //let ratio = (args.val - args.min) / range;
    let ratio = (args.max - args.val)/range;
    let units = args.units || '';

    let label = Span({
        class: 'label',
        innerText: args.labelText || defaults.labelText,
        style: {
        }
    });

    let sb = ScrollBar({
        class: 'slider',
        horizontal: false,
        style: {
        },
        ratio: ratio,
        onScroll: function(inner_args) {
            let val = args.max - range * inner_args.ratio;
            value.innerText = val.toFixed(2) + ' ' + units;
        }
    });

    let value = Span({
        class: 'value',
        style: {
        }
    });

    let self =  Div({
        class: args.class,
        style: {
        },
        children: [label, sb, value ]
    });

    return self;
};

export default _Create;
