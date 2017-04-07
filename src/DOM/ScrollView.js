import styles from "./ScrollView.less";
import { Div } from "./Elements";
import ScrollBar from "./ScrollBar";

const onScroll = function(args) {
    if (args.horizontal === false) {
        let frame = this.parentNode.children[0];
        let view = frame.children[0];
        $(frame).scrollTop(args.ratio * ($(view).height() - $(frame).height()));
    }
    else {
        let frame = this.parentNode.children[0];
        let view = frame.children[0];
        $(frame).scrollLeft(args.ratio * ($(view).width() - $(frame).width()));
    }
};

function isString (obj) {
  return (Object.prototype.toString.call(obj) === '[object String]');
}

const _Create_new = (args) => {

    // append the children of ScrollView to the 'view' element
    let view = Div({ class: styles.view + " view", children: args.children });

    // add local css to the class
    let css = args.class;
    isString(css) && css.length ?
        css += (' ' + styles.scrollView) :
        css = styles.scrollView;

    let self = Div({
        class: css,
        children: [
            Div({ class: styles.frame + " frame", children: [ view ]}),
            ScrollBar({ class: styles.v, horizontal: false, ratio: args.options.scrollY, onScroll: onScroll }),
            ScrollBar({ class: styles.h, ratio: args.options.scrollX, onScroll: onScroll }),
            Div({ class: styles.corner })
        ],
        onresize: function(evt) {
            console.log('Resizing ScrollView');
        }
    });

    self.addEventListener('ScrollStart', function(evt) {
        self.classList.add('scrolling');
    });

    self.addEventListener('ScrollStop', function(evt) {
        self.classList.remove('scrolling');
    });

    return self;
};

export default _Create_new;



//==============================================================================
// Hot-Module-Replacement
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
        // revoke the side effect
        $('.' + styles.scrollView).remove();
    });
}
