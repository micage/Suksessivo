/*eslint no-unused-vars: "off"*/
"use strict";

import ObjectTree from "../Structures/ObjectTree";
import Console from "../UI/Console";
import TreeView2 from "../UI/TreeView2";
import "./ExplorerView.less";
import Pug from "pug-loader!./ExplorerView.pug";
import { human, data1, afterfx } from "./TreeViewTestData";
import "../UI/Splitter";

const __FILE = "ExplorerView";

//==============================================================================
// print tree to debug console
// tree visitor with stop condition, return false and traversal stops
const NodePrinter = node => {
    let tabs = Array.from({length: node.depth}, () => "+- ").join("");

    if (node.hasChildren) {
        Console.log(tabs + node.id);
    }
    else {
        Console.log(tabs + node.id + ": " + JSON.stringify(node.data));
    }
};

// create a JSON traversor
let obj = Object.assign({}, afterfx, human);
let objectTree = new ObjectTree(obj);
objectTree.traverse(NodePrinter);

//==============================================================================
// HTML

$('body').append( Pug({
    viewId: __FILE,
    data: "Test String (demonstrate locals injection into a pug-file)"
}));

$('.mmm-explorer .body').split({
    interface: {},
    thumbSize: 4,
    oneSize: 0.3, // left side is 20%
    blub: null
});


// UI Tree from ObjectTree with options
let treeView = new TreeView2(
    $('.mmm-treeview'), // $parent
    objectTree, // tree needs a traverse function -> see ObjectTree.traverse(visitor)
    // options
    {
        onSelect: function(sel, oldsel) {
            let selected = this.fullPathOfSelection;
            Console.log('selected: ' + selected);
            $('.mmm-explorer > .caption').text('> ' + selected);
        }
    }
);

// handlers for the buttons of button-bar
$('.mmm-explorer .button-bar > a').click((ev) => {
    let $edit = $('.mmm-explorer .button-bar > input');
    let select = $('.mmm-explorer .button-bar > select')[0];
    let command = ev.target.id;

    switch (command) {
        case 'find':
            if ($edit.val()) {
                let found = treeView.select($edit.val());
                Console.log(found);
            }
        break;
        case 'create':
            if ($edit.val()) {
                treeView.addChildToSelection( $edit.val(), {});
                Console.log('adding: ' + $edit.val() + ' to ' + treeView.fullPathOfSelection);
            }
        break;
        case 'remove':
            if (treeView.selected) { console.log(treeView.fullPathOfSelection + ' removed'); }
            treeView.removeSelection();
            break;
        case 'copy':
            // JSON.parse(JSON.stringify(bob))
        break;
    }
});

//==============================================================================
// Hot-Module-Replacement
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
        console.log("module.hot.dispose: " + __FILE);
        // revoke the side effect
        $('#' + __FILE).remove();
    });
}

//==============================================================================
// export {uiTree, json};

//======================================================================
// export globally, for testing in debugger tools
if (typeof window !== 'undefined') {
    Object.assign(window.MICAGE = window.MICAGE || {}, {
        treeView
    });
    window.$ = $;
}
