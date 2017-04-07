const __FILE = "ScrollBar";

import Pug from "pug-loader!./ScrollBar.pug";
import "./ScrollBar.less";
// import Console from "../../UI/Console";
import "../../UI/Splitter";

//==============================================================================
// HTML
$('body').append( Pug({
    viewId: __FILE,
    data: 0
}));

$(function() {
    console.log('loaded doc.');

    let frame = $('#' + __FILE + ' .frame');

    $('#' + __FILE + ' .scrollV')
        .on('ratio', function(evt, ratio) {
            frame.scrollTop(ratio * 400);
        })
        .split({
            horizontal: false,
            thumbSize: 40,
            ratio: 0.8
        });

    $('#' + __FILE + ' .scrollH')
        .on('ratio', function(evt, ratio) {
            frame.scrollLeft(ratio * 400);
        })
        .split({
            horizontal: true,
            thumbSize: 40,
            ratio: 0.8
        });

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
