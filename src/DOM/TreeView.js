import TreeView from "../UI/TreeView4";
import ObjectTree from "../Structures/ObjectTree";
import { Div } from "../DOM/Elements";


const _Create = (args) => {
    let payload = Object.assign({}, args);

    // a TreeView has no children, so ignore them if present
    if (payload.children) console.log('TreeView: children ignored');
    payload.children = [];

    if (!payload.json) {
        payload.json = { "empty": "tree" };
    }

    // need to create the parent first
    let self = Div(payload);
    self.classList.add('mmm-treeview');

    // the TreeView appends itself to self
    let treeView = new TreeView(
        self, // parent
        new ObjectTree(payload.json),
        { // options
            onSelect: payload.onSelect
        }
    );

    self.Type = "TreeView";

    // self.addEventListener('ScrollStart', function(evt) {
    // });
    //
    // self.addEventListener('ScrollStop', function(evt) {
    // });

    return self;
};

export default _Create;

