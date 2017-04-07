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
    let ratio = (args.val - args.min)/range;
    let units = args.units || '';

    let label = Span({
        class: 'label',
        innerText: args.labelText || defaults.labelText,
        style: {
            'flex': 2,
            'padding-left': '4px',
            'border-right': '1px dotted grey'
        }
    });

    let sb = ScrollBar({
        class: 'slider',
        horizontal: args.horizontal,
        style: {
            'flex': '7',
        },
        ratio: ratio,
        onScroll: function(inner_args) {
            let val = args.min + range * inner_args.ratio;
            value.innerText = val.toFixed(2) + ' ' + units;
        }
    });

    let value = Span({
        class: 'value',
        style: {
            'flex': '1',
            'border-left': '1px dotted grey',
            'text-align': 'right',
            'padding-right': '8px'
        }
    });

    let self =  Div({
        class: args.class,
        style: {
            'min-height': '10px',
            'display': 'flex',
            // 'flex-direction': !args.horizontal === false ? 'row' : 'column',
            'border': '1px dotted grey'
        },
        children: [ label, sb, value ]
    });

    return self;
};

export default _Create;
