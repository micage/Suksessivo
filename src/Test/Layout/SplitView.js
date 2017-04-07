import styles from "./SplitView.less";
import "../../UI/Splitter";
import createDOM from "../../UI/CreateDOM";

let splitViewH = {
    self: {
        class: styles.h,
        h1: {
            class: styles.one
        },
        h2: {
            class: styles.two
        }
    }
};

let splitViewV = {
    self: {
        class: styles.v,
        v1: {
            class: styles.one
        },
        v2: {
            class: styles.two
        }
    }
};

$('.' + styles.h)
    .on('ratio', function(evt, ratio) {
         // 'this' is the scrollBar, parent is the scrollView, it's first child is the frame
        let frame = this.parentNode.children[0];
        $(frame).scrollLeft(ratio * ($('.' + styles.view).width() - $(frame).width()));
    })
    .split({
        horizontal: true,
        thumbSize: 40,
        ratio: 0.5,
        barClass: styles.bar
    });

$('.' + styles.v)
    .on('ratio', function(evt, ratio) {
         // 'this' is the scrollBar, parent is the scrollView, it's first child is the frame
        let frame = this.parentNode.children[0];
        $(frame).scrollTop(ratio * ($('.' + styles.view).height() - $(frame).height()));
    })
    .split({
        horizontal: false,
        thumbSize: 30,
        ratio: 0.64,
        barClass: styles.bar
    });

const Create = (options) => {
    Object.assign({
        orientation: 'vertical'
    }, options);

    return options.orientation === 'horizontal' ?
        createDom(null, splitViewH) :
        createDOM(null, splitViewV) ;
};

export default Create;

//==============================================================================
// Hot-Module-Replacement
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
        // revoke the side effect
        $('.' + styles.scrollView).remove();
    });
}
