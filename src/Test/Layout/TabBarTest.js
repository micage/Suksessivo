const __FILE = "TabBarTest";
import TabBar from "../../UI/TabBar";

// the all in one file solution, still possible to overwrite this defaults with an external css-file
let miniApp = $('<div>', { class: 'test', id: __FILE })
    .css({
        width: 800,
        'margin': '0 auto'
    })
    .append( $('<div>', { class: 'content' })
        .css({
            height: 400,
            'background-color': 'red',
        })
        .append( $('<div>', { id: 'tabbed-box-1', class: 'tabbed-box' }) )
    );
$('body').append(miniApp);


let tabView = new TabBar({
    root: $('#tabbed-box-1'),
    onSelect: () => {

    },
    test: 0
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
