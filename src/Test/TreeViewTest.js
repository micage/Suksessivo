"use strict";
/*eslint no-unused-vars: "off"*/

import ObjectTree from "../Structures/ObjectTree";
// import Console from "../UI/Console";
import TreeView from "../UI/TreeView";
import "./ExplorerView.less";
import Pug from "pug-loader!./ExplorerView.pug";
import { human, data1, afterfx } from "./TreeViewTestData";

const __FILE = "TreeViewTest";

//==============================================================================
// ObjectTree

let obj = Object.assign({}, afterfx, human);
let objectTree = new ObjectTree(obj);

//==============================================================================
// HTML

let locals = {
    testName: __FILE,
    data: "Test String, to demonstrate locals injection"
};

let htmlString = Pug(locals);
$('body').append(htmlString);

// UI Tree from ObjectTree with options
let treeView = new TreeView(
    $('#treebox1 > .mmm-tree'), // $parent
    objectTree, // tree, needs a traverse function
    { // options
        onSelect: (sel, oldsel) => {
            // Console.log( sel.innerText + ' selected');
            console.log( this.fullPathOfSelection + ' selected');
            $('#treebox1 > .caption').text('> ' + this.fullPathOfSelection);
        }
    });

// handlers for the buttons of button-bar
$('#treebox1 .button-bar > button').click((ev) => {
    let $edit = $('#treebox1 .button-bar > input');
    let command = ev.target.id;
    switch (command) {
        case 'find': {
            if ($edit.val()) {
                let found = treeView.select($edit.val());
                console.log(found);
            }
        } break;
        case 'add': {
            if ($edit.val()) {
                treeView.addChildToSelection( $edit.val(), { msg: 'umph!' });
                console.log('adding: ' + $edit.val() + ' to ' + treeView.fullPathOfSelection);
            }
        } break;
        case 'remove': {
            if (treeView.selected) { console.log(treeView.fullPathOfSelection + ' removed'); }
            treeView.removeSelection();
        } break;
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

//======================================================================

if (typeof window !== 'undefined') {
    Object.assign(window.MICAGE = window.MICAGE || {}, {
        treeView
    });
    window.$ = $;
}
