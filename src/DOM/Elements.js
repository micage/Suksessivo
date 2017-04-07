
// wrapper for document.createElement

const Element = {
    id: String,
    class: String,
    type: String,
    props: Object,
    children: [] // of HTMLElement
};

export
const Create = (args) => {
    let elem = document.createElement(args.Type);
    if(__DEBUG__) console.log("create: " + args.Type + (args.id ? "#" + args.id : "") + (args.class ? "." + args.class : "") );

    if (args.class) {
        let list = args.class.split(' ');
        list.forEach( c => { elem.classList.add(c); });
    }

    for (let key in args) {
        if (key === 'style') {
            for (let style in args.style) {
                elem.style[style] = args.style[style];
            }
        }
        else if (key !== "class" && key !== 'children') {
            elem[key] = args[key];
        }
    }

    if (args.children) {
        args.children.forEach( child => {
            if (child instanceof HTMLElement) {
                elem.appendChild(child);
            }
            else {
                throw new TypeError('AppendChild failed for: ' + JSON.stringify(args));
            }
        });
    }

    return elem;
};

export
const Div = (args) => {
    let _args = args || {};
    _args.Type = 'div';

    return Create(_args);
};

export
const Span = (args) => {
    let _args = args || {};
    _args.Type = 'span';

    return Create(_args);
};

export
const P = (args) => {
    let _args = args || {};
    _args.Type = 'p';

    return Create(_args);
};

export
const A = (args) => {
    let _args = args || {};
    _args.Type = 'a';

    return Create(_args);
};

export
const Button = (args) => {
    let _args = args || {};
    _args.Type = 'button';

    return Create(_args);
};

export
const Img = (args) => {
    let _args = args || {};
    _args.Type = 'img';

    return Create(_args);
};

export
const Pre = (args) => {
    let _args = args || {};
    _args.Type = 'pre';

    return Create(_args);
};
