import "../UI/Splitter";
import { Div } from "./Elements";


window.addEventListener("load", function (event) {
    console.log("All resources finished loading!");
});


const _Create = (args) => {

    let children = Array.isArray(args.children) ? args.children : [];

    const onresize = function(evt) {
        console.log('Resizing SplitView ' + evt.target.className);
        if (this.length) {
            let view = this.children.item(0);
            if (view.onresize instanceof Function) {
                view.dispatchEvent(new Event('resize'));
            }
        }
        return false;
    };

    let one = {
        class: "one",
        style: {
            // 'display': 'inline-block',
        },
        onresize
    };

    let two = {
        class: "two",
        style: {
            'overflow': 'hidden',
        },
        onresize
    };

    if (children.length >= 1) {
        one.children = [ args.children[0] ];
    }
    if (children.length >= 2) {
        two.children = [ args.children[1] ];
    }

    let payload = {
        horizontal: args.horizontal === false ? false : true,
        ratio: args.ratio || 0.5,
        children: [
            Div(one),
            Div(two)
        ],
        style: {
            // 'width': '100%',
            // 'min-height': '40px'
        },
        onshow: function (evt) {
            console.log('SplitView loaded');
        },
        onratio: function($$, ratio) {
            console.log(this.className + '.onratio ' + ratio);            
        }
    };

    let self = Div(payload);
    self.Type = 'SplitView';
    self.classList.add("SplitView");
    self.classList.add(args.horizontal === false ? "v" : "h");

    self.onresize = function(evt) {
        let me = evt.target;
        me.children.item(0).onresize();
        me.children.item(2).onresize();
        console.log('Resizing SplitView.');
    };

    self.addEventListener('ratio', function(evt) {
        console.log('SplitView ratio');        
    });

    return self;
};

$( () => {
    let splitViews = $('.SplitView');

    splitViews.each(function () {
        let args = {
            horizontal: this.horizontal === false ? false : true,
            ratio: this.ratio === undefined ? 0.5 : this.ratio
        };
        $(this) // is a SplitView
            // .on('ratio', function(evt, ratio) {
            //     args.ratio = ratio;
            //     if (this.onScroll) this.onScroll(args);

            //     this.children.item(0).dispatchEvent(new Event('resize'));
            //     this.children.item(2).dispatchEvent(new Event('resize'));

            //     return false;
            // })
            .split(args);
    });
});


export default _Create;
