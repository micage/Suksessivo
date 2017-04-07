"use strict";

import ObjectTree from "../Structures/ObjectTree";
import Console from "../UI/Console";
import TreeView from "../UI/TreeView";
import "./A11yTreeTest.less";
import pug from "pug!./A11yTreeTest.pug";

const __FILE__ = "A11yTreeTest";

//==============================================================================
// print tree to debug console
console.log("\n" + "NODE_ENV = " + NODE_ENV + "\n"); // set by webpack define plugin

// tree visitor with stop condition
const NodePrinter = node => {
    let tabs = Array.from({length: node.depth}, () => "+- ").join("");

    if (node.id === "i112") {
        console.log("Stopped before: " + node.id + ": " + JSON.stringify(node.data));
        return false; // stops traversal if condition fits
    }

    if (node.hasChildren) {
        console.log(tabs + node.id);
    }
    else {
        console.log(tabs + node.id + ": " + JSON.stringify(node.data));
    }
};

let json = {
    arr: [1, 2, 3],
    Employees: [
        {
            name: "Gustave Ganse",
            age: 42,
            job: { city: "Berlin", type: "IT" }
        },
        {
            name: "Babette Sorglos",
            age: 23,
            job: { city: "Berlin", type: "Design" }
        }
    ],
    i1: {
        i11: {
            i111: { x: 0, y: 0, w: 400 },
            i112: "undefined"
        },
        i12: "i12"
    },
    i2: "i2",
    i3: "i3"
};

// console.log("\n");
let objectTree = new ObjectTree(json);
objectTree.traverse(NodePrinter);

//==============================================================================
// HTML from ObjectTreeTest.pug
let locals = {
    testName: __FILE__,
    data: "Test String to test injection of locals into pug file "
};
let htmlString = pug(locals);

$('body').append(htmlString);

// a11yTree from ObjectTree
let uiA11yTree = TreeView($('#treeview1.a11yTree'), objectTree, (node) => {
    Console.log( node.id );
});


//==============================================================================
// Hot-Module-Replacement
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
        // revoke the side effect
        $('#' + __FILE__).remove();
    });
}

//======================================================================

if (typeof window !== 'undefined') {
    Object.assign(window.MICAGE = window.MICAGE || {}, {
        uiA11yTree,
        json
    });
    window.$ = $;
}
