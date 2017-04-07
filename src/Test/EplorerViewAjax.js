/*eslint no-unused-vars: "off"*/
"use strict";

import ObjectTree from "../Structures/ObjectTree";
import Console from "../UI/Console";
import TreeView2 from "../UI/TreeView2";
import "./ExplorerView.less";
import Pug from "pug-loader!./ExplorerView.pug";

const __FILE = "ExplorerViewAjax";

$('body').append( Pug({
    viewId: __FILE,
    viewTitle: "Test String (demonstrate locals injection into a pug-file)",
    treeBoxId: 'ajax-tree'
}));

// handlers for the buttons of button-bar
$('# ' + treeBoxId + ' .button-bar > a').click((ev) => {
    let $edit = $('# ' + treeBoxId + ' .button-bar > input');
    let select = $('# ' + treeBoxId + ' .button-bar > select')[0];
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
    }
});


// https://maps.googleapis.com/maps/api/geocode/json?address=10 downing st, london
let url1 = 'http://www.omdbapi.com/?plot=short&y=2001&s=Star&r=json',
    url2 = 'https://api.randomuser.me/',
    url3 = 'https://api.github.com/users/micage/repos',
    url4 = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
    url4a = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp',
    url5 = 'https://storage.googleapis.com/maps-devrel/google.json',
    url6 = "https://query.yahooapis.com/v1/public/yql?q=show%20tables&format=json",
    url7 = "https://query.yahooapis.com/v1/public/yql?format=json",
    url8 = "https://maps.googleapis.com/maps/api/js?v=3.exp",
    url9 = "https://data.cityofnewyork.us/api/views/kku6-nxdu/rows.json",
    var_xyzt = "We see us twice.";


let treeViewFromAjax = null;
// TreeFromAjaxCall(url1);
function TreeFromAjaxCall(url) {
    $.ajax({
        type: 'GET',
        url,
        async: true,
        cache: false,
        dataType: 'json',
        // data: {
        //     // q1: 'select * from geo.places where text="san francisco, ca"',
        //     q: 'select * from weather.forecast where woeid=638242'
        // },
        // jsonp: 'callback',
        error: function(e) {
            console.log(e);
        }
    }).done((json) => {
        Console.log('ajax is done.');

        let objTree = new ObjectTree(json);
        objTree.traverse(NodePrinter);  // console.log it

        treeViewFromAjax = new TreeView2($('#' + treeBoxId + ' > .mmm.treeview'), objTree, { // <- treeView
            onSelect: function(newItem, oldItem) {
                if (newItem) {
                    $('#' + treeBoxId + ' > .caption').text('> ' + this.fullPathOfSelection);
                    console.log( newItem.id );
                }
            },
            onLabel: (node) => {
                if (! node.hasChildren) {
                    return node.id + ": " + node.data;
                } else {
                    return node.id;
                }
            }
        });
    });
}

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
        treeViewFromAjax
    });
    window.$ = $;
}
