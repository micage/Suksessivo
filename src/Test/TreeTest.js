"use strict";

import { Tree } from "../Structures/Tree";
import Console from "../UI/Console";
import TreeView from "../UI/TreeView";
import pug from "./TreeTest.pug";

//==============================================================================

let json = {
    arr: [1, 2, 3],
    name: "Heinz",
    age: 42,
    job: { city: "Berlin", type: "IT" },
    i1: {
        i11: {
            i111: { x: 0, y: 0, w: 400 },
            i112: undefined
        },
        i12: "i12"
    },
    i2: "i2",
    i3: "i3"
};

let NodePrinter = node => {
    let tabs = Array.from({length: node.depth}, () => "+--").join("");
    if (node.id === "i_11") return false; // stops traversal if condition fits
    console.log(tabs + node.id);
};

console.log("\n");

//==============================================================================

let tree = new Tree("root");
let item0 = new Tree("i1");
let item1 = new Tree("i2");
let item2 = new Tree("i3");

tree.addChild(item0);
tree.addChild(item1);
tree.addChild(item2);

item0.addChild(new Tree("i11", { parent: 0, y: 1 }));
item0.addChild(new Tree("i12", { parent: 0, y: 2 }));
item0.addChild(new Tree("i13"));

item1.addChild(new Tree("i21"));
item1.addChild(new Tree("i22"));

item2.addChild(new Tree("i31"));
item2.addChild(new Tree("i32", "Sophie"));

item2.addChild(new Tree("i23"));

tree.addChild(new Tree("i4"));

$('body').append(pug);
$('#tree_test_b1').click((ev) => {
    Console.log("VDA.11113..444 " + JSON.stringify(ev.target.id));
});

tree.traverse(NodePrinter, true);

// UI Tree
let uiTree = TreeView($('#tree_component'), tree, (item: HTMLUListElement) => {
    let node = item.data("node");
    $("#edit2").val(node.id);
    Console.log( node.id + ": " + JSON.stringify(node.data) );
});

//==============================================================================
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
        // revoke the side effect
        $('#tree_test').remove();
    });
}

//==============================================================================

export default {tree, uiTree, json};

//======================================================================

// Object.assign(window.MICAGE = window.MICAGE || {}, {
//     myTree: tree,
// });
