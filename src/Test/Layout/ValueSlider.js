const __FILE = "ValueSlider";

import Pug from "pug-loader!./ValueSlider.pug";
import "./ValueSlider.less";
import "../../UI/Splitter";

//==============================================================================
// HTML

let locals = {
    viewId: __FILE,
    data: "Locals are injected into PUG a.k.a. JADE)"
};

let htmlString = Pug(locals);
$('body').append(htmlString);

// sliders
$('#ValueSlider .OneTwoBar')
    .on('ratio', function(evt, ratio) {
        $(this).next().val(ratio.toFixed(2)); // $(this).next() is the label
    })
    .split({
        interface: {},
        thumbSize: 40,
        ratio: 0.2
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
