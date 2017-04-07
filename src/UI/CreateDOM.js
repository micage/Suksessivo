import ObjectTree from "../Structures/ObjectTree";

const nonNode = [
    'type', 'class', 'id'
];

let element = {
    type: Function || String,
    class: String,
    id: String,
    props: { ratio: 0.5 },
    child_1: {},
    child_n: {}
};

let skipDepth = 0;

const createElement = (parent, node) => {
    let content = node.data; // data contains the children of the current node
    let type = content.type || 'div';

    let filteredKeys = Object.keys(content).filter(key => { return ! nonNode.find( name => name === key ) }); // it's an array!!
    let children = {};
    filteredKeys.forEach((key)=>{ children[key] = content[key]; }); // so make it an object
    node.hasChildren = !!filteredKeys.length; // overwrite, only has children if the filter leaves any

    let props = content.props || {};
    let elem;

    if (typeof type === "function") {
        // factory function
        elem = (type)({
            children, props
        });
        skipDepth = node.depth;
    }
    else if (typeof type === "object") {
        debugger;
        elem = null;
    }
    else {
        elem = document.createElement(type);
        Object.assign(elem, props);
    }

    if (content.id) elem.id = content.id;
    if (content.class) elem.classList.add(content.class);
    if (parent) parent.appendChild(elem);

    return elem;
};

const createDom = (json) => {
    let objTree = new ObjectTree(json);
    let parent = null;
    let stack = [];
    let result = null;

    const DomCreator = (node) => {

        // keys that are contained in nonNode are reserved
        let isReserved = !!nonNode.find( key => key === node.id ); // do not make an element out of it
        if (isReserved) {
            //console.log('skipped: ' + node.parent.class + '.' + node.id);
            return;
        }

        if (node.id === 'props') {
            skipDepth = node.depth;
        }

        let elem;
        if (skipDepth && node.depth > skipDepth) {
            console.log('skipped: ' + node.id);
        }
        else {
            skipDepth = 0; // reset skipping
            elem = createElement(parent, node);
        }

        if (!result) result = elem;

        if (node.hasChildren) {
            if (! node.isLastChild) {
                stack.push(parent); // store parent
            }
            parent = elem; // set new parent
        }
        else if (node.isLastChild) {
            let last = stack.pop(); // restore parent
            if (last)
                parent = last;
        }
    };

    objTree.traverse(DomCreator, true);

    console.log("createDom returned: " + result.constructor.name);

    return result;
};

export default createDom;
