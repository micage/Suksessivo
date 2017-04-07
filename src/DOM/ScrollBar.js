import styles from "./ScrollBar.less";
import "../UI/Splitter";
import { Div } from "./Elements";

const _Create = (args) => {

    let payload = {
        children: [
            Div({ class: "one"}),
            Div({ class: "two" }),
    ]};
    Object.assign(payload, args);

    let self = Div(payload);
    self.classList.add("ScrollBar");
    self.classList.add(args.horizontal === false ? "v" : "h");

    // self.addEventListener('ScrollStart', function(evt) {
    // });
    //
    // self.addEventListener('ScrollStop', function(evt) {
    // });

    return self;
};

$( () => {
    let scrollBar = $('.ScrollBar');

    scrollBar.each(function () {
        let args = {
            horizontal: this.horizontal === false ? false : true
            , ratio: this.ratio === undefined ? 0.5 : this.ratio
        };
        $(this)
            .on('ratio', function(evt, ratio) {
                args.ratio = ratio;
                if (this.onScroll) this.onScroll(args);

                return false; // consume event
            })
            .split(args);
    });
});

export default _Create;
