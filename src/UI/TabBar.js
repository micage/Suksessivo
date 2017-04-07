import "./TabBar.less";

// the all in one file solution, still possible to overwrite this defaults with an external css-file
let tabBox = $('<div>', { class: 'tab-box' })
    .append( $('<div>', { class: 'tab-bar' })
        .append( $('<ul>', { class: 'tabs'})
            .append( $('<li>', { class: 'tab' }) )
        )
    )
    .append( $('<div>', { class: 'tab-view' }) );


const init = function() {
    this.append(tabBox);
};

class TabBar {
    constructor(options) {
        this._defaults = Object.assign({
            root: document.body
        }, options);

        this._selected = null;

        init.call(this._defaults.root);
    }

    addTab(name, $view) {

    }

    removeTab(name) {

    }

    get selected() { return this._selected; }
    select(name) {

    }
}


export default TabBar;
