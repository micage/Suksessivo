import Box from "./Box";
import Circle from "./Circle";
import Path from "./Path";
import Style from "./Style";
import Frame from "./Frame";
// import Console from "../UI/Console";

/**
Ideas:
    Off-Screen Canvas

Todo:
    reconstruct:
        default params


*/

type CanvasParamsType = {
    name: string,
    width: number,
    height: number,
    parentNode: HTMLElement
};

let instanceCount = 0;

const DefaultParams = {
     name: "Canvas" + instanceCount,
     width: 400,
     height: 250
};

var Canvas = function(params: CanvasParamsType) {
    let pp = Object.assign({}, DefaultParams, params);

    this.canvas = document.createElement('canvas');
    this.canvas.id = pp.name;
    this.canvas.width = pp.width;
    this.canvas.height = pp.height;
    // this.canvas.style.width = w ? w : screen.width;
    // this.canvas.style.height = h ? h : screen.height/2;

    this.ctx = this.canvas.getContext('2d');

    if (pp.parentNode instanceof(HTMLElement)) {
        pp.parentNode.appendChild(this.canvas);
    }
    // else it's an off-screen canvas

    this.styles = {};
    this.styles[Style.DEFAULT.name] = Style.DEFAULT;
    this.styles[Style.ORANGE_BOLD.name] = Style.ORANGE_BOLD;
    this.styles[Style.TEAL_THIN.name] = Style.TEAL_THIN;
    this.defaultStyle = Style.DEFAULT;
    this.currentStyle = this.defaultStyle;
    this.currentStyle.apply(this.ctx);

    this.rootFrame = new Frame("root");
};

Canvas.prototype = {
    constructor: Canvas,

    setParentNode(parentNode: HTMLElement) {
        if (this.canvas.parentNode instanceof(HTMLElement)) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        if (parentNode instanceof(HTMLElement)) {
            parentNode.appendChild(this.canvas);
        }
    },

    addFrame(params: FrameParamType, parent: Frame) {
        let _parent = parent || this.rootFrame;
        let frame = new Frame(params);
        return _parent.addChild(frame);
    },

    addBox(params: BoxParamType, frame: Frame): Box {
        let box = new Box(params);
        let _frame = frame || this.rootFrame;
        _frame.addItem(box);
        return box;
    },

    addCircle(params: CircleParamType, frame: Frame): Box {
        let circle = new Circle(params);
        let _frame = frame || this.rootFrame;
        _frame.addItem(circle);
        return circle;
    },

    addPath(params: PathParamType, frame: Frame): Path {
        let line = new Path(params);
        let _frame = frame || this.rootFrame;
        _frame.addItem(line);
        return line;
    },

    addStyle(name: string, params: StyleParams): Style {
        let style = new Style(name, params);
        this.styles[name] = style;
        return style;
    },

    clear() {
        let oldFillStyle = this.ctx.fillStyle;
        this.ctx.fillStyle = this.defaultStyle.getFillColor();
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = oldFillStyle;
    },

    render() {
        this.clear();
        this.rootFrame.draw(this.ctx);
    }
};

module.exports = Canvas;
Object.assign(window.MICAGE = window.MICAGE || {}, module.exports);
